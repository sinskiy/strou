import { format } from "date-fns";

export function getFormattedDate(date: number): string {
  const realDate = new Date(date);
  const relative = getRelativeDate(realDate);

  const formattedDate = relative ? relative : format(date, "PPP").slice(0, -8);

  if (isAtLastMinute(realDate)) return formattedDate;

  const formattedTime = realDate.toTimeString().slice(0, 5);
  const formattedDateTime = `${formattedDate} ${formattedTime}`;
  return formattedDateTime;
}

export function getDefaultTime(): number {
  const defaultDate = new Date();
  defaultDate.setHours(23, 59);
  const defaultTime = defaultDate.getTime();
  return defaultTime;
}

function getRelativeDate(
  date: Date,
): "yesterday" | "today" | "tomorrow" | null {
  const currDate = new Date();

  const today = currDate.toDateString();
  if (today === date.toDateString()) {
    return "today";
  }

  const tomorrow = dateInDays(currDate, 1).toDateString();
  if (tomorrow === date.toDateString()) {
    return "tomorrow";
  }

  const yesterday = dateInDays(currDate, -1).toDateString();
  if (yesterday === date.toDateString()) {
    return "yesterday";
  }

  return null;
}

export function dateInDays(date: Date, days: number): Date {
  return new Date(date.setDate(date.getDate() + days));
}

export function isBeforeNow(date: string): boolean {
  const realDate = new Date(date);
  const today = new Date();

  return today > realDate;
}

function isAtLastMinute(date: Date): boolean {
  return date.getHours() === 23 && date.getMinutes() === 59;
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

type UnitToFormatted = (timeUnit: number) => string;
export const formatTimeUnit: UnitToFormatted = (timeUnit) =>
  `${Math.floor(timeUnit)}`.padStart(2, "0");

export const SECOND = 1000;
export const MINUTE_IN_MS = SECOND * 60;
export const HOUR_IN_MS = MINUTE_IN_MS * 60;

export const WEEK_DAYS = [
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun",
] as const;
