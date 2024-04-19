"use client";

import { useState } from "react";

type Modes = "edit" | "view";

export default function Home() {
  const [newTask, setNewTask] = useState("");
  const [mode, setMode] = useState<Modes>("view");
  const [schedule, setSchedule] = useState("");

  const scheduleList =
    mode === "view"
      ? schedule.split("\n").map((task) => {
          if (!task.length) return "";
          return (
            <div
              key={task}
              className="bg-surface-container rounded-md p-4 flex items-center gap-2"
            >
              <input
                type="checkbox"
                name={task}
                id={task}
                className="accent-primary h-6 w-6"
              />
              {task}
            </div>
          );
        })
      : "";
  return (
    <main className="flex flex-col items-center justify-center gap-4 w-fit mx-auto">
      <div className="flex gap-4">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          type="text"
          placeholder="what you want to do?"
          name="task-title"
          id="task-title"
        />
        <button className="filled">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          add
        </button>
      </div>
      <div className="w-full flex gap-2">
        <button
          onClick={() => (mode === "view" ? setMode("edit") : setMode("view"))}
          className="outlined p-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
          </svg>
          {`enter ${mode === "view" ? "edit" : "task"} mode`}
        </button>
        <button className="outlined p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
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
            hello
          </textarea>
        ) : (
          <div className="flex flex-col gap-2">{scheduleList}</div>
        )}
      </div>
    </main>
  );
}
