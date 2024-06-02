"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

type Mode = "paused" | "started" | "finished";
const timeModes = ["work", "break"] as const;
type Time = {
  [Key in (typeof timeModes)[number]]: number;
};

const SECOND = 1;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;

export default function Timer() {
  const [mode, setMode] = useState<Mode>("paused");

  const [time, setTime] = useState<Time>({
    work: MINUTE * 50,
    break: MINUTE * 5,
  });
  const [timeMode, setTimeMode] = useState<(typeof timeModes)[number]>("work");

  const [elapsed, setElapsed] = useState(0);
  const timeLeft = time[timeMode] - elapsed;
  const timeFromMs = {
    hours: (timeLeft / HOUR) % 24,
    minutes: (timeLeft / MINUTE) % 60,
    seconds: (timeLeft / SECOND) % 60,
  };

  useEffect(() => {
    if (timeLeft > 0) return;

    interval && clearInterval(interval);

    setMode("finished");
  }, [timeLeft]);

  const [interval, setIntervalVar] = useState<null | NodeJS.Timeout>(null);
  function handleTimerStart() {
    interval && clearInterval(interval);

    if (mode === "finished") {
      const nextTimeMode: typeof timeMode =
        timeMode === "work" ? "break" : "work";
      setTimeMode(nextTimeMode);

      setElapsed(0);
    }

    const nextMode: Mode = mode === "started" ? "paused" : "started";
    if (nextMode === "started") {
      const newInterval = setInterval(() => {
        setElapsed((elapsed) => elapsed + 1);
      }, 1);
      setIntervalVar(newInterval);
    }

    setMode(nextMode);
  }
  return (
    <>
      <section className="card text-center">
        <p className="opacity-50">{timeMode}</p>
        <p className="font-bold text-6xl mt-2 mb-6">
          {Object.entries(timeFromMs).map(([label, value], i) => (
            <span key={label}>
              {`${Math.floor(value)}`.padStart(2, "0")}
              {i !== 2 && ":"}
            </span>
          ))}
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="icon" onClick={handleTimerStart}>
            {mode === "started" ? "⏸" : "▶"}
          </Button>
          <Button variant="secondary" size="icon">
            ▶▶
          </Button>
        </div>
      </section>
      <section className="card flex items-center gap-4">
        <Label className="flex gap-3">
          <Checkbox />
          <p>
            play the domra <span className="opacity-30">is current task</span>
          </p>
        </Label>
        <Button variant="secondary" size="sm">
          change
        </Button>
      </section>
    </>
  );
}
