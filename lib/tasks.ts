import { HOUR_IN_MS, getFormattedDate } from "./time";

export interface Task {
  id: number;
  title: string;
  checked: boolean;
  tags?: string[];
  dateTime?: number;
  repeatInterval?: number;
  weekDays?: number[];
}

export function getNeededDate(task: Task): null | string {
  if (!task.dateTime) return null;

  if (task.weekDays && task.weekDays.length && task.repeatInterval) {
    return getFormattedDate(getNextDate(task, true) ?? task.dateTime);
  } else {
    return getFormattedDate(task.dateTime);
  }
}

export function getNextDate(
  task: Task,
  addDifference?: boolean,
): number | undefined {
  if (!task.dateTime) {
    return;
  }

  if (!task.repeatInterval) {
    return task.dateTime;
  }

  const add = addDifference ?? !task.checked;
  return task.dateTime + getDifference(add);

  function getDifference(add: boolean): number {
    if (!task.dateTime || !task.repeatInterval) return 0;

    if (task.weekDays && task.weekDays.length) {
      const taskDate = new Date(task.dateTime);
      const taskWeekDay = taskDate.getDay();
      const nextWeekDays = task.weekDays.filter((day) =>
        add ? day > taskWeekDay : day < taskWeekDay,
      );
      if (add) {
        const nextWeekDay = nextWeekDays.length
          ? Math.min(...nextWeekDays)
          : Math.min(...task.weekDays);
        const weekDayDistance = nextWeekDays.length
          ? nextWeekDay - taskWeekDay
          : 7 - taskWeekDay + nextWeekDay;
        const intervalInMs =
          (weekDayDistance + task.repeatInterval - 7) * 24 * HOUR_IN_MS;
        return intervalInMs;
      } else {
        const prevWeekDay = nextWeekDays.length
          ? Math.max(...nextWeekDays)
          : Math.max(...task.weekDays);
        const weekDayDistance = nextWeekDays.length
          ? taskWeekDay - prevWeekDay
          : 7 + taskWeekDay - prevWeekDay;
        const intervalInMs =
          (weekDayDistance + task.repeatInterval - 7) * 24 * HOUR_IN_MS;
        return -intervalInMs;
      }
    } else {
      const intervalInMs = task.repeatInterval * 24 * HOUR_IN_MS;
      return add ? intervalInMs : -intervalInMs;
    }
  }
}

export function getNextID(tasks: Task[]): number {
  if (!tasks.length) return 0;

  return tasks.reduce((biggest, curr) => Math.max(biggest, curr.id), 0) + 1;
}

export function filterTasksTags(tasks: Task[], newTags: string[]): Task[] {
  return tasks.map((task) => {
    if (!task.tags) return task;

    const tagsFiltered: string[] = task.tags.filter((tag) =>
      newTags.includes(tag),
    );
    return { ...task, tags: tagsFiltered };
  });
}
