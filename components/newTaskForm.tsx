import { type SetStateAction } from "react";
import Add from "./icons/addIcon";
import Button from "./ui/button";
import { type HandleAddTodo } from "@/app/page";

interface NewTaskFormProps {
  handleAddTodo: HandleAddTodo;
  newTask: string;
  setNewTask: (value: SetStateAction<string>) => void;
}

export default function NewTaskForm({
  handleAddTodo,
  newTask,
  setNewTask,
}: NewTaskFormProps) {
  return (
    <form onSubmit={handleAddTodo} className="flex gap-4">
      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        type="text"
        placeholder="what you want to do?"
        name="task-title"
        id="task-title"
      />
      <Button disabled={!newTask}>
        <Add />
        add
      </Button>
    </form>
  );
}
