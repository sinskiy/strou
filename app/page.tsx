"use client";

import NewTaskForm from "@/components/newTaskForm";
import Schedule from "@/components/schedule";
import ScheduleTools from "@/components/scheduleTools";
import { parseSchedule } from "@/lib/scheduleParser";
import { sortSchedule } from "@/lib/scheduleSorter";
import { Task } from "@/lib/scheduleTypes";
import { useState } from "react";

export type Modes = "edit" | "tasks";
export type HandleAddTodo = (e: React.FormEvent<HTMLFormElement>) => void;

export default function Home() {
  const [newTask, setNewTask] = useState("");

  const [schedule, setSchedule] = useState("");
  const [scheduleObject, setScheduleObject] = useState<Task[]>([]);

  const initialMode = schedule ? "tasks" : "edit";
  const [mode, setMode] = useState<Modes>(initialMode);

  const handleAddTodo: HandleAddTodo = (e) => {
    e.preventDefault();

    setSchedule((schedule) => {
      const newSchedule = schedule + `${schedule && "\n"}${newTask}`;

      const parsedSchedule = parseSchedule(newSchedule);
      const sortedSchedule = sortSchedule(parsedSchedule);
      setScheduleObject(sortedSchedule);

      return newSchedule;
    });

    setNewTask("");
  };
  return (
    <main className="flex flex-col items-center justify-center gap-4 w-fit mx-auto">
      <NewTaskForm
        handleAddTodo={handleAddTodo}
        newTask={newTask}
        setNewTask={setNewTask}
      />
      <ScheduleTools
        schedule={schedule}
        mode={mode}
        setMode={setMode}
        setScheduleObject={setScheduleObject}
      />
      <Schedule
        mode={mode}
        schedule={schedule}
        setSchedule={setSchedule}
        scheduleObject={scheduleObject}
      />
    </main>
  );
}
