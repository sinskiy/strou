import type { Period, Time } from "./datetimeTypes";
import type { Task } from "./scheduleTypes";

export function parseSchedule(schedule: string): Task[] {
  const tasks = schedule.split("\n");

  const parsedSchedule: Task[] = tasks.map((task) => parseTask(task));
  return parsedSchedule;
}

function parseTask(task: string): Task {
  const parameters = task.split(" ");

  const taskObject: Task = parameters.reduce((acc: any, parameter) => {
    if (isTime(parameter)) {
      return { ...acc, ...parseTime(parameter) };
    } else {
      if (Object.hasOwn(acc, "name")) {
        return { ...acc, name: (acc.name += " " + parameter) };
      } else {
        return { ...acc, name: (acc.name = parameter) };
      }
    }
  }, {});

  return taskObject;
}

function isTime(parameter: string): boolean {
  if (parameter.split(":").length > 1) {
    return true;
  } else {
    return false;
  }
}

function parseTime(time: string): Period {
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

function toTimeObject(timestamp: string): Time {
  const [hours, minutes] = timestamp
    .split(":")
    .map((timeUnitString) => Number(timeUnitString));
  return { hours, minutes };
}
