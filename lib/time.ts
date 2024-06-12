import { format } from "date-fns";

export function getFormattedDate(date: string | Date | undefined) {
  if (!date) return null;

  const realDate = new Date(date);
  const today = isToday(realDate);
  const formattedDate = today ? "today" : format(date, "PPP").slice(0, -8);
  const formattedTime = isTimeNotSet(realDate)
    ? ""
    : realDate.toTimeString().slice(0, 5);
  const formattedDateTime = `${formattedDate} ${formattedTime}`;
  return formattedDateTime;

  function isToday(date: Date): boolean {
    const today = new Date().toDateString();
    return today === date.toDateString();
  }
}

export function isBeforeNow(date: string) {
  const realDate = new Date(date);
  const today = new Date();
  if (isTimeNotSet(realDate)) {
    realDate.setHours(23, 59);
  }

  return today > realDate;
}

function isTimeNotSet(date: Date) {
  return date.getHours() === 0 && date.getMinutes() === 0;
}

export interface Timestamp {
  hours: number;
  minutes: number;
  seconds: number;
}

type MsToUnit = (ms: number) => number;
export const msToHours: MsToUnit = (ms) => (ms / HOUR_IN_MS) % 24;
export const msToMinutes: MsToUnit = (ms) => (ms / MINUTE_IN_MS) % 60;
export const msToSeconds: MsToUnit = (ms) => (ms / SECOND) % 60;

export const formatTimeUnit = (timeUnit: number) =>
  `${Math.floor(timeUnit)}`.padStart(2, "0");

export const SECOND = 1000;
export const MINUTE_IN_MS = SECOND * 60;
export const HOUR_IN_MS = MINUTE_IN_MS * 60;
