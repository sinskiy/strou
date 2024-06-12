import { Checkbox } from "./ui/checkbox";
import type { Task } from "@/lib/tasks";
import {
  HandleChangeTask,
  HandleCurrentTaskChange,
  HandleDeleteTask,
} from "@/app/tasks/page";
import TaskControls from "./taskControls";
import { initialTags } from "@/lib/tags";
import { useEffect, useState } from "react";
import TaskTags from "./taskTags";
import {
  getFormattedDate,
  getFormattedNextDate,
  getNextDate,
  isBeforeNow,
} from "@/lib/time";
import { cn } from "@/lib/utils";

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
  const formattedDate = getFormattedDate(task.dateTime);

  if (
    task.dateTime &&
    task.repeatInterval &&
    task.lastRepeated &&
    getNextDate(task.dateTime, task.repeatInterval, task.lastRepeated) <
      new Date()
  ) {
    onChange({
      ...task,
      checked: false,
      lastRepeated: Date.now(),
    });
  }

  const [tags, setTags] = useState<string[]>([]);
  useEffect(() => {
    const savedTags = localStorage.tags;
    const parsedTags = savedTags ? JSON.parse(savedTags) : initialTags;
    setTags(parsedTags);
  }, []);
  return (
    <article className="flex py-4 justify-between items-center w-full">
      <div className={cn("flex gap-4", { "opacity-50": task.checked })}>
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
            className={cn({
              "line-through": task.checked,
            })}
            name={`${task.title}-input`}
            id={`${task.title}-input`}
            type="text"
            value={task.title}
            onChange={(e) => {
              onChange({
                ...task,
                title: e.target.value,
              });
            }}
          />
          {/* TODO: refactor this component */}
          <div className="flex gap-1 mt-1 w-full">
            {task.dateTime && formattedDate && (
              <time
                dateTime={task.dateTime.toString()}
                className={cn(
                  {
                    "border-destructive":
                      isBeforeNow(task.dateTime.toString()) && !task.checked,
                  },
                  "task-tag",
                )}
              >
                {formattedDate}
              </time>
            )}
            {task.dateTime && task.repeatInterval && task.lastRepeated && (
              <div className="task-tag">
                next:{" "}
                {getFormattedNextDate(
                  task.dateTime,
                  task.repeatInterval,
                  task.checked ? Date.now() : task.lastRepeated,
                )}
              </div>
            )}
            {task.tags && <TaskTags tags={task.tags} />}
          </div>
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
