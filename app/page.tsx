"use client";

import CurrentTask from "@/components/currentTask";
import TimerControls from "@/components/timerControls";
import Timestamp from "@/components/timestamp";
import { useEffect, useState } from "react";
import {
  Timestamp as ITimestamp,
  msToHours,
  msToMinutes,
  msToSeconds,
} from "@/lib/time";
import TimerSettings from "@/components/timerSettings";
import { initialTimerModesTime, TimerMode } from "@/lib/timerModes";

const timerStates = ["notStarted", "paused", "unpaused"] as const;
export type TimerState = (typeof timerStates)[number];

interface Pause {
  start: number;
  end?: number;
}

export default function Timer() {
  const [timerState, setTimerState] = useState<TimerState>("notStarted");
  const nextTimerState: TimerState =
    timerState !== "unpaused" ? "unpaused" : "paused";

  const [timerModesTime, setTimerModesTime] = useState(initialTimerModesTime);
  const [timerMode, setTimerMode] = useState(0);
  const nextTimerMode: number =
    timerMode === timerModesTime.length - 1 ? 0 : timerMode + 1;

  const [timeStarted, setTimeStarted] = useState<number | null>(null);

  const [pauses, setPauses] = useState<Pause[]>([]);

  const [timeLeft, setTimeLeft] = useState(timerModesTime[0].time);
  const timeFromMs: ITimestamp = {
    hours: msToHours(timeLeft),
    minutes: msToMinutes(timeLeft),
    seconds: msToSeconds(timeLeft),
  } as const;

  useEffect(() => {
    const savedModesTime = localStorage.timerModesTime;
    const parsedModesTime = savedModesTime
      ? JSON.parse(savedModesTime)
      : initialTimerModesTime;
    setTimerModesTime(parsedModesTime);

    const savedStarted = localStorage.started
      ? Number(localStorage.started)
      : Date.now();
    localStorage.started && setTimeStarted(Number(localStorage.started));
    const savedTimerMode = localStorage.timerMode;
    savedTimerMode && setTimerMode(Number(savedTimerMode));
    const savedTimerState = localStorage.timerState;
    savedTimerState && setTimerState(savedTimerState);
    const savedPauses = JSON.parse(localStorage.pauses ?? "[]");
    setPauses(savedPauses);
    const getSavedTimeLeft = () =>
      getTimeLeft(savedStarted, parsedModesTime, savedTimerMode, savedPauses);
    setTimeLeft(getSavedTimeLeft());

    const newInterval =
      savedStarted &&
      savedTimerState === "unpaused" &&
      setInterval(() => setTimeLeft(getSavedTimeLeft()), 1000);
    newInterval && setIntervalVar(newInterval);
    return () => {
      interval && clearInterval(interval);
      newInterval && clearInterval(newInterval);
    };
  }, []);
  useEffect(() => {
    if (timeLeft < 0) {
      handleTimeModeSkip();
    }
  }, [timeLeft]);

  const [interval, setIntervalVar] = useState<null | NodeJS.Timeout>(null);
  function handleTimerStart() {
    interval && clearInterval(interval);

    if (nextTimerState === "unpaused") {
      startTimer();

      setLastPauseEnd();
    } else if (nextTimerState === "paused") {
      // we have already paused with clearInterval
      addPause();
    }

    setTimerState(nextTimerState);
    localStorage.timerState = nextTimerState;
  }

  function handleTimeModeSkip() {
    interval && clearInterval(interval);

    localStorage.timerMode = nextTimerMode;
    setTimerMode(nextTimerMode);

    setTimerState("notStarted");
    localStorage.timerState = "notStarted";

    setPauses([]);
    delete localStorage.pauses;
    setTimeStarted(null);
    delete localStorage.started;

    setTimeLeft(timerModesTime[nextTimerMode].time);
  }

  function startTimer() {
    const newStarted = timeStarted === null ? Date.now() : timeStarted;
    setTimeStarted(newStarted);
    localStorage.started = newStarted;

    const newInterval = setInterval(
      () => handleTimerInterval(newStarted),
      1000,
    );
    setIntervalVar(newInterval);
  }

  function addPause() {
    const newPauses = [
      ...pauses,
      {
        start: Date.now(),
        end: undefined,
      },
    ];
    setPauses(newPauses);
    localStorage.pauses = JSON.stringify(newPauses);
  }
  function setLastPauseEnd() {
    const lastPause = pauses.at(-1);
    if (!lastPause) return;

    lastPause.end = lastPause.end ?? Date.now();
    setPauses(pauses);
    localStorage.pauses = JSON.stringify(pauses);
  }

  function handleTimerInterval(newStarted: number, newModesTime?: TimerMode[]) {
    const newTimeLeft = getTimeLeft(newStarted, newModesTime ?? timerModesTime);
    setTimeLeft(newTimeLeft);
  }

  function getTimeLeft(
    newStarted: number,
    newTimerModesTime: TimerMode[],
    newTimerMode?: number,
    newPauses?: Pause[],
  ) {
    const timePaused = getTimePaused(newPauses);

    const timerEndsAt =
      newStarted +
      newTimerModesTime[newTimerMode ?? timerMode].time +
      timePaused;

    const newTimeLeft = timerEndsAt - Date.now();
    return newTimeLeft;
  }

  function getTimePaused(newPauses?: Pause[]) {
    const pausesTime = (newPauses ?? pauses).reduce(
      (acc, curr) =>
        curr.end ? acc + curr.end - curr.start : acc + Date.now() - curr.start,
      0,
    );
    return pausesTime;
  }
  return (
    <>
      <section className="card w-96 text-center">
        <div className="flex justify-between items-center relative mb-4">
          <p className="opacity-50 w-full">{timerModesTime[timerMode].name}</p>
          <TimerSettings
            timerModesTime={timerModesTime}
            setTimerModesTime={setTimerModesTime}
          />
        </div>
        <Timestamp timeObject={timeFromMs} />
        <TimerControls
          handleTimerStart={handleTimerStart}
          state={timerState}
          handleTimeModeSkip={handleTimeModeSkip}
        />
      </section>
      <CurrentTask />
    </>
  );
}
