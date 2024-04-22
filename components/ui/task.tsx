import { humanTime } from "@/lib/datetime";
import { check } from "@/lib/scheduleModifier";
import type { Task } from "@/lib/scheduleTypes";
import { ChangeEvent } from "react";

interface TaskProps {
  task: Task;
  setSchedule: SetStateFunction<string>;
}

const Task = ({ task, setSchedule }: TaskProps) => {
  function handleCheck(e: ChangeEvent<HTMLInputElement>) {
    const { checked } = e.target;
    setSchedule((schedule: string) =>
      check(schedule, checked, task.originalIndex)
    );
    task.checked = !task.checked;
  }
  const taskStart = task.start && humanTime(task.start);
  const taskFinish =
    task.finish && task.finish !== task.start && humanTime(task.finish);

  return (
    <div className="bg-surface-container rounded-md px-8 py-4 flex items-center gap-4">
      <input
        checked={task.checked}
        onChange={handleCheck}
        type="checkbox"
        name={task.name}
        id={task.name}
      />
      <label htmlFor={task.name}>
        {taskStart}
        {taskFinish && "-"}
        {taskFinish} {task.name}
      </label>
    </div>
  );
};

export default Task;
