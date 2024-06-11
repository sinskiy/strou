export interface Task {
  id: number;
  title: string;
  dateTime: Date;
  checked: boolean;
  tags?: string[];
}

export function getNextID(tasks: Task[]) {
  if (!tasks.length) return 0;

  return tasks.reduce((biggest, curr) => Math.max(biggest, curr.id), 0) + 1;
}

export function filterTasksTags(tasks: Task[], newTags: string[]) {
  return tasks.map((task) => {
    if (!task.tags) return task;

    const tagsFiltered: string[] = task.tags.filter((tag) =>
      newTags.includes(tag),
    );
    return { ...task, tags: tagsFiltered };
  });
}
