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
    <form onSubmit={handleAddTodo} className="flex flex-wrap gap-4">
      <div className="relative w-[calc(100%-5rem)] sm:w-auto">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          type="text"
          placeholder="what do you want to do?"
          name="task-title"
          id="task-title"
          className="w-full"
        />
        <kbd className="absolute right-6 top-4">ctrl+k</kbd>
      </div>
      <Button disabled={!newTask} className="p-4 sm:px-8">
        <Add />
        <span className="hidden sm:inline-block">add</span>
      </Button>
    </form>
  );
}
