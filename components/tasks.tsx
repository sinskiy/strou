import Task from "./ui/task";

export interface Task {
  originalIndex: number;
  title: string;
  checked: boolean;
}

interface TasksProps {
  tasks: Task[];
  onDeleteTask: (originalIndex: number) => void;
}

export default function Tasks({ tasks, onDeleteTask }: TasksProps) {
  const tasksList = tasks.map((task) => (
    <Task key={task.originalIndex} task={task} onDelete={onDeleteTask} />
  ));
  return <ul>{tasksList}</ul>;
}
