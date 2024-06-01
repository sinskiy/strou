"use client";

import Tags from "@/components/tags";
import Tasks, { Task } from "@/components/tasks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useReducer, useState } from "react";

export type HandleAddTask = (title: string) => void;
export type HandleChangeTask = (task: Task) => void;
export type HandleDeleteTask = (originalIndex: number) => void;

export default function TasksPage() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  function handleAddTask(title: string) {
    dispatch({
      type: "added",
      originalIndex: ++largestIndex,
      title,
    });
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

function tasksReducer(tasks: typeof initialTasks, action: TasksAction) {
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          originalIndex: action.originalIndex,
          title: action.title,
          checked: false,
        },
      ];
    }
    case "changed": {
      return tasks.map((task) => {
        if (task.originalIndex === action.task.originalIndex) {
          return action.task;
        } else {
          return task;
        }
      });
    }
    case "deleted": {
      return tasks.filter(
        (task) => task.originalIndex !== action.originalIndex,
      );
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

const initialTasks: Task[] = [
  { originalIndex: 0, title: "Visit Kafka Museum", checked: true },
  { originalIndex: 42, title: "Watch a puppet show", checked: false },
  { originalIndex: 2, title: "Lennon Wall pic", checked: false },
];
let largestIndex = initialTasks.toSorted((a, b) =>
  a.originalIndex < b.originalIndex ? 1 : -1,
)[0].originalIndex;
