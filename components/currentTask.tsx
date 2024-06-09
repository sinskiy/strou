import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { type Task } from "@/lib/tasks";

export default function CurrentTask() {
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number>(-1);
  const [tasks, setTasks] = useState<Task[]>([]);
  const currentTask = tasks[currentTaskIndex];
  useEffect(() => {
    const tasks = JSON.parse(localStorage.tasks ?? "[]");
    setTasks(tasks);

    const currentTaskOriginalIndex = Number(localStorage.currentTask);
    if (currentTaskOriginalIndex >= 0) {
      const currentTaskIndex = tasks.findIndex(
        (task: Task) => task.originalIndex === currentTaskOriginalIndex,
      );
      setCurrentTaskIndex(currentTaskIndex);
    }
  }, []);
  function handleTaskCheck(checked: boolean) {
    const tasksWithChecked = tasks.map((task) =>
      task.originalIndex === currentTask.originalIndex
        ? { ...task, checked }
        : task,
    );
    setTasks(tasksWithChecked);
    localStorage.tasks = JSON.stringify(tasksWithChecked);
  }
  return (
    <>
      {currentTaskIndex !== -1 && (
        <section className="card flex justify-between items-center gap-4">
          <Label className="flex items-center gap-3">
            {/* TODO: add ability to check  */}
            <Checkbox
              checked={currentTask.checked}
              onCheckedChange={handleTaskCheck}
            />
            <p>
              <span>{currentTask.title} </span>
              <span className="opacity-30">is current task</span>
            </p>
          </Label>
          <Button variant="secondary" size="sm" asChild>
            <Link href="/tasks">change</Link>
          </Button>
        </section>
      )}
    </>
  );
}
