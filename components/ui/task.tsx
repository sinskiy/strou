import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Label } from "./label";
import type { Task } from "../tasks";
import { tags } from "@/app/tasks/page";
import TaskTags from "../taskTags";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

// TODO: reduce duplication in props
interface TaskProps {
  task: Task;
  current: boolean;
  handleCurrentTaskChange: (originalIndex: number) => void;
  onChange: (task: Task) => void;
  onDelete: (originalIndex: number) => void;
  onAddTag: (originalIndex: number, tag: string) => void;
}
// TODO: refactor this component

export default function Task({
  task,
  current,
  handleCurrentTaskChange,
  onChange,
  onDelete,
  onAddTag,
}: TaskProps) {
  return (
    <article>
      <div className="flex gap-4 py-4 justify-between w-full">
        <div className="flex gap-2">
          <Checkbox
            checked={task.checked}
            onCheckedChange={(checked) => {
              onChange({
                ...task,
                checked: checked as boolean,
              });
            }}
            id={String(task.originalIndex)}
          />
          <div className="space-y-2">
            <input
              value={task.title}
              aria-hidden={true}
              onChange={(e) => {
                onChange({
                  ...task,
                  title: e.target.value,
                });
              }}
            />
            <ul className="flex gap-1">
              {task.tags && <TaskTags tags={task.tags} />}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="py-0 px-4 size-6 rounded-full"
                  >
                    +
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <ul className="flex flex-wrap gap-2">
                    <TaskTags
                      onTagClick={onAddTag}
                      originalIndex={task.originalIndex}
                      tags={tags.slice(1)}
                    />
                  </ul>
                </PopoverContent>
              </Popover>
            </ul>
          </div>
        </div>
        <Label className="sr-only" htmlFor={String(task.originalIndex)}>
          {task.title}
        </Label>
        <div className="flex gap-2">
          {!current && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleCurrentTaskChange(task.originalIndex)}
            >
              start working on
            </Button>
          )}
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(task.originalIndex)}
          >
            delete
          </Button>
        </div>
      </div>
    </article>
  );
}
