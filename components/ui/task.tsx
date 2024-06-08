import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Label } from "./label";
import type { Task } from "../tasks";
import Tags from "../tags";
import { tags } from "@/app/tasks/page";

interface TaskProps {
  task: Task;
  current: boolean;
  handleCurrentTaskChange: (originalIndex: number) => void;
  onChange: (task: Task) => void;
  onDelete: (originalIndex: number) => void;
}
// TODO: refactor this component

export default function Task({
  task,
  current,
  handleCurrentTaskChange,
  onChange,
  onDelete,
}: TaskProps) {
  return (
    <article>
      <div className="flex gap-4 items-center py-4 justify-between w-full">
        <div className="flex gap-2 items-center">
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
      <div>
        {task.tags && <Tags tags={task.tags} />}
        <Button variant="secondary" size="sm">
          add tag
        </Button>
      </div>
    </article>
  );
}
