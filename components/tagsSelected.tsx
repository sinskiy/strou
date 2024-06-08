import { HandleChangeTask } from "@/app/tasks/page";
import TaskTags from "./taskTags";
import { Task } from "@/lib/tasks";
import { MouseEvent } from "react";
import { isRealTag, tags } from "@/lib/tags";

interface TagsSelectedProps {
  task: Task;
  onChange: HandleChangeTask;
}

export default function TagsSelected({ task, onChange }: TagsSelectedProps) {
  function handleDeleteTag(e: MouseEvent<HTMLUListElement>) {
    const { innerText } = e.target as HTMLElement;
    if (!isRealTag(innerText)) return;

    onChange({
      ...task,
      tags: task.tags ? task.tags.filter((tag) => tag !== innerText) : [],
    });
  }
  return (
    <ul
      className="flex gap-1 flex-wrap max-w-full"
      onClick={handleDeleteTag}
      aria-label="click on tag to delete it"
    >
      {task.tags && <TaskTags tags={task.tags} />}
    </ul>
  );
}
