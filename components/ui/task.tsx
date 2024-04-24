import { objectToHumanTime } from "@/lib/datetime";
import { check } from "@/lib/scheduleModifier";
import type { Task } from "@/lib/scheduleTypes";
import { updateSchedule } from "@/lib/storage";
import { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";
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
    task.finish && task.finish !== task.start && objectToHumanTime(task.finish);

  return (
    <div
      className={twMerge(
        "relative flex items-center gap-4 rounded-md bg-surface-container-high px-8 py-6 group transition-[filter] duration-300 hover:brightness-110",
        task.checked && "opacity-50",
      )}
    >
      <input
        checked={task.checked}
        onChange={handleCheck}
        type="checkbox"
        name={task.name}
        id={task.name}
        className="absolute left-0 top-0 z-10 size-full opacity-0"
      />
      <Checkbox checked={task.checked} className="group-active:scale-95" />
      <label
        htmlFor={task.name}
        className={`${task.checked && "line-through"} text-lg`}
      >
        {taskStart}
        {taskFinish && "-"}
        {taskFinish} {task.name}
      </label>
    </div>
  );
};

export default Task;
