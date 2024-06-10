import { HandleChangeTask } from "@/app/tasks/page";
import TaskTags from "./taskTags";
import { Task } from "@/lib/tasks";
import { ChangeEvent } from "react";

interface TasksSelectorProps {
  task: Task;
  tags: string[];
  onChange: HandleChangeTask;
}

export type HandleTagCheck = (e: ChangeEvent<HTMLInputElement>) => void;

export default function TasksSelector({
  task,
  tags,
  onChange,
}: TasksSelectorProps) {
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
          <TaskTags
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
