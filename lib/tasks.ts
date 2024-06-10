export interface Task {
  originalIndex: number;
  title: string;
  checked: boolean;
  tags?: string[];
}

export function getNextIndex(tasks: Task[]) {
  if (!tasks.length) return 0;

  return (
    tasks.sort((a, b) => b.originalIndex - a.originalIndex)[0].originalIndex + 1
  );
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
