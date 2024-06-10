import { Checkbox } from "./checkbox";
import { Label } from "./label";
import type { Task } from "@/lib/tasks";
import {
  HandleChangeTask,
  HandleCurrentTaskChange,
  HandleDeleteTask,
} from "@/app/tasks/page";
import TaskControls from "../taskControls";
import TagsSelector from "../tagsSelector";
import TagsSelected from "../tagsSelected";
import { initialTags } from "@/lib/tags";
import { useEffect, useState } from "react";

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
  const [tags, setTags] = useState<string[]>([]);
  useEffect(() => {
    // reduce duplication
    const savedTags = localStorage.tags;
    const parsedTags = savedTags ? JSON.parse(savedTags) : initialTags;
    setTags(parsedTags);
  }, []);
  return (
    <article>
      <div className="flex gap-4 py-4 justify-between w-full">
        <div className="flex gap-2">
          <Checkbox
            checked={task.checked}
            onCheckedChange={(checked) => {
              onChange({
                ...task,
                checked: checked as boolean,
              });
            }}
            id={String(task.originalIndex)}
          />
          <div className="space-y-2">
            <input
              value={task.title}
              aria-hidden={true}
              onChange={(e) => {
                onChange({
                  ...task,
                  title: e.target.value,
                });
              }}
            />
            <div className="flex">
              <TagsSelected task={task} onChange={onChange} />
              <TagsSelector task={task} tags={tags} onChange={onChange} />
            </div>
          </div>
        </div>
        <Label className="sr-only" htmlFor={String(task.originalIndex)}>
          {task.title}
        </Label>
        <TaskControls
          task={task}
          current={current}
          onCurrentTaskChange={onCurrentTaskChange}
          onDelete={onDelete}
        />
      </div>
    </article>
  );
}
