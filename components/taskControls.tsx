import {
  HandleChangeTask,
  HandleCurrentTaskChange,
  HandleDeleteTask,
} from "@/app/tasks/page";
import { Task } from "@/lib/tasks";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import TagsSelector from "./tagsSelector";
import TaskDatePicker from "./taskDatePicker";
import TaskRepeat from "./taskRepeat";

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
          <Button
            variant="ghost"
            onClick={() =>
              !current
                ? onCurrentTaskChange(task.id)
                : onCurrentTaskChange(null)
            }
          >
            {current ? "remove current" : "make current"}
          </Button>
          <TaskRepeat task={task} onChange={onChange} />
          <TaskDatePicker task={task} onChange={onChange} />
          <Button variant="ghost" onClick={() => onDelete(task.id)}>
            delete task
          </Button>
          {tags && <hr className="border-t-2 mb-2" />}
          <TagsSelector task={task} tags={tags} onChange={onChange} />
        </PopoverContent>
      </Popover>
    </>
  );
}
