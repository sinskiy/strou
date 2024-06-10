import { HandleChangeTask } from "@/app/tasks/page";
import TaskTags from "./taskTags";
import { Task } from "@/lib/tasks";
import { MouseEvent } from "react";

interface TagsSelectedProps {
  task: Task;
  onChange: HandleChangeTask;
}

export default function TagsSelected({ task, onChange }: TagsSelectedProps) {
  function handleDeleteTag(e: MouseEvent<HTMLUListElement>) {
    const target = e.target as HTMLUListElement | HTMLLIElement;
    if (target.getAttribute("aria-label")) return;

    onChange({
      ...task,
      tags: task.tags
        ? task.tags.filter((tag) => tag !== target.innerText)
        : [],
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
