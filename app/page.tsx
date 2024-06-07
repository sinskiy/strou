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

  const [timerModesTime, setTimerModesTime] = useState<TimerModesTime>({
    work: MINUTE_IN_MS * 50,
    break: MINUTE_IN_MS * 5,
  });
  const [timerMode, setTimerMode] = useState<TimerMode>("work");
  function nextTimerMode() {
    return timerMode === "work" ? "break" : "work";
  }
  function nextState(): TimerState {
    return state === "paused" ? "unpaused" : "paused";
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

      setStarted(null);
    }

    const newState = nextState();
    if (newState === "unpaused") {
      let newStarted = started === null ? Date.now() : null;
      if (newStarted) {
        setStarted(Date.now());
      }

      setLastPauseEnd();

      const newInterval = setInterval(() => {
        const timePaused = getTimePaused();
        const newTimeLeft =
          (newStarted ?? started!) +
          timerModesTime[timerMode] +
          timePaused -
          Date.now();
        setTimeLeft(newTimeLeft);
      }, 1000);
      setIntervalVar(newInterval);
    } else if (newState === "paused") {
      setTimerPaused();
    }

    setState(newState);
  }
  function handleTimeModeSkip() {
    setTimerMode(nextTimerMode());

    setState("paused");
    interval && clearInterval(interval);

    setPauses([]);

    setTimeLeft(timerModesTime[nextTimerMode()]);

    setStarted(null);
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
