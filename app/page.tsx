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

const timerStates = ["paused", "unpaused", "finished"] as const;
export type TimerState = (typeof timerStates)[number];

interface Pause {
  start: number;
  end?: number;
}

export default function Timer() {
  const [timerState, setTimerState] = useState<TimerState>("paused");
  const nextTimerState: TimerState =
    timerState === "paused" ? "unpaused" : "paused";

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

    setTimeLeft(getTimeLeft(Date.now(), parsedModesTime));
  }, []);
  useEffect(() => {
    if (timeLeft < 0) {
      handleTimeModeSkip();
    }
  }, [timeLeft]);

  const [interval, setIntervalVar] = useState<null | NodeJS.Timeout>(null);
  function handleTimerStart() {
    interval && clearInterval(interval);

    if (timerState === "finished") {
      setTimeStarted(null);

      setTimerMode(nextTimerMode);
    }

    if (nextTimerState === "unpaused") {
      startTimer();

      setLastPauseEnd();
    } else if (nextTimerState === "paused") {
      // we have already paused with clearInterval
      addPause();
    }

    setTimerState(nextTimerState);
  }

  function handleTimeModeSkip() {
    interval && clearInterval(interval);

    setTimerMode(nextTimerMode);

    setTimerState("paused");

    setPauses([]);
    setTimeStarted(null);

    setTimeLeft(timerModesTime[nextTimerMode].time);
  }

  function startTimer() {
    const newStarted = timeStarted === null ? Date.now() : timeStarted;
    setTimeStarted(newStarted);

    const newInterval = setInterval(
      () => handleTimerInterval(newStarted),
      1000,
    );
    setIntervalVar(newInterval);
  }

  function addPause() {
    const newPause = {
      start: Date.now(),
      end: undefined,
    };
    setPauses([...pauses, newPause]);
  }
  function setLastPauseEnd() {
    const lastPause = pauses.at(-1);
    if (!lastPause) return;

    lastPause.end = Date.now();
    setPauses(pauses);
  }

  function handleTimerInterval(newStarted: number) {
    const newTimeLeft = getTimeLeft(newStarted, timerModesTime);
    setTimeLeft(newTimeLeft);
  }

  function getTimeLeft(newStarted: number, newTimerModesTime: TimerMode[]) {
    const timePaused = getTimePaused();

    const timerEndsAt =
      newStarted + newTimerModesTime[timerMode].time + timePaused;

    const newTimeLeft = timerEndsAt - Date.now();
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
