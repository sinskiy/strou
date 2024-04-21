import { Task } from "./scheduleTypes";
import { Time } from "./datetimeTypes";

export function sortSchedule(schedule: Task[]): Task[] {
  return schedule.sort((prev, next) => {
    if (prev.start && next.start) {
      const [a, b] = comparableTime([prev.start, next.start]);
      return a - b;
    } else {
      return 0;
    }
  });
}

function comparableTime(toCompare: Time[]): number[] {
  return toCompare.map(({ hours, minutes }) => hours * 60 + minutes);
}
