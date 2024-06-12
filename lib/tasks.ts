import { HOUR_IN_MS } from "./time";

export interface Task {
  id: number;
  title: string;
  checked: boolean;
  tags?: string[];
  dateTime?: number;
  repeatInterval?: number;
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

  const difference = task.repeatInterval * 24 * HOUR_IN_MS;
  const add = addDifference ?? !task.checked;
  if (add) {
    return task.dateTime + difference;
  } else {
    return task.dateTime - difference;
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
