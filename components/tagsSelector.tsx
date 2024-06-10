import { HandleChangeTask } from "@/app/tasks/page";
import TaskTags from "./taskTags";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Task } from "@/lib/tasks";
import { MouseEvent } from "react";
import { initialTags } from "@/lib/tags";

interface TasksSelectorProps {
  task: Task;
  tags: string[];
  onChange: HandleChangeTask;
}

export default function TasksSelector({
  task,
  tags,
  onChange,
}: TasksSelectorProps) {
  const filteredTags = tags.slice(1).filter((tag) => !task.tags?.includes(tag));
  function handleAddTag(e: MouseEvent<HTMLUListElement>) {
    const { innerText } = e.target as HTMLElement;
    // @ts-ignore by tags.includes(innerText) we check if target is tag element
    const tag = tags.includes(innerText) ? innerText : null;
    tag &&
      onChange({
        ...task,
        tags: task.tags ? [...task.tags, tag] : [tag],
      });
  }
  return (
    <>
      {filteredTags.length ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="p-0 size-6 rounded-full">
              +
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <ul className="flex flex-wrap gap-2" onClick={handleAddTag}>
              <TaskTags tags={filteredTags} />
            </ul>
          </PopoverContent>
        </Popover>
      ) : (
        ""
      )}
    </>
  );
}
