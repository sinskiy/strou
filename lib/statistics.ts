import { Task } from "./tasks";

export interface Statistic {
  type: "added" | "deleted" | "checked" | "changedTitle";
  id: number;
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

  if (newTask.checked !== oldTask.checked) {
    const ID = getLastStatisticID(statistics);

    statistics.push({
      type: "checked",
      id: getLastStatisticID(statistics),
      title: newTask.title,
      originalChecked: oldTask.checked,
      checked: newTask.checked,
    });
  }
  if (newTask.title !== oldTask.title) {
    statistics.push({
      type: "changedTitle",
      id: getLastStatisticID(statistics),
      title: newTask.title,
      originalTitle: oldTask.title,
    });
  }
  localStorage.statistics = JSON.stringify(statistics);
  return statistics;
}
