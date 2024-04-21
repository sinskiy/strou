import { isTime, parseTime } from "./datetime";
import type { Task } from "./scheduleTypes";

export function parseSchedule(schedule: string): Task[] {
  const tasks = schedule.split("\n");

  const parsedSchedule: Task[] = tasks.map((task, i) => parseTask(task, i));
  return parsedSchedule;
}

function parseTask(task: string, index: number): Task {
  const parameters = task.split(" ");

  const taskObject: Task = parameters.reduce(
    (acc: any, parameter) => {
      if (isTime(parameter)) {
        return { ...acc, ...parseTime(parameter) };
      } else if (parameter === "x") {
        return { ...acc, checked: true };
      } else {
        if (Object.hasOwn(acc, "name")) {
          return { ...acc, name: (acc.name += " " + parameter) };
        } else {
          return { ...acc, name: (acc.name = parameter) };
        }
      }
    },
    { checked: false, originalIndex: index }
  );

  return taskObject;
}
