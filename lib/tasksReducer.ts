import { Task } from "./tasks";

type TasksAction =
  | {
      type: "initialized";
    }
  | {
      type: "added";
      originalIndex: number;
      title: string;
    }
  | {
      type: "changed";
      task: Task;
    }
  | {
      type: "deleted";
      originalIndex: number;
    };

export default function tasksReducer(tasks: Task[], action: TasksAction) {
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
          originalIndex: action.originalIndex,
          title: action.title,
          checked: false,
        },
      ];
      localStorage.tasks = JSON.stringify(addedTasks);
      return addedTasks;
    }
    case "changed": {
      const changedTasks = tasks.map((task) => {
        if (task.originalIndex === action.task.originalIndex) {
          return action.task;
        } else {
          return task;
        }
      });
      localStorage.tasks = JSON.stringify(changedTasks);
      return changedTasks;
    }
    case "deleted": {
      const deletedTasks = tasks.filter(
        (task) => task.originalIndex !== action.originalIndex,
      );
      localStorage.tasks = JSON.stringify(deletedTasks);
      return deletedTasks;
    }
  }
}
