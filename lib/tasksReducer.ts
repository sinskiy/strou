import { Task } from "./tasks";

type TasksAction =
  | {
      type: "initialized";
    }
  | {
      type: "added";
      id: number;
      title: string;
      dateTime: Date;
    }
  | {
      type: "changedAll";
      tasks: Task[];
    }
  | {
      type: "changed";
      task: Task;
    }
  | {
      type: "deleted";
      id: number;
    };

export default function tasksReducer(
  tasks: Task[],
  action: TasksAction,
): Task[] {
  switch (action.type) {
    case "initialized": {
      const savedTasks: string | undefined = localStorage.tasks;
      const initialTasks: Task[] = savedTasks ? JSON.parse(savedTasks) : [];
      return initialTasks;
    }
    case "added": {
      const addedTasks = [
        ...tasks,
        {
          id: action.id,
          dateTime: action.dateTime,
          title: action.title,
          checked: false,
        },
      ];
      localStorage.tasks = JSON.stringify(addedTasks);
      return addedTasks;
    }
    case "changedAll": {
      localStorage.tasks = JSON.stringify(action.tasks);
      return action.tasks;
    }
    case "changed": {
      const changedTasks = tasks.map((task) => {
        if (task.id === action.task.id) {
          return action.task;
        } else {
          return task;
        }
      });
      localStorage.tasks = JSON.stringify(changedTasks);
      return changedTasks;
    }
    case "deleted": {
      const deletedTasks = tasks.filter((task) => task.id !== action.id);
      localStorage.tasks = JSON.stringify(deletedTasks);
      return deletedTasks;
    }
  }
}
