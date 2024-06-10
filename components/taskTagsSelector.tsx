import { HandleChangeTask } from "@/app/tasks/page";
import TaskTagsInSelector from "./taskTagsInSelector";
import { Task } from "@/lib/tasks";
import { ChangeEvent } from "react";

interface TaskTagsSelectorProps {
  task: Task;
  tags: string[];
  onChange: HandleChangeTask;
}

export type HandleTagCheck = (e: ChangeEvent<HTMLInputElement>) => void;

export default function TaskTagsSelector({
  task,
  tags,
  onChange,
}: TaskTagsSelectorProps) {
  const handleTagCheck: HandleTagCheck = (e) => {
    const { id, checked } = e.currentTarget;
    if (checked) {
      onChange({
        ...task,
        tags: task.tags ? [...task.tags, id] : [id],
      });
    } else {
      onChange({
        ...task,
        // return undefined to keep task.tags as-is
        tags: task.tags ? task.tags.filter((tag) => tag !== id) : undefined,
      });
    }
  };
  return (
    <>
      {tags.length ? (
        <ul className="flex flex-col w-full">
          <TaskTagsInSelector
            task={task}
            tags={tags.slice(1)}
            onTagCheck={handleTagCheck}
          />
        </ul>
      ) : (
        ""
      )}
    </>
  );
}
