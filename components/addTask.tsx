import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { HandleAddTask } from "@/app/tasks/page";

interface AddTaskProps {
  newTaskTitle: string;
  setNewTaskTitle: Dispatch<SetStateAction<string>>;
  handleAddTask: HandleAddTask;
}

export default function AddTask({
  newTaskTitle,
  setNewTaskTitle,
  handleAddTask,
}: AddTaskProps) {
  return (
    <div className="flex gap-4">
      <Input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <Button variant="secondary" onClick={() => handleAddTask(newTaskTitle)}>
        add task
      </Button>
    </div>
  );
}
