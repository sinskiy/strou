"use client";

import Tags from "@/components/tags";
import Tasks, { Task } from "@/components/tasks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useReducer, useState } from "react";

export type HandleAddTask = (title: string) => void;
export type HandleChangeTask = (task: Task) => void;
export type HandleDeleteTask = (originalIndex: number) => void;

export default function TasksPage() {
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const [largestIndex, setLargestIndex] = useState(0);

  useEffect(() => {
    dispatch({ type: "initialized" });
    const largestIndexInitial = tasks.length
      ? tasks.toSorted((a, b) =>
          a.originalIndex < b.originalIndex ? 1 : -1,
        )[0].originalIndex
      : 0;
    setLargestIndex(largestIndexInitial);
  }, []);

  function handleAddTask(title: string) {
    const newIndex = largestIndex + 1;
    dispatch({
      type: "added",
      originalIndex: newIndex,
      title,
    });
    setLargestIndex(newIndex);
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

  const [newTaskTitle, setNewTaskTitle] = useState("");
  return (
    <section className="card space-y-4">
      <Tags tags={tags} />
      <div className="flex gap-4">
        <Input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <Button variant="secondary" onClick={() => handleAddTask(newTaskTitle)}>
          add task
        </Button>
      </div>
      <Tasks
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
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
  }
}

const tags = [
  "all",
  "purposeful",
  "necessary",
  "distracting",
  "unnecessary",
] as const;
