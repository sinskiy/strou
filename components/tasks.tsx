import {
  HandleCurrentTaskChange,
  type HandleChangeTask,
  type HandleDeleteTask,
} from "@/app/tasks/page";
import Task from "./task";
import type { Task as ITask } from "@/lib/tasks";

interface TasksProps {
  tasks: ITask[];
  currentTask: number | null;
  selectedTags: string[];
  onChangeTask: HandleChangeTask;
  onDeleteTask: HandleDeleteTask;
  onCurrentTaskChange: HandleCurrentTaskChange;
}

export default function Tasks({
  tasks,
  currentTask,
  selectedTags,
  onCurrentTaskChange,
  onChangeTask,
  onDeleteTask,
}: TasksProps) {
  const sortedTasks = tasks.sort((task) => (task.checked ? 1 : -1));
  const filteredTasks = sortedTasks.filter((task) =>
    selectedTags.length
      ? task.tags?.some((tag) => selectedTags.includes(tag))
      : task,
  );
  const tasksList = filteredTasks.map((task) => (
    <Task
      key={task.id}
      task={task}
      current={currentTask === task.id}
      onChange={onChangeTask}
      onDelete={onDeleteTask}
      onCurrentTaskChange={onCurrentTaskChange}
    />
  ));
  return <ul>{tasksList}</ul>;
}
