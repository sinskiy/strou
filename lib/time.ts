import { format } from "date-fns";

export function getFormattedDate(date: string | undefined): string | null {
  if (!date) return null;

  const realDate = new Date(date);
  const relative = getRelativeDate(realDate);
  if (relative) return relative;

  const formattedDate = format(date, "PPP").slice(0, -8);

  if (isAtLastMinute(realDate)) return formattedDate;

  const formattedTime = realDate.toTimeString().slice(0, 5);
  const formattedDateTime = `${formattedDate} ${formattedTime}`;
  return formattedDateTime;
}

export function getFormattedNextDate(
  dateTime: string,
  repeatIntervalInDays: number,
  lastRepeated: number,
) {
  const nextDate = getNextDate(dateTime, repeatIntervalInDays, lastRepeated);

  const relative = getRelativeDate(nextDate);
  const formattedDate = relative
    ? relative
    : format(nextDate, "PPP").slice(0, -8);
  if (isAtStart(nextDate)) return formattedDate;

  const formattedTime = nextDate.toTimeString().slice(0, 5);
  const formattedDateTime = `${formattedDate} ${formattedTime}`;
  return formattedDateTime;
}

export function getNextDate(
  dateTime: string,
  repeatIntervalInDays: number,
  lastRepeated: number,
) {
  const realDate = new Date(dateTime);
  console.log(realDate);

  const nextTime = lastRepeated + repeatIntervalInDays * 24 * HOUR_IN_MS;
  const nextDate = new Date(nextTime);
  if (isAtLastMinute(realDate)) {
    nextDate.setHours(0, 0);
  } else {
    nextDate.setHours(realDate.getHours(), realDate.getMinutes());
  }
  return nextDate;
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

function isAtStart(date: Date): boolean {
  return date.getHours() === 0 && date.getMinutes() === 0;
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
