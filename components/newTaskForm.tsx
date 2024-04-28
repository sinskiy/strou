import { useCallback, useEffect, useRef, type SetStateAction } from "react";
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
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.altKey && e.key === "k") {
      inputRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <form onSubmit={handleAddTodo} className="flex flex-wrap gap-4">
      <div className="relative w-[calc(100%-5rem)] sm:w-auto">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          type="text"
          placeholder="what do you want to do?"
          ref={inputRef}
          name="task-title"
          id="task-title"
          className="w-full"
        />
        <kbd className="absolute right-6 top-4">alt+k</kbd>
      </div>
      <Button disabled={!newTask} className="p-4 sm:px-8">
        <Add />
        <span className="hidden sm:inline-block">add</span>
      </Button>
    </form>
  );
}
