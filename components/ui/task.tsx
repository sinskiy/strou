import { duration, objectToHumanTime } from "@/lib/datetime";
import { check } from "@/lib/scheduleModifier";
import type { Task } from "@/lib/scheduleTypes";
import { updateSchedule } from "@/lib/storage";
import { ChangeEvent } from "react";
import Checkbox from "./checkbox";

interface TaskProps {
  task: Task;
  setSchedule: SetStateFunction<string>;
}

const Task = ({ task, setSchedule }: TaskProps) => {
  function handleCheck(e: ChangeEvent<HTMLInputElement>) {
    const { checked } = e.target;

    setSchedule((schedule: string) => {
      const checkedSchedule = check(schedule, task.originalIndex, checked);

      updateSchedule(checkedSchedule);

      return checkedSchedule;
    });
    task.checked = !task.checked;
  }

  const taskStart = task.start && objectToHumanTime(task.start);
  const taskFinish =
    task.finish &&
    (task.finish !== task.start ? objectToHumanTime(task.finish) : null);

  // based on a task duration
  const taskHeight =
    task.start && task.finish
      ? Math.round(duration(task.start, task.finish) / 15) + 4
      : "auto";

  return (
    <div
      style={{ height: `${taskHeight}rem` }}
      className={`group relative min-h-20 rounded-md bg-surface-container-high px-8 py-6 transition-colors hover:bg-surface-container-highest
        ${task.checked && "opacity-50"}`}
    >
      <div className="flex items-center gap-4">
        <input
          checked={task.checked}
          onChange={handleCheck}
          type="checkbox"
          name={task.name}
          id={task.name}
          className="peer absolute left-0 top-0 z-10 size-full opacity-0"
        />
        <Checkbox
          checked={task.checked}
          className="group-active:scale-95 peer-focus-visible:border-primary"
        />
        <label
          htmlFor={task.name}
          className={`${task.checked && "line-through"} text-lg`}
        >
          {taskStart}
          {taskFinish && "-"}
          {taskFinish} {task.name}
        </label>
      </div>
    </div>
  );
};

export default Task;
