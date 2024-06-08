import { type HandleChangeTask, type HandleDeleteTask } from "@/app/tasks/page";
import Task from "./ui/task";

export interface Task {
  originalIndex: number;
  title: string;
  checked: boolean;
}

interface TasksProps {
  tasks: Task[];
  currentTask: number | null;
  onChangeTask: HandleChangeTask;
  onDeleteTask: HandleDeleteTask;
}

export default function Tasks({
  tasks,
  currentTask,
  onChangeTask,
  onDeleteTask,
}: TasksProps) {
  const tasksList = tasks.map((task) => (
    <Task
      key={task.originalIndex}
      current={currentTask === task.originalIndex}
      task={task}
      onChange={onChangeTask}
      onDelete={onDeleteTask}
    />
  ));
  return <ul>{tasksList}</ul>;
}
