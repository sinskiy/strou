import { type HandleChangeTask, type HandleDeleteTask } from "@/app/tasks/page";
import Task from "./ui/task";

export interface Task {
  originalIndex: number;
  title: string;
  checked: boolean;
}

interface TasksProps {
  tasks: Task[];
  onChangeTask: HandleChangeTask;
  onDeleteTask: HandleDeleteTask;
}

export default function Tasks({
  tasks,
  onChangeTask,
  onDeleteTask,
}: TasksProps) {
  const tasksList = tasks.map((task) => (
    <Task
      key={task.originalIndex}
      task={task}
      onChange={onChangeTask}
      onDelete={onDeleteTask}
    />
  ));
  return <ul>{tasksList}</ul>;
}
