import { Task } from "@/lib/tasks";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface MakeSubTaskProps {
  tasks: Task[];
  setNewTaskParent: SetState<number>;
}

export default function MakeSubTask({
  tasks,
  setNewTaskParent,
}: MakeSubTaskProps) {
  return (
    <Select onValueChange={(value) => setNewTaskParent(Number(value))}>
      <SelectTrigger className="max-w-fit min-w-24">
        <SelectValue placeholder="subtask of" />
      </SelectTrigger>
      <SelectContent>
        {tasks.map((task) => (
          <SelectItem key={task.id} value={String(task.id)}>
            {task.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
