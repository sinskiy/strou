import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Task } from "./tasks";

export default function CurrentTask() {
  const [savedCurrentTask, setSavedCurrentTask] = useState<null | Task>(null);
  useEffect(() => {
    const savedCurrentTaskIndex = Number(localStorage.currentTask);
    const tasks = JSON.parse(localStorage.tasks ?? "[]");
    if (savedCurrentTaskIndex >= 0) {
      const currentTask = tasks.find(
        (task: Task) => task.originalIndex === savedCurrentTaskIndex,
      );
      setSavedCurrentTask(currentTask);
    }
  }, []);
  return (
    <>
      {savedCurrentTask && (
        <section className="card flex items-center gap-4">
          <Label className="flex gap-3">
            {/* TODO: add ability to check  */}
            <Checkbox checked={savedCurrentTask.checked} />
            <p>
              <span>{savedCurrentTask.title} </span>
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
