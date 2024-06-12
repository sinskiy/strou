import { HOUR_IN_MS } from "./time";

export interface TimerMode {
  id: number;
  name: string;
  time: number;
}
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

export function getTimerModeID(timerMode: TimerMode): string {
  return `${timerMode.id}-${timerMode.name}-${timerMode.time}`;
}

export function getNextID(timerModes: TimerMode[]): number {
  if (!timerModes.length) return 0;

  return (
    timerModes.reduce((biggest, curr) => Math.max(biggest, curr.id), 0) + 1
  );
}
