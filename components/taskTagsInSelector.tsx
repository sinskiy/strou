import { Task } from "@/lib/tasks";
import { HandleTagCheck } from "./taskTagsSelector";
import TaskTagInSelector from "./taskTagInSelector";

interface TaskTagsProps {
  task: Task;
  tags: string[];
  onTagCheck: HandleTagCheck;
}

export default function TaskTags({ task, tags, onTagCheck }: TaskTagsProps) {
  return (
    <>
      {tags.map((tag) => (
        <>
          <TaskTagInSelector
            key={`${tag}-TaskTagInSelector`}
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
