"use client";

import CurrentTask from "@/components/currentTask";
import TimerControls from "@/components/timerControls";
import Timestamp from "@/components/timestamp";
import { useEffect, useState } from "react";
import {
  Timestamp as ITimestamp,
  MINUTE_IN_MS,
  msToHours,
  msToMinutes,
  msToSeconds,
} from "@/lib/time";

const timerStates = ["paused", "unpaused", "finished"] as const;
export type TimerState = (typeof timerStates)[number];

const timerModes = ["work", "break"] as const;
type TimerMode = (typeof timerModes)[number];
type TimerModesTime = {
  [Key in TimerMode]: number;
};
interface Pause {
  start: number;
  end?: number;
}

export default function Timer() {
  const [state, setState] = useState<TimerState>("paused");
  // TODO: refactor this
  function nextState(): TimerState {
    return state === "paused" ? "unpaused" : "paused";
  }

  const [timerModesTime, setTimerModesTime] = useState<TimerModesTime>({
    work: MINUTE_IN_MS * 50,
    break: MINUTE_IN_MS * 5,
  });
  const [timerMode, setTimerMode] = useState<TimerMode>("work");
  function nextTimerMode() {
    return timerMode === "work" ? "break" : "work";
  }

  const [started, setStarted] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const timeFromMs: ITimestamp = {
    hours: msToHours(timeLeft),
    minutes: msToMinutes(timeLeft),
    seconds: msToSeconds(timeLeft),
  } as const;

  const [pauses, setPauses] = useState<Pause[]>([]);

  useEffect(() => {
    setTimeLeft(timerModesTime[timerMode]);
  }, []);

  useEffect(() => {
    if (timeLeft < 0) {
      setTimerFinished();
    }
  }, [timeLeft]);

  const [interval, setIntervalVar] = useState<null | NodeJS.Timeout>(null);
  function handleTimerStart() {
    interval && clearInterval(interval);

    if (state === "finished") {
      setTimerMode(nextTimerMode());

      setStarted(null);
    }

    const newState = nextState();
    if (newState === "unpaused") {
      setLastPauseEnd();

      startTimer();
    } else if (newState === "paused") {
      setTimerPaused();
    }

    setState(newState);
  }
  function handleTimer(newStarted: number) {
    const newTimeLeft = calculateTimeLeft(newStarted);
    setTimeLeft(newTimeLeft);
  }
  function handleTimeModeSkip() {
    setTimerMode(nextTimerMode());

    setState("paused");
    interval && clearInterval(interval);

    setPauses([]);

    setTimeLeft(timerModesTime[nextTimerMode()]);

    setStarted(null);
  }
  function startTimer() {
    const newStarted = started === null ? Date.now() : started;
    setStarted(newStarted);

    const newInterval = setInterval(() => handleTimer(newStarted), 1000);
    setIntervalVar(newInterval);
  }
  function setTimerPaused() {
    const newPause = {
      start: Date.now(),
      end: undefined,
    };
    setPauses([...pauses, newPause]);
  }
  function setTimerFinished() {
    interval && clearInterval(interval);

    setState("finished");
  }
  function setLastPauseEnd() {
    const lastPause = pauses.at(-1);
    if (!lastPause) return;

    lastPause.end = Date.now();
    setPauses(pauses);
  }
  function calculateTimeLeft(newStarted: number | null) {
    const timePaused = getTimePaused();

    const newTimeLeft =
      (newStarted ?? started ?? Date.now()) +
      timerModesTime[timerMode] +
      timePaused -
      Date.now();
    return newTimeLeft;
  }
  function getTimePaused() {
    const pausesTime = pauses.reduce(
      (acc, curr) =>
        curr.end ? acc + curr.end - curr.start : acc + Date.now() - curr.start,
      0,
    );
    return pausesTime;
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
