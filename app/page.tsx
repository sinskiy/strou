"use client";

import CurrentTask from "@/components/currentTask";
import TimerControls from "@/components/timerControls";
import Timestamp from "@/components/timestamp";
import { useEffect, useState } from "react";
import {
  Timestamp as ITimestamp,
  MINUTE_IN_SECONDS,
  secondsToHours,
  secondsToMinutes,
  secondsToLeft,
} from "@/lib/time";

const timerStates = ["paused", "started", "finished"] as const;
export type TimerState = (typeof timerStates)[number];

const timerModes = ["work", "break"] as const;
type TimerMode = (typeof timerModes)[number];
type TimerModesTime = {
  [Key in TimerMode]: number;
};

export default function Timer() {
  const [state, setState] = useState<TimerState>("paused");

  const [timerModesTime, setTimerModesTime] = useState<TimerModesTime>({
    work: MINUTE_IN_SECONDS * 50,
    break: MINUTE_IN_SECONDS * 5,
  });
  const [timerMode, setTimerMode] = useState<TimerMode>("work");
  function nextTimerMode() {
    return timerMode === "work" ? "break" : "work";
  }

  const [elapsed, setElapsed] = useState(0);
  const timeLeft = timerModesTime[timerMode] - elapsed;
  const timeFromMs: ITimestamp = {
    hours: secondsToHours(timeLeft),
    minutes: secondsToMinutes(timeLeft),
    seconds: secondsToLeft(timeLeft),
  } as const;

  useEffect(() => {
    const savedState = localStorage.state;
    console.log(savedState);
    savedState && setState(savedState);

    const savedTimerMode = localStorage.timerMode;
    savedTimerMode && setTimerMode(savedTimerMode);
  }, []);

  useEffect(() => {
    if (timeLeft < 0) {
      setTimerFinished();
    }
    // localStorage.timeLeft = timeLeft;
  }, [timeLeft]);

  // useEffect(() => {
  //   localStorage.state = state;
  // }, [state]);

  // useEffect(() => {
  //   localStorage.timerMode = timerMode;
  // }, [timerMode]);

  const [interval, setIntervalVar] = useState<null | NodeJS.Timeout>(null);
  function handleTimerStart() {
    interval && clearInterval(interval);

    if (state === "finished") {
      setTimerMode(nextTimerMode());

      setElapsed(0);
    }

    const nextState: TimerState = state === "started" ? "paused" : "started";
    if (nextState === "started") {
      const newInterval = setInterval(() => {
        setElapsed((elapsed) => elapsed + 1);
      }, 1);
      setIntervalVar(newInterval);
    }

    setState(nextState);
  }
  function handleTimeModeSkip() {
    setTimerMode(nextTimerMode());

    setState("paused");
    interval && clearInterval(interval);

    setElapsed(0);
  }
  function setTimerFinished() {
    interval && clearInterval(interval);

    setState("finished");
  }
  return (
    <>
      <section className="card text-center">
        <p className="opacity-50">{timerMode}</p>
        <Timestamp timeObject={timeFromMs} />
        <TimerControls
          handleTimerStart={handleTimerStart}
          state={state}
          handleTimeModeSkip={handleTimeModeSkip}
        />
      </section>
      <CurrentTask />
    </>
  );
}
