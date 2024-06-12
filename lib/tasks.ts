export interface Task {
  id: number;
  title: string;
  checked: boolean;
  dateTime?: Date | string;
  tags?: string[];
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
