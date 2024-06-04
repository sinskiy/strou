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

  const [started, setStarted] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const timeFromMs: ITimestamp = {
    hours: msToHours(timeLeft),
    minutes: msToMinutes(timeLeft),
    seconds: msToSeconds(timeLeft),
  } as const;

  const [pauses, setPauses] = useState<Pause[]>([]);

  useEffect(() => {
    const savedState = localStorage.state;
    savedState && setState(savedState);

    const savedTimerMode = localStorage.timerMode;
    savedTimerMode && setTimerMode(savedTimerMode);

    setStarted(Date.now());
    setTimeLeft(timerModesTime[timerMode]);
    setState("paused");
    setTimerPaused();
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

      setStarted(0);
    }

    const nextState = assignNextState(state);
    if (nextState === "unpaused") {
      let newPauses = pauses;
      newPauses[pauses.length - 1].end = Date.now();
      setPauses([...newPauses]);

      const newInterval = setInterval(() => {
        const timePaused = getTimePaused();
        const newTimeLeft =
          started + timerModesTime[timerMode] - Date.now() + timePaused;
        setTimeLeft(newTimeLeft);
      }, 1);
      setIntervalVar(newInterval);
    } else if (nextState === "paused") {
      setTimerPaused();
    }

    setState(nextState);
  }
  function handleTimeModeSkip() {
    setTimerMode(nextTimerMode());

    setState("paused");
    interval && clearInterval(interval);

    setStarted(0);
  }
  function setTimerPaused() {
    setPauses([...pauses, { start: Date.now(), end: undefined }]);
  }
  function setTimerFinished() {
    interval && clearInterval(interval);

    setState("finished");
  }
  function getTimePaused() {
    return pauses.reduce(
      (acc, curr) =>
        curr.end ? acc + curr.end - curr.start : acc + Date.now() - curr.start,
      0,
    );
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

function assignNextState(currentState: TimerState): TimerState {
  switch (currentState) {
    case "finished":
    case "paused":
      return "unpaused";
    case "unpaused":
      return "paused";
  }
}
