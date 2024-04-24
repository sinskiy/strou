import type { Task } from "./scheduleTypes";
import type { Time } from "./datetimeTypes";
import { absoluteTime } from "./datetime";

export function sortSchedule(schedule: Task[]): Task[] {
  return schedule.sort((prev, next) => {
    if (prev.start && next.start) {
      const [a, b] = absoluteTime([prev.start, next.start]);
      return a - b;
    } else {
      return 0;
    }
  });
}
