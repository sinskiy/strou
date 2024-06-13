import { Statistic as StatisticI } from "@/lib/statistics";
import { getFormattedDate } from "@/lib/time";

interface StatisticProps {
  statistic: StatisticI;
}

export default function Statistic({ statistic }: StatisticProps) {
  const statisticTitle = (statistic: StatisticI) => {
    switch (statistic.type) {
      case "checked":
        return `${statistic.title} was ${statistic.checked ? "checked" : "unchecked"} at ${getFormattedDate(statistic.date)}`;
      case "changedTitle":
        return `${statistic.originalTitle}'s title was changed ${statistic.title} at ${getFormattedDate(statistic.date)}`;
      case "deleted":
        return `${statistic.title} was deleted at ${getFormattedDate(statistic.date)}`;
      case "added":
        return `${statistic.title} was added at ${getFormattedDate(statistic.date)}`;
    }
  };
  return <li>{statisticTitle(statistic).replace(/today|yesterday/gi, "")}</li>;
}
