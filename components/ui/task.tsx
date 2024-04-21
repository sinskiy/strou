import { humanTime } from "@/lib/datetime";
import type { Task } from "@/lib/scheduleTypes";
import { ChangeEvent } from "react";

interface TaskProps {
  task: Task;
  setSchedule: SetStateFunction<string>;
}

const Task = ({ task, setSchedule }: TaskProps) => {
  function handleCheck(e: ChangeEvent<HTMLInputElement>) {
    const { checked } = e.target;
    setSchedule((schedule: string) => {
      const tasks = schedule.split("\n");

      if (checked) {
        tasks[task.originalIndex] += " x";
      } else {
        tasks[task.originalIndex] = tasks[task.originalIndex].slice(
          0,
          tasks[task.originalIndex].length - 2
        );
      }
      return tasks.join("\n");
    });
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
