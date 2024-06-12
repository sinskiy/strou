import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";

interface DeleteCompletedTasksProps {
  deleteCompletedTasks: boolean;
  setDeleteCompletedTasks: SetState<boolean>;
}

export default function DeleteCompletedTasks({
  deleteCompletedTasks,
  setDeleteCompletedTasks,
}: DeleteCompletedTasksProps) {
  return (
    <Label className="flex items-center gap-2 mt-4">
      <Checkbox
        checked={deleteCompletedTasks}
        onCheckedChange={(checked) =>
          setDeleteCompletedTasks(checked as boolean)
        }
      />
      Delete all non-repeating completed tasks
    </Label>
  );
}
