import { hasTimestamp, humanTimeToObject } from "./datetime";
import type { Task } from "./scheduleTypes";

export function parseSchedule(schedule: string): Task[] {
  const tasks = schedule.split("\n");

  const parsedSchedule: Task[] = tasks.map((task, i) => parseTask(task, i));
  return parsedSchedule;
}

function parseTask(task: string, index: number): Task {
  const parameters = task.split(" ");

  const taskObject: Task = parameters.reduce(
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
    { checked: false, originalIndex: index }
  ) as Task;
  console.log(taskObject);

  return taskObject;
}
