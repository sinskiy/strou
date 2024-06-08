import { Checkbox } from "./checkbox";
import { Label } from "./label";
import type { Task } from "@/lib/tasks";
import {
  HandleChangeTask,
  HandleCurrentTaskChange,
  HandleDeleteTask,
  tags,
} from "@/app/tasks/page";
import TaskTags from "../taskTags";
import TaskControls from "../taskControls";
import TasksSelector from "../tasksSelector";

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
            <ul className="flex gap-1">
              {task.tags && <TaskTags tags={task.tags} />}
              <TasksSelector tags={tags} />
            </ul>
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
