import { Checkbox } from "./ui/checkbox";
import { getNeededDate, getNextDate, type Task as TaskI } from "@/lib/tasks";
import {
  HandleChangeTask,
  HandleCurrentTaskChange,
  HandleDeleteTask,
} from "@/app/tasks/page";
import TaskControls from "./taskControls";
import { initialTags } from "@/lib/tags";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import TimeAndTags from "./timeAndTags";
import { Input } from "./ui/input";

interface TaskProps {
  task: TaskI;
  currentTask: number | null;
  onCurrentTaskChange: HandleCurrentTaskChange;
  onChange: HandleChangeTask;
  onDelete: HandleDeleteTask;
  childrenTasks: TaskI[];
}

export default function Task({
  task,
  currentTask,
  onCurrentTaskChange,
  onChange,
  onDelete,
  childrenTasks,
}: TaskProps) {
  const formattedDate = getNeededDate(task);

  if (
    task.checked &&
    task.dateTime &&
    task.repeatInterval &&
    task.dateTime < Date.now()
  ) {
    onChange({
      ...task,
      checked: false,
      dateTime: getNextDate(task, true),
    });
  }

  const [tags, setTags] = useState<string[]>([]);
  useEffect(() => {
    const savedTags = localStorage.tags;
    const parsedTags = savedTags ? JSON.parse(savedTags) : initialTags;
    setTags(parsedTags);
  }, []);
  return (
    <>
      <article className="flex py-4 justify-between items-center w-full">
        <div className={cn("flex gap-4", { "opacity-50": task.checked })}>
          <Checkbox
            checked={task.checked}
            onCheckedChange={(checked) => {
              onChange({
                ...task,
                checked: checked as boolean,
                dateTime: getNextDate(task),
              });
            }}
            id={String(task.id)}
          />
          <div>
            <Input
              className={cn(
                {
                  "line-through": task.checked,
                },
                "bg-transparent border-none p-0 mb-3 h-fit",
              )}
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
            <TimeAndTags task={task} formattedDate={formattedDate} />
          </div>
        </div>
        <TaskControls
          task={task}
          tags={tags}
          current={currentTask === task.id}
          onChange={onChange}
          onCurrentTaskChange={onCurrentTaskChange}
          onDelete={onDelete}
        />
      </article>
      <ul className="ml-4">
        {childrenTasks.map((childrenTask) => (
          <li key={childrenTask.id}>
            <Task
              task={childrenTask}
              currentTask={currentTask}
              childrenTasks={[]}
              onChange={onChange}
              onCurrentTaskChange={onCurrentTaskChange}
              onDelete={onDelete}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
