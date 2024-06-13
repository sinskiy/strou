import { Task } from "./tasks";

export interface Statistic {
  type: "added" | "deleted" | "checked" | "changedTitle";
  id: number;
  date: number;
  originalTitle?: string;
  originalChecked?: boolean;
  title: string;
  checked?: boolean;
}

export function saveStatistic(
  statistics: Statistic[],
  statistic: Statistic,
): Statistic[] | undefined {
  if (statistics.find((statistic) => statistic.id === statistic.id)) return;

  const newStatistics: Statistic[] = [...statistics, statistic];
  localStorage.statistics = JSON.stringify(newStatistics);
  return newStatistics;
}

export function getLastStatisticID(statistics: Statistic[]) {
  const lastStatistic = statistics.at(-1);
  const statisticID = lastStatistic ? lastStatistic.id + 1 : 0;
  return statisticID;
}

export function handleTaskChangeStatisticCollection(
  tasks: Task[],
  newTask: Task,
  statistics: Statistic[],
): Statistic[] | undefined {
  const oldTask = tasks.find((task) => task.id === newTask.id);
  if (!oldTask) return;

  const ID = getLastStatisticID(statistics);
  if (newTask.checked !== oldTask.checked) {
    statistics.push({
      type: "checked",
      id: ID,
      date: Date.now(),
      title: newTask.title,
      originalChecked: oldTask.checked,
      checked: newTask.checked,
    });
  }
  if (newTask.title !== oldTask.title) {
    statistics.push({
      type: "changedTitle",
      id: ID,
      date: Date.now(),
      title: newTask.title,
      originalTitle: oldTask.title,
    });
  }
  localStorage.statistics = JSON.stringify(statistics);
  return statistics;
}
