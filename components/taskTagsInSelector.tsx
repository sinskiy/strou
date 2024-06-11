import { Task } from "@/lib/tasks";
import { HandleTagCheck } from "./taskTagsSelector";
import TaskTagInSelector from "./taskTagInSelector";

interface TaskTagsInSelectorProps {
  task: Task;
  tags: string[];
  onTagCheck: HandleTagCheck;
}

export default function TaskTagsInSelector({
  task,
  tags,
  onTagCheck,
}: TaskTagsInSelectorProps) {
  return (
    <>
      {tags.map((tag) => (
        <>
          <TaskTagInSelector
            key={tag}
            checked={Boolean(task.tags?.includes(tag))}
            onTagCheck={onTagCheck}
          >
            {tag}
          </TaskTagInSelector>
        </>
      ))}
    </>
  );
}
