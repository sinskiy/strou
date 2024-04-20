"use client";

import DeleteIcon from "@/components/icons/deleteIcon";
import EditIcon from "@/components/icons/editIcon";
import TaskIcon from "@/components/icons/taskIcon";
import NewTaskForm from "@/components/newTaskForm";
import Button from "@/components/ui/button";
import { useState } from "react";

type Modes = "edit" | "tasks";
export type HandleAddTodo = (e: React.FormEvent<HTMLFormElement>) => void;

export default function Home() {
  const [newTask, setNewTask] = useState("");

  const [schedule, setSchedule] = useState("");

  const initialMode = schedule ? "tasks" : "edit";
  const [mode, setMode] = useState<Modes>(initialMode);

  const scheduleList =
    mode === "tasks"
      ? schedule.split("\n").map((task) => {
          if (!task.length) return "";
          return (
            <div
              key={task}
              className="bg-surface-container rounded-md p-4 flex items-center gap-2"
            >
              <input type="checkbox" name={task} id={task} />
              <label htmlFor={task}>{task}</label>
            </div>
          );
        })
      : "";

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
      <div className="w-full flex gap-2">
        <Button
          disabled={!schedule}
          onClick={() =>
            mode === "tasks" ? setMode("edit") : setMode("tasks")
          }
          variant="outlined"
          colors="primary-container"
          className="p-4"
        >
          {mode === "tasks" ? <EditIcon /> : <TaskIcon />}
          {`enter ${mode === "tasks" ? "edit" : "tasks"} mode`}
        </Button>
        <Button
          disabled={!schedule}
          variant="text"
          colors="background"
          className="p-4"
        >
          <DeleteIcon />
          delete current schedule
        </Button>
      </div>
      <div className="w-full">
        {mode === "edit" ? (
          <textarea
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            rows={20}
            placeholder="17:00-21:00 domra&#10;&#13;then homework"
            name="schedule"
            id="schedule"
            className="resize-none w-full"
          >
            {schedule}
          </textarea>
        ) : (
          <div className="flex flex-col gap-2">{scheduleList}</div>
        )}
      </div>
    </main>
  );
}
