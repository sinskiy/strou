export interface Timestamp {
  hours: number;
  minutes: number;
  seconds: number;
}

export const SECOND = 1;
export const MINUTE_IN_SECONDS = SECOND * 60;
export const HOUR_IN_SECONDS = MINUTE_IN_SECONDS * 60;

export const secondsToHours = (s: number) => (s / HOUR_IN_SECONDS) % 24;
export const secondsToMinutes = (s: number) => (s / MINUTE_IN_SECONDS) % 60;
export const secondsToLeft = (s: number) => s % 60;

export const formatTimeUnit = (timeUnit: number) =>
  `${Math.floor(timeUnit)}`.padStart(2, "0");
