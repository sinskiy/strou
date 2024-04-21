import type { Period, Time } from "./datetimeTypes";

export function humanTime({ hours, minutes }: Time) {
  const humanTimeUnit = (unit: number) => unit.toString().padStart(2, "0");

  return `${humanTimeUnit(hours)}:${humanTimeUnit(minutes)}`;
}

export function isTime(parameter: string): boolean {
  if (parameter.split(":").length > 1) {
    return true;
  } else {
    return false;
  }
}

export function parseTime(time: string): Period {
  const period = time.split("-");
  if (period.length === 2) {
    const [start, finish]: Time[] = period.map((timestamp) =>
      toTimeObject(timestamp)
    );
    return { start, finish };
  } else if (period.length === 1) {
    const start = toTimeObject(time);
    const finish = start;
    return { start, finish };
  }
  throw Error();
}

export function toTimeObject(timestamp: string): Time {
  const [hours, minutes] = timestamp
    .split(":")
    .map((timeUnitString) => Number(timeUnitString));
  return { hours, minutes };
}
