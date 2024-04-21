import { humanTime } from "@/lib/datetime";
import type { Task } from "@/lib/scheduleTypes";

interface TaskProps {
  task: Task;
}

const Task = ({ task }: TaskProps) => {
  const taskStart = task.start && humanTime(task.start);
  const taskFinish =
    task.finish && task.finish !== task.start && humanTime(task.finish);
  return (
    <div className="bg-surface-container rounded-md px-8 py-4 flex items-center gap-4">
      <input type="checkbox" name={task.name} id={task.name} />
      <label htmlFor={task.name}>
        {taskStart}
        {taskFinish && "-"}
        {taskFinish} {task.name}
      </label>
    </div>
  );
};

export default Task;
