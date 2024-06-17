import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { HandleAddTask } from "@/app/tasks/page";
import MakeSubTask from "./makeSubTask";
import { Task } from "@/lib/tasks";

interface AddTaskProps {
  tasks: Task[];
  handleAddTask: HandleAddTask;
}

export default function AddTask({ tasks, handleAddTask }: AddTaskProps) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskParent, setNewTaskParent] = useState(-1);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    handleAddTask(newTaskTitle, newTaskParent);
    setNewTaskTitle("");
  }
  return (
    <form method="get" className="flex gap-4" onSubmit={handleSubmit}>
      <Input
        id="new-task-title"
        name="new-task-title"
        placeholder="new task title"
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <MakeSubTask tasks={tasks} setNewTaskParent={setNewTaskParent} />
      <Button variant="secondary" disabled={newTaskTitle.length === 0}>
        add task
      </Button>
    </form>
  );
}
