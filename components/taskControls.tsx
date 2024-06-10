import {
  HandleChangeTask,
  HandleCurrentTaskChange,
  HandleDeleteTask,
} from "@/app/tasks/page";
import { Task } from "@/lib/tasks";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import TaskTagsSelector from "./taskTagsSelector";

interface TaskControlsProps {
  task: Task;
  tags: string[];
  current: boolean;
  onChange: HandleChangeTask;
  onDelete: HandleDeleteTask;
  onCurrentTaskChange: HandleCurrentTaskChange;
}

export default function TaskControls({
  task,
  tags,
  current,
  onChange,
  onDelete,
  onCurrentTaskChange,
}: TaskControlsProps) {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon">
            ⋮
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col w-fit p-0">
          {
            <Button
              variant="ghost"
              onClick={() =>
                !current
                  ? onCurrentTaskChange(task.originalIndex)
                  : onCurrentTaskChange(null)
              }
            >
              {current ? "remove current" : "make current"}
            </Button>
          }
          <Button variant="ghost" onClick={() => onDelete(task.originalIndex)}>
            delete
          </Button>
          {tags && <hr className="border-t-2 mb-2" />}
          <TaskTagsSelector task={task} tags={tags} onChange={onChange} />
        </PopoverContent>
      </Popover>
    </>
  );
}
