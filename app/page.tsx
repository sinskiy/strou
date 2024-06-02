"use client";

import CurrentTask from "@/components/currentTask";
import TimerControls from "@/components/timerControls";
import Timestamp from "@/components/timestamp";
import { useEffect, useState } from "react";
import {
  Timestamp as ITimestamp,
  HOUR_IN_SECONDS,
  MINUTE_IN_SECONDS,
  SECOND,
  secondsToHours,
  secondsToMinutes,
  secondsToLeft,
} from "@/lib/time";

const timerStates = ["paused", "started", "finished"] as const;
export type TimerState = (typeof timerStates)[number];

const timerModes = ["work", "break"] as const;
type TimerMode = (typeof timerModes)[number];
type TimerModeTimes = {
  [Key in TimerMode]: number;
};

export default function Timer() {
  const [mode, setMode] = useState<TimerState>("paused");

  const [time, setTime] = useState<TimerModeTimes>({
    work: MINUTE_IN_SECONDS * 50,
    break: MINUTE_IN_SECONDS * 5,
  });
  const [timeMode, setTimeMode] = useState<TimerMode>("work");
  function nextTimeMode() {
    return timeMode === "work" ? "break" : "work";
  }

  const [elapsed, setElapsed] = useState(0);
  const timeLeft = time[timeMode] - elapsed;
  const timeFromMs: ITimestamp = {
    hours: secondsToHours(timeLeft),
    minutes: secondsToMinutes(timeLeft),
    seconds: secondsToLeft(timeLeft),
  } as const;

  useEffect(() => {
    if (timeLeft < 0) {
      setTimerFinished();
    }
  }, [timeLeft]);

  const [interval, setIntervalVar] = useState<null | NodeJS.Timeout>(null);
  function handleTimerStart() {
    interval && clearInterval(interval);

    if (mode === "finished") {
      setTimeMode(nextTimeMode());

      setElapsed(0);
    }

    const nextMode: TimerState = mode === "started" ? "paused" : "started";
    if (nextMode === "started") {
      const newInterval = setInterval(() => {
        setElapsed((elapsed) => elapsed + 1);
      }, 1);
      setIntervalVar(newInterval);
    }

    setMode(nextMode);
  }
  function handleTimeModeSkip() {
    setTimeMode(nextTimeMode());

    setMode("paused");
    interval && clearInterval(interval);

    setElapsed(0);
  }
  function setTimerFinished() {
    interval && clearInterval(interval);

    setMode("finished");
  }
  return (
    <>
      <section className="card text-center">
        <p className="opacity-50">{timeMode}</p>
        <Timestamp timeObject={timeFromMs} />
        <TimerControls
          handleTimerStart={handleTimerStart}
          mode={mode}
          handleTimeModeSkip={handleTimeModeSkip}
        />
      </section>
      <CurrentTask />
    </>
  );
}
