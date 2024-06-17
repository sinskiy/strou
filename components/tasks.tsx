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
  // const listRef = createRef<HTMLUListElement>();
  // useFlip(listRef);

  /* const sortedTasks = tasks.sort((a, b) => {
    if (a.checked && b.checked) return 0;
    else if (a.checked && !b.checked) return 1;
    else return -1;
  }); */
  const filteredTasks = tasks.filter(
    (task) =>
      task.parent === -1 &&
      (selectedTags.length
        ? task.tags?.some((tag) => selectedTags.includes(tag))
        : task),
  );
  const tasksList = filteredTasks.map((task) => (
    <Task
      key={task.id}
      task={task}
      current={currentTask === task.id}
      onChange={onChangeTask}
      onDelete={onDeleteTask}
      onCurrentTaskChange={onCurrentTaskChange}
      childrenTasks={tasks.filter((childTask) => childTask.parent === task.id)}
    />
  ));
  return <ul>{tasksList}</ul>;
}
