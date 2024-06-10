export interface Timestamp {
  hours: number;
  minutes: number;
  seconds: number;
}

export const SECOND = 1000;
export const MINUTE_IN_MS = SECOND * 60;
export const HOUR_IN_MS = MINUTE_IN_MS * 60;

export const initialTimerModes = ["work", "break"] as const;
export type TimerModesTime = {
  [key: string]: number;
};
export const initialTimerModesTime: TimerModesTime = {
  work: MINUTE_IN_MS * 50,
  break: MINUTE_IN_MS * 5,
};

export const msToHours = (ms: number) => (ms / HOUR_IN_MS) % 24;
export const msToMinutes = (ms: number) => (ms / MINUTE_IN_MS) % 60;
export const msToSeconds = (ms: number) => (ms / SECOND) % 60;

export const formatTimeUnit = (timeUnit: number) =>
  `${Math.floor(timeUnit)}`.padStart(2, "0");
