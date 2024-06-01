import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Label } from "./label";
import type { Task } from "../tasks";

interface TaskProps {
  task: Task;
  onChange: (task: Task) => void;
  onDelete: (originalIndex: number) => void;
}

export default function Task({ task, onChange, onDelete }: TaskProps) {
  return (
    <div className="flex gap-4 items-center py-4 justify-between w-full">
      <Label className="flex gap-2">
        <Checkbox
          checked={task.checked}
          onCheckedChange={(checked) => {
            onChange({
              ...task,
              checked: checked as boolean,
            });
          }}
        />
        {task.title}
      </Label>
      <div className="flex gap-2">
        <Button variant="secondary" size="sm">
          start working on
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(task.originalIndex)}
        >
          delete
        </Button>
      </div>
    </div>
  );
}
