import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import type { Task } from "@/lib/tasks";
import {
  HandleChangeTask,
  HandleCurrentTaskChange,
  HandleDeleteTask,
} from "@/app/tasks/page";
import TaskControls from "./taskControls";
import { initialTags } from "@/lib/tags";
import { useEffect, useState } from "react";
import TaskTag from "./taskTag";
import TaskTags from "./taskTags";

interface TaskProps {
  task: Task;
  current: boolean;
  onCurrentTaskChange: HandleCurrentTaskChange;
  onChange: HandleChangeTask;
  onDelete: HandleDeleteTask;
}

export default function Task({
  task,
  current,
  onCurrentTaskChange,
  onChange,
  onDelete,
}: TaskProps) {
  const todayDate = new Date().toDateString();

  const date: Date | null = task.dateTime ? new Date(task.dateTime) : null;
  const time = // get hours and minutes, without seconds
    date && date.toLocaleTimeString().split(":").slice(0, 2).join(":");
  const formattedDate =
    date && (date.toDateString() === todayDate ? "today" : date.toDateString());

  const [tags, setTags] = useState<string[]>([]);
  useEffect(() => {
    // reduce duplication
    const savedTags = localStorage.tags;
    const parsedTags = savedTags ? JSON.parse(savedTags) : initialTags;
    setTags(parsedTags);
  }, []);
  return (
    <article className="flex py-4 justify-between items-center w-full">
      <div className="flex gap-4">
        <Checkbox
          checked={task.checked}
          onCheckedChange={(checked) => {
            onChange({
              ...task,
              checked: checked as boolean,
            });
          }}
          id={String(task.id)}
        />
        <div>
          <input
            value={task.title}
            onChange={(e) => {
              onChange({
                ...task,
                title: e.target.value,
              });
            }}
          />
          {task.tags && (
            <TaskTags tags={[`${formattedDate} ${time}`, ...task.tags]} />
          )}
        </div>
      </div>
      <TaskControls
        task={task}
        tags={tags}
        current={current}
        onChange={onChange}
        onCurrentTaskChange={onCurrentTaskChange}
        onDelete={onDelete}
      />
    </article>
  );
}
