import { Dispatch, FormEvent, SetStateAction } from "react";
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
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    handleAddTask(newTaskTitle);
  }
  return (
    <form method="get" className="flex gap-4" onSubmit={handleSubmit}>
      <Input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <Button variant="secondary" disabled={newTaskTitle.length <= 0}>
        add task
      </Button>
    </form>
  );
}
