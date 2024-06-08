import { type HandleChangeTask, type HandleDeleteTask } from "@/app/tasks/page";
import Task from "./ui/task";

export interface Task {
  originalIndex: number;
  title: string;
  checked: boolean;
  tags?: string[];
}

interface TasksProps {
  tasks: Task[];
  currentTask: number | null;
  // TODO: refactor type
  handleCurrentTaskChange: (originalIndex: number) => void;
  onChangeTask: HandleChangeTask;
  onDeleteTask: HandleDeleteTask;
}

export default function Tasks({
  tasks,
  currentTask,
  handleCurrentTaskChange,
  onChangeTask,
  onDeleteTask,
}: TasksProps) {
  const tasksList = tasks.map((task) => (
    <Task
      key={task.originalIndex}
      current={currentTask === task.originalIndex}
      handleCurrentTaskChange={handleCurrentTaskChange}
      task={task}
      onChange={onChangeTask}
      onDelete={onDeleteTask}
    />
  ));
  return <ul>{tasksList}</ul>;
}
