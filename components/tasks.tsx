import {
  type HandleChangeTask,
  type HandleDeleteTask,
  type HandleAddTag,
} from "@/app/tasks/page";
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
  onAddTag: HandleAddTag;
}

export default function Tasks({
  tasks,
  currentTask,
  handleCurrentTaskChange,
  onChangeTask,
  onDeleteTask,
  onAddTag,
}: TasksProps) {
  const tasksList = tasks.map((task) => (
    <Task
      key={task.originalIndex}
      current={currentTask === task.originalIndex}
      handleCurrentTaskChange={handleCurrentTaskChange}
      task={task}
      onChange={onChangeTask}
      onDelete={onDeleteTask}
      onAddTag={onAddTag}
    />
  ));
  return <ul>{tasksList}</ul>;
}
