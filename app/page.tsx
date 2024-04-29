"use client";

import NewTaskForm from "@/components/newTaskForm";
import Schedule from "@/components/schedule";
import ScheduleTools from "@/components/scheduleTools";
import { parseSchedule } from "@/lib/scheduleParser";
import { sortSchedule } from "@/lib/scheduleSorter";
import { Task } from "@/lib/scheduleTypes";
import { updateSchedule } from "@/lib/storage";
import { useEffect, useState } from "react";

export const modes = ["edit", "tasks", "representative"] as const;
export type Modes = (typeof modes)[number];
export type HandleAddTodo = (e: React.FormEvent<HTMLFormElement>) => void;

export default function Home() {
  const [newTask, setNewTask] = useState("");

  const [schedule, setSchedule] = useState("");
  const [scheduleObject, setScheduleObject] = useState<Task[]>([]);

  // retrieve schedule on page load
  useEffect(() => {
    const savedSchedule = localStorage.getItem("schedule");

    if (savedSchedule) {
      setSchedule(savedSchedule);

      const parsedSchedule = parseSchedule(savedSchedule);
      const sortedSchedule = sortSchedule(parsedSchedule);
      setScheduleObject(sortedSchedule);

      setMode("tasks");
    }
  }, []);

  // whenever scheduleObject changes, scheduleObject and schedule in localStorage gets updated
  useEffect(() => {
    updateSchedule(schedule);
    // i think it's an overkill to update local storage when schedule (string) is updated
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleObject]);

  const [mode, setMode] = useState<Modes>("edit");

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
    <main className="flex flex-col gap-4">
      <NewTaskForm
        handleAddTodo={handleAddTodo}
        newTask={newTask}
        setNewTask={setNewTask}
      />
      <ScheduleTools
        schedule={schedule}
        setSchedule={setSchedule}
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
