import type { Period, Time } from "./datetimeTypes";

export function objectToHumanTime({ hours, minutes }: Time) {
  const numberToHumanUnit = (timeAsNumber: number) =>
    timeAsNumber.toString().padStart(2, "0");

  return `${numberToHumanUnit(hours)}:${numberToHumanUnit(minutes)}`;
}

export function hasTimestamp(parameter: string): boolean {
  const timeUnits: string[] = parameter.split(":");
  if (timeUnits.length === 2) {
    return true;
  } else if (timeUnits.length === 3) {
    const period = parameter.split("-");
    if (period.length === 2) {
      return true;
    }
  }

  return false;
}

export function humanTimeToObject(time: string): Period {
  const period = time.split("-");

  if (period.length === 2) {
    const [start, finish]: Time[] = period.map((timestamp) =>
      timestampToObject(timestamp)
    );
    return { start, finish };
  } else if (period.length === 1) {
    const start = timestampToObject(time);
    const finish = start;
    return { start, finish };
  }

  throw Error();
}

export function timestampToObject(timestamp: string): Time {
  const [hours, minutes] = timestamp
    .split(":")
    .map((humanUnit) => Number(humanUnit));
  return { hours, minutes };
}
