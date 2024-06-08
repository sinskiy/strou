import { tags } from "@/app/tasks/page";
import TaskTags from "./taskTags";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface TasksSelectorProps {
  tags: typeof tags;
}

export default function TasksSelector({ tags }: TasksSelectorProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="p-0 size-6 rounded-full">
          +
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <ul className="flex flex-wrap gap-2">
          <TaskTags tags={tags.slice(1)} />
        </ul>
      </PopoverContent>
    </Popover>
  );
}
