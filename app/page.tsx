"use client";

import CurrentTask from "@/components/currentTask";
import TimerControls from "@/components/timerControls";
import Timestamp from "@/components/timestamp";
import { useEffect, useState } from "react";
import {
  Timestamp as ITimestamp,
  TimerModesTime,
  initialTimerModes,
  initialTimerModesTime,
  msToHours,
  msToMinutes,
  msToSeconds,
} from "@/lib/time";
import TimerSettings from "@/components/timerSettings";

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

  const [timerModesTime, setTimerModesTime] = useState<TimerModesTime>(
    initialTimerModesTime,
  );
  const [timerMode, setTimerMode] = useState<string>(initialTimerModes[0]);
  const nextTimerMode: string = timerMode === "work" ? "break" : "work";
  // TODO: change ^

  const [timeStarted, setTimeStarted] = useState<number | null>(null);

  const [pauses, setPauses] = useState<Pause[]>([]);

  const [timeLeft, setTimeLeft] = useState(timerModesTime[timerMode]);
  const timeFromMs: ITimestamp = {
    hours: msToHours(timeLeft),
    minutes: msToMinutes(timeLeft),
    seconds: msToSeconds(timeLeft),
  } as const;

  useEffect(() => {
    const savedTimerModesTime = JSON.parse(
      localStorage.timerModesTime ?? initialTimerModesTime,
    );
    setTimerModesTime(savedTimerModesTime);

    setTimeLeft(getTimeLeft(Date.now(), savedTimerModesTime));
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

    setTimeLeft(timerModesTime[nextTimerMode]);
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

  function getTimeLeft(newStarted: number, newTimerModesTime: TimerModesTime) {
    const timePaused = getTimePaused();

    const timerEndsAt = newStarted + newTimerModesTime[timerMode] + timePaused;

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
          <p className="opacity-50 w-full">{timerMode}</p>
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
