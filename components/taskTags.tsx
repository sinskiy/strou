import { Task } from "@/lib/tasks";
import { HandleTagCheck } from "./tagsSelector";
import TaskTag from "./ui/taskTag";

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
          <TaskTag
            key={`${tag}-TaskTags`}
            checked={Boolean(task.tags?.includes(tag))}
            onTagCheck={onTagCheck}
          >
            {tag}
          </TaskTag>
        </>
      ))}
    </>
  );
}
