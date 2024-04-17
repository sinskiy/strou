"use client";

import { useState } from "react";

export default function Home() {
  const [newTask, setNewTask] = useState("");
  return (
    <main className="flex flex-col items-center justify-center gap-4">
      <div className="flex gap-4">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          type="text"
          placeholder="what you want to do?"
          name="task-title"
          id="task-title"
        />
        <button className="filled px-4">
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
      <div>
        <h1 className="text-4xl font-extrabold">{newTask}</h1>
      </div>
    </main>
  );
}
