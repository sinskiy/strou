"use client";

import StatisticsInterval from "@/components/statisticsInterval";
import { Statistic as StatisticI } from "@/lib/statistics";
import { getFormattedDate } from "@/lib/time";
import { useEffect, useState } from "react";

export default function Statistics() {
  const [statistics, setStatistics] = useState<null | StatisticI[]>(null);
  const todayStatistics: StatisticI[] | undefined = statistics?.filter(
    (statistic) => getFormattedDate(statistic.date).includes("today"),
  );
  const yesterdayStatistics: StatisticI[] | undefined = statistics?.filter(
    (statistic) => getFormattedDate(statistic.date).includes("yesterday"),
  );
  const otherStatistics: StatisticI[] | undefined = statistics?.filter(
    (statistic) =>
      !todayStatistics?.includes(statistic) &&
      !yesterdayStatistics?.includes(statistic),
  );
  useEffect(() => {
    const savedStatistics: StatisticI[] = JSON.parse(
      localStorage.statistics ?? "[]",
    );
    setStatistics(savedStatistics);
  }, []);
  return (
    <section className="card">
      <StatisticsInterval title="today" statistics={todayStatistics} />
      <StatisticsInterval title="yesterday" statistics={yesterdayStatistics} />
      <StatisticsInterval title="other date" statistics={otherStatistics} />
    </section>
  );
}
