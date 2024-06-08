import { HandleCurrentTaskChange, HandleDeleteTask } from "@/app/tasks/page";
import { Task } from "@/lib/tasks";
import { Button } from "./ui/button";

interface TaskControlsProps {
  task: Task;
  current: boolean;
  onDelete: HandleDeleteTask;
  onCurrentTaskChange: HandleCurrentTaskChange;
}

export default function TaskControls({
  task,
  current,
  onDelete,
  onCurrentTaskChange,
}: TaskControlsProps) {
  return (
    <div className="flex gap-2">
      {!current && (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onCurrentTaskChange(task.originalIndex)}
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
  );
}
