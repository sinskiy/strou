import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Label } from "./label";
import type { Task } from "../tasks";

interface TaskProps {
  task: Task;
  onDelete: (originalIndex: number) => void;
}

export default function Task({ task, onDelete }: TaskProps) {
  return (
    <div className="flex gap-4 items-center py-4 justify-between w-full">
      <Label className="flex gap-2">
        <Checkbox />
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
