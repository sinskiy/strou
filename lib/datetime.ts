import type { Time } from "./datetimeTypes";

export function humanTime({ hours, minutes }: Time) {
  const humanTimeUnit = (unit: number) => unit.toString().padStart(2, "0");

  return `${humanTimeUnit(hours)}:${humanTimeUnit(minutes)}`;
}
