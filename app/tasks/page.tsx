"use client";

import AddTask from "@/components/addTask";
import Tags from "@/components/tags";
import Tasks from "@/components/tasks";
import { tags } from "@/lib/tags";
import { Task, getNextIndex } from "@/lib/tasks";
import tasksReducer from "@/lib/tasksReducer";
import { useEffect, useReducer, useState } from "react";

export type HandleAddTask = (title: string) => void;
export type HandleChangeTask = (task: Task) => void;
export type HandleDeleteTask = (originalIndex: number) => void;
export type HandleCurrentTaskChange = (originalIndex: number) => void;

export default function TasksPage() {
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const [nextIndex, setNextIndex] = useState(0);

  const [currentTask, setCurrentTask] = useState<null | number>(null);

  useEffect(() => {
    dispatch({ type: "initialized" });

    const nextIndexInitial = getNextIndex(
      JSON.parse(localStorage.tasks ?? "[]"),
    );
    setNextIndex(nextIndexInitial);

    const savedCurrentTask = localStorage.currentTask
      ? Number(localStorage.currentTask)
      : null;
    setCurrentTask(savedCurrentTask);
  }, []);

  const handleAddTask: HandleAddTask = (title) => {
    dispatch({
      type: "added",
      originalIndex: nextIndex,
      title,
    });
    setNextIndex(nextIndex + 1);
  };

  const handleChangeTask: HandleChangeTask = (task) => {
    dispatch({
      type: "changed",
      task,
    });
  };

  const handleDeleteTask: HandleDeleteTask = (originalIndex) => {
    dispatch({
      type: "deleted",
      originalIndex,
    });
  };

  const handleCurrentTaskChange: HandleCurrentTaskChange = (originalIndex) => {
    setCurrentTask(originalIndex);
    localStorage.currentTask = originalIndex;
  };

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
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
        onCurrentTaskChange={handleCurrentTaskChange}
      />
    </section>
  );
}
