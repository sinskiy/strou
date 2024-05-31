"use client";

import { Button } from "@/components/ui/button";
import { msToHumanReadable } from "@/utils/time";
import { useState } from "react";

export default function Home() {
  const [started, setStarted] = useState(0);
  const [current, setCurrent] = useState(0);
  const elapsed = current - started;
  const formattedTime = msToHumanReadable(elapsed);

  let timerInterval: undefined | NodeJS.Timeout;
  function startTimer() {
    clearInterval(timerInterval);

    setStarted(Date.now());
    timerInterval = setInterval(() => setCurrent(Date.now()), 1000);
  }
  return (
    <>
      <p className="font-bold text-6xl text-center mb-4">
        <time>{formattedTime}</time>
      </p>
      <div className="flex gap-4 justify-center">
        <Button size="icon" onClick={startTimer}>
          ▶
        </Button>
        <Button size="icon">▶▶</Button>
      </div>
    </>
  );
}
