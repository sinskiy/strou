import { hasTimestamp, humanTimeToObject } from "./datetime";
import type { Task } from "./scheduleTypes";

export function parseSchedule(schedule: string): Task[] {
  const tasks = schedule.split("\n");

  const parsedSchedule: Task[] = tasks
    .map((task, i) => parseTask(task, i))
    .filter((task) => !!task?.name) as Task[];
  return parsedSchedule;
}

function parseTask(task: string, index: number): Task | undefined {
  const parameters = task.split(" ");

  const taskObject = parameters.reduce(
    (acc: Partial<Task>, parameter) => {
      if (hasTimestamp(parameter)) {
        return { ...acc, ...humanTimeToObject(parameter) };
      } else if (parameter === "x") {
        return { ...acc, checked: true };
      } else {
        return {
          ...acc,
          name: `${acc.name ? acc.name + " " : ""}${parameter}`,
        };
      }
    },
    { checked: false, originalIndex: index },
  ) as Task;

  return taskObject;
}
