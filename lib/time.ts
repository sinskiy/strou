import { format } from "date-fns";

export interface Timestamp {
  hours: number;
  minutes: number;
  seconds: number;
}

export const SECOND = 1000;
export const MINUTE_IN_MS = SECOND * 60;
export const HOUR_IN_MS = MINUTE_IN_MS * 60;

export type TimerMode = {
  id: number;
  name: string;
  time: number;
};
export const initialTimerModesTime: TimerMode[] = [
  {
    id: 0,
    name: "work",
    time: HOUR_IN_MS,
  },
  {
    id: 1,
    name: "break",
    time: HOUR_IN_MS / 3,
  },
];

export function getTimerModeID(timerMode: TimerMode) {
  return `${timerMode.id}-${timerMode.name}-${timerMode.time}`;
}

export function getNextID(timerModes: TimerMode[]): number {
  if (!timerModes.length) return 0;

  return (
    timerModes.reduce((biggest, curr) => Math.max(biggest, curr.id), 0) + 1
  );
}

export function getFormattedDate(date: string | Date | undefined) {
  if (!date) return null;

  const realDate = new Date(date);
  const today = isToday(realDate);
  const formattedDate = today ? "today" : format(date, "PPP").slice(0, -8);
  const formattedTime = realDate.toTimeString().slice(0, 5);
  const formattedDateTime = `${formattedDate} ${formattedTime}`;
  return formattedDateTime;

  function isToday(date: Date): boolean {
    const today = new Date().toDateString();
    return today === date.toDateString();
  }
}

type MsToUnit = (ms: number) => number;
export const msToHours: MsToUnit = (ms) => (ms / HOUR_IN_MS) % 24;
export const msToMinutes: MsToUnit = (ms) => (ms / MINUTE_IN_MS) % 60;
export const msToSeconds: MsToUnit = (ms) => (ms / SECOND) % 60;

export const formatTimeUnit = (timeUnit: number) =>
  `${Math.floor(timeUnit)}`.padStart(2, "0");
