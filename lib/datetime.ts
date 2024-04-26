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

export function humanTimeToObject(time: string): Period | null {
  const period = time.split("-");

  const [start, finish = start]: Array<Time | null> = period.map((timestamp) =>
    timestampToObject(timestamp),
  );

  if (!start || !finish) {
    return null;
  }

  return { start, finish };
}

export function timestampToObject(timestamp: string): Time | null {
  const [hours, minutes] = timestamp
    .split(":")
    .map((humanUnit) => Number(humanUnit));

  if (hours < 0 || hours > 24 || minutes < 0 || minutes > 60) {
    return null;
  }

  return { hours, minutes };
}

export function absoluteTime(timeObject: Time[]): number[] {
  return timeObject.map(({ hours, minutes }) => hours * 60 + minutes);
}

export function duration(start: Time, finish: Time): number {
  const [startAbsolute, finishAbsolute] = absoluteTime([start, finish]);
  return finishAbsolute - startAbsolute;
}
