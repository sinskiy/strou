"use client";

import AddTask from "@/components/addTask";
import Tags from "@/components/tags";
import Tasks from "@/components/tasks";
import { initialTags } from "@/lib/tags";
import { Task, getNextIndex } from "@/lib/tasks";
import tasksReducer from "@/lib/tasksReducer";
import { useEffect, useReducer, useState } from "react";

export type HandleAddTask = (title: string) => void;
export type HandleChangeTasks = (tasks: Task[]) => void;
export type HandleChangeTask = (task: Task) => void;
export type HandleDeleteTask = (originalIndex: number) => void;
export type HandleCurrentTaskChange = (originalIndex: number | null) => void;

export default function TasksPage() {
  const [tags, setTags] = useState<string[]>([]);

  // TODO: fix bug with selectedTags having deleted tag
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const [nextIndex, setNextIndex] = useState(0);

  const [currentTask, setCurrentTask] = useState<null | number>(null);

  useEffect(() => {
    const savedTags = localStorage.tags;
    const parsedTags = savedTags ? JSON.parse(savedTags) : initialTags;
    setTags(parsedTags);

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

  const handleChangeTasks: HandleChangeTasks = (tasks) => {
    dispatch({
      type: "changedAll",
      tasks,
    });
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
      <Tags
        tasks={tasks}
        setTasks={handleChangeTasks}
        tags={tags}
        setTags={setTags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
      <AddTask
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        handleAddTask={handleAddTask}
      />
      <Tasks
        tasks={tasks}
        currentTask={currentTask}
        selectedTags={selectedTags}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
        onCurrentTaskChange={handleCurrentTaskChange}
      />
    </section>
  );
}
