"use client";

import AddTask from "@/components/addTask";
import Tags from "@/components/tags";
import Tasks from "@/components/tasks";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Statistic,
  getLastStatisticID,
  handleTaskChangeStatisticCollection,
  saveStatistic,
} from "@/lib/statistics";
import { initialTags } from "@/lib/tags";
import { Task, getNextID } from "@/lib/tasks";
import tasksReducer from "@/lib/tasksReducer";
import { useEffect, useReducer, useState } from "react";

export type HandleAddTask = (title: string) => void;
export type HandleChangeTasks = (tasks: Task[]) => void;
export type HandleChangeTask = (task: Task) => void;
export type HandleDeleteTask = (originalIndex: number) => void;
export type HandleCurrentTaskChange = (originalIndex: number | null) => void;

export default function TasksPage() {
  const [mounted, setMounted] = useState(false);

  const [tags, setTags] = useState<string[]>([]);

  // TODO: fix bug with selectedTags having deleted tag
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const [nextID, setNextID] = useState(0);

  const [currentTask, setCurrentTask] = useState<null | number>(null);

  const [statistics, setStatistics] = useState<null | Statistic[]>(null);

  useEffect(() => {
    setMounted(true);

    const savedTags = localStorage.tags;
    const parsedTags = savedTags ? JSON.parse(savedTags) : initialTags;
    setTags(parsedTags);

    dispatch({ type: "initialized" });

    const nextIDInitial = getNextID(JSON.parse(localStorage.tasks ?? "[]"));
    setNextID(nextIDInitial);

    const savedCurrentTask = localStorage.currentTask
      ? Number(localStorage.currentTask)
      : null;
    setCurrentTask(savedCurrentTask);

    const savedStatistics: Statistic[] = JSON.parse(
      localStorage.statistics ?? "[]",
    );
    setStatistics(savedStatistics);
  }, []);

  const handleAddTask: HandleAddTask = (title) => {
    dispatch({
      type: "added",
      id: nextID,
      title,
    });
    setNextID(nextID + 1);

    if (statistics) {
      const statisticID = getLastStatisticID(statistics);
      const newStatistic: Statistic = {
        id: statisticID,
        type: "added",
        title: title,
      };
      const newStatistics = saveStatistic(statistics, newStatistic);
      newStatistics && setStatistics(newStatistics);
    }
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
    if (statistics) {
      const newStatistics = handleTaskChangeStatisticCollection(
        tasks,
        task,
        statistics,
      );
      newStatistics && setStatistics(newStatistics);
    }
  };

  const handleDeleteTask: HandleDeleteTask = (id) => {
    if (statistics) {
      const task = tasks.find((task) => task.id === id);
      if (task) {
        const statisticID = getLastStatisticID(statistics);
        const newStatistic: Statistic = {
          id: statisticID,
          type: "deleted",
          title: task.title,
        };
        const newStatistics = saveStatistic(statistics, newStatistic);
        newStatistics && setStatistics(newStatistics);
      }
    }

    dispatch({
      type: "deleted",
      id,
    });
  };

  const handleCurrentTaskChange: HandleCurrentTaskChange = (id) => {
    setCurrentTask(id);
    localStorage.currentTask = id;
  };

  const [newTaskTitle, setNewTaskTitle] = useState("");
  return (
    <section className="card space-y-4 min-w-[32rem]">
      {mounted ? (
        <Tags
          tasks={tasks}
          setTasks={handleChangeTasks}
          tags={tags}
          setTags={setTags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      ) : (
        <Skeleton className="w-full h-7" />
      )}
      <AddTask
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        handleAddTask={handleAddTask}
      />
      {mounted ? (
        <Tasks
          tasks={tasks}
          currentTask={currentTask}
          selectedTags={selectedTags}
          onChangeTask={handleChangeTask}
          onDeleteTask={handleDeleteTask}
          onCurrentTaskChange={handleCurrentTaskChange}
        />
      ) : (
        <>
          <Skeleton className="w-full h-16" />
          <Skeleton className="w-full h-16" />
          <Skeleton className="w-full h-16" />
        </>
      )}
    </section>
  );
}
