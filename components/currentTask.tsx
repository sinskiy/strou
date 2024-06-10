import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { type Task } from "@/lib/tasks";
import { Skeleton } from "./ui/skeleton";

export default function CurrentTask() {
  const [mounted, setMounted] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number>(-1);
  const [tasks, setTasks] = useState<Task[]>([]);
  const currentTask = tasks[currentTaskIndex];

  useEffect(() => {
    setMounted(true);

    const tasks = JSON.parse(localStorage.tasks ?? "[]");
    setTasks(tasks);

    const currentTaskOriginalIndex = Number(localStorage.currentTask);
    if (currentTaskOriginalIndex >= 0) {
      const currentTaskIndex = tasks.findIndex(
        (task: Task) => task.id === currentTaskOriginalIndex,
      );
      setCurrentTaskIndex(currentTaskIndex);
    }
  }, []);
  function handleTaskCheck(checked: boolean) {
    const tasksWithChecked = tasks.map((task) =>
      task.id === currentTask.id ? { ...task, checked } : task,
    );
    setTasks(tasksWithChecked);
    localStorage.tasks = JSON.stringify(tasksWithChecked);
  }
  return (
    <>
      <section className="card flex justify-between items-center gap-4">
        {mounted ? (
          <>
            <Label className="flex items-center gap-3">
              <Checkbox
                checked={currentTask ? currentTask.checked : false}
                disabled={!currentTask}
                onCheckedChange={handleTaskCheck}
              />
              {currentTask ? (
                <p>
                  <span>{currentTask.title} </span>
                  <span className="opacity-30">is current task</span>
                </p>
              ) : (
                <p>No current task is selected</p>
              )}
            </Label>
            <Button variant="secondary" size="sm" asChild>
              <Link href="/tasks">change</Link>
            </Button>
          </>
        ) : (
          <Skeleton className="w-full h-9" />
        )}
      </section>
    </>
  );
}
