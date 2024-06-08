"use client";

import AddTask from "@/components/addTask";
import Tags from "@/components/tags";
import Tasks, { Task } from "@/components/tasks";
import { useEffect, useReducer, useState } from "react";

export type HandleAddTask = (title: string) => void;
export type HandleChangeTask = (task: Task) => void;
export type HandleDeleteTask = (originalIndex: number) => void;
export type HandleAddTag = (originalIndex: number, tag: string) => void;

export default function TasksPage() {
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const [nextIndex, setNextIndex] = useState(0);

  const [currentTask, setCurrentTask] = useState<null | number>(null);

  useEffect(() => {
    dispatch({ type: "initialized" });
    const largestIndexInitial = getNextIndex(
      JSON.parse(localStorage.tasks ?? "[]"),
    );
    setNextIndex(largestIndexInitial);

    const savedCurrentTask = localStorage.currentTask
      ? Number(localStorage.currentTask)
      : null;
    setCurrentTask(savedCurrentTask);
  }, []);

  function handleAddTask(title: string) {
    dispatch({
      type: "added",
      originalIndex: nextIndex,
      title,
    });
    setNextIndex(nextIndex + 1);
  }

  function handleChangeTask(task: Task) {
    dispatch({
      type: "changed",
      task,
    });
  }

  function handleDeleteTask(originalIndex: number) {
    dispatch({
      type: "deleted",
      originalIndex,
    });
  }

  function handleAddTag(originalIndex: number, tag: string) {
    dispatch({
      type: "tagAdded",
      originalIndex,
      tag,
    });
  }

  function handleCurrentTaskChange(originalIndex: number) {
    setCurrentTask(originalIndex);
    localStorage.currentTask = originalIndex;
  }

  const [newTaskTitle, setNewTaskTitle] = useState("");
  return (
    <section className="card space-y-4">
      <Tags tags={tags} />
      <AddTask
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        handleAddTask={handleAddTask}
      />
      <Tasks
        tasks={tasks}
        currentTask={currentTask}
        handleCurrentTaskChange={handleCurrentTaskChange}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
        onAddTag={handleAddTag}
      />
    </section>
  );
}

type TasksAction =
  | {
      type: "initialized";
    }
  | {
      type: "added";
      originalIndex: number;
      title: string;
    }
  | {
      type: "changed";
      task: Task;
    }
  | {
      type: "deleted";
      originalIndex: number;
    }
  | {
      type: "tagAdded";
      originalIndex: number;
      tag: string;
    };

function tasksReducer(tasks: Task[], action: TasksAction) {
  switch (action.type) {
    case "initialized": {
      const savedTasks: string | undefined = localStorage.tasks;
      const initialTasks: Task[] = savedTasks ? JSON.parse(savedTasks) : [];
      return initialTasks;
    }
    case "added": {
      const addedTasks = [
        ...tasks,
        {
          originalIndex: action.originalIndex,
          title: action.title,
          checked: false,
        },
      ];
      localStorage.tasks = JSON.stringify(addedTasks);
      return addedTasks;
    }
    case "changed": {
      const changedTasks = tasks.map((task) => {
        if (task.originalIndex === action.task.originalIndex) {
          return action.task;
        } else {
          return task;
        }
      });
      localStorage.tasks = JSON.stringify(changedTasks);
      return changedTasks;
    }
    case "deleted": {
      const deletedTasks = tasks.filter(
        (task) => task.originalIndex !== action.originalIndex,
      );
      localStorage.tasks = JSON.stringify(deletedTasks);
      return deletedTasks;
    }
    case "tagAdded": {
      const tasksWithTagAdded = tasks.map((task) => {
        if (task.originalIndex === action.originalIndex) {
          return {
            ...task,
            tags: task.tags ? [...task.tags, action.tag] : [action.tag],
          };
        } else {
          return task;
        }
      });
      localStorage.tasks = JSON.stringify(tasksWithTagAdded);
      return tasksWithTagAdded;
    }
  }
}

function getNextIndex(tasks: Task[]) {
  if (!tasks.length) return 0;

  return (
    tasks.sort((a, b) => b.originalIndex - a.originalIndex)[0].originalIndex + 1
  );
}

export const tags = [
  "all",
  "purposeful",
  "necessary",
  "distracting",
  "unnecessary",
] as const;
