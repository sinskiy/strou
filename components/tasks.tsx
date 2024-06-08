import {
  HandleCurrentTaskChange,
  type HandleChangeTask,
  type HandleDeleteTask,
} from "@/app/tasks/page";
import Task from "./ui/task";
import type { Task as ITask } from "@/lib/tasks";

interface TasksProps {
  tasks: ITask[];
  currentTask: number | null;
  onChangeTask: HandleChangeTask;
  onDeleteTask: HandleDeleteTask;
  onCurrentTaskChange: HandleCurrentTaskChange;
}

export default function Tasks({
  tasks,
  currentTask,
  onCurrentTaskChange,
  onChangeTask,
  onDeleteTask,
}: TasksProps) {
  const tasksList = tasks.map((task) => (
    <Task
      key={task.originalIndex}
      task={task}
      current={currentTask === task.originalIndex}
      onChange={onChangeTask}
      onDelete={onDeleteTask}
      onCurrentTaskChange={onCurrentTaskChange}
    />
  ));
  return <ul>{tasksList}</ul>;
}
