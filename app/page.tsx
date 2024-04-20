"use client";

import NewTaskForm from "@/components/newTaskForm";
import Schedule from "@/components/schedule";
import ScheduleTools from "@/components/scheduleTools";
import { useState } from "react";

export type Schedule = string;
export type Modes = "edit" | "tasks";
export type HandleAddTodo = (e: React.FormEvent<HTMLFormElement>) => void;

export default function Home() {
  const [newTask, setNewTask] = useState("");

  const [schedule, setSchedule] = useState<Schedule>("");

  const initialMode = schedule ? "tasks" : "edit";
  const [mode, setMode] = useState<Modes>(initialMode);

  const handleAddTodo: HandleAddTodo = (e) => {
    e.preventDefault();
    setSchedule((schedule) => (schedule += `${schedule && "\n"}${newTask}`));
    setNewTask("");
  };
  return (
    <main className="flex flex-col items-center justify-center gap-4 w-fit mx-auto">
      <NewTaskForm
        handleAddTodo={handleAddTodo}
        newTask={newTask}
        setNewTask={setNewTask}
      />
      <ScheduleTools schedule={schedule} mode={mode} setMode={setMode} />
      <Schedule mode={mode} schedule={schedule} setSchedule={setSchedule} />
    </main>
  );
}
