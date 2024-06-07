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
  const [mounted, setMounted] = useState(false);

  const [state, setState] = useState<TimerState>("paused");
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
    const savedStarted =
      localStorage.started === "null" || !localStorage.started
        ? null
        : +localStorage.started;
    setStarted(savedStarted);

    const savedTimerMode: TimerMode = localStorage.timerMode ?? "work";
    setTimerMode(savedTimerMode);

    const savedPauses = JSON.parse(localStorage.pauses ?? "[]");
    setPauses(savedPauses);

    setTimeLeft(calculateTimeLeft(savedStarted, savedTimerMode, savedPauses));

    setMounted(true);
  }, []);

  useEffect(() => {
    if (timeLeft < 0) {
      setTimerFinished();
    }
  }, [timeLeft]);

  useStorage(
    {
      started,
      timerMode,
      pauses: JSON.stringify(pauses),
    },
    mounted,
  );

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
  function startTimer(newStarted?: number) {
    interval && clearInterval(interval);

    setStarted(newStarted ?? started ?? Date.now());

    const newInterval = setInterval(
      () => handleTimer(newStarted ?? started ?? Date.now()),
      1000,
    );
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
  function calculateTimeLeft(
    newStarted: number | null,
    newTimerMode?: TimerMode,
    newPauses?: Pause[],
  ) {
    const timePaused = newPauses ? getTimePaused(newPauses) : getTimePaused();

    const newTimeLeft =
      (newStarted ?? started ?? Date.now()) +
      timerModesTime[newTimerMode ?? timerMode] +
      timePaused -
      Date.now();
    return newTimeLeft;
  }
  function getTimePaused(localPauses?: Pause[]) {
    const pausesToCalculate = localPauses ?? pauses;
    const pausesTime = pausesToCalculate.reduce(
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

interface ToStore {
  [key: string]: string | number | null;
}
function useStorage(toStore: ToStore, mounted: boolean): void {
  const dependencies = Object.keys(toStore);
  useEffect(() => {
    if (!mounted) return;

    for (const item in toStore) {
      if (!item) continue;

      localStorage[item] = toStore[item];
    }
  }, [dependencies]);
}
