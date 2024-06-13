"use client";

import { Statistic } from "@/lib/statistics";
import { useEffect, useState } from "react";

export default function Statistics() {
  const [statistics, setStatistics] = useState<null | Statistic[]>(null);
  const statisticTitle = (statistic: Statistic) => {
    if (statistic.checked) {
      return `${statistic.title} was ${statistic.checked ? "checked" : "unchecked"}`;
    } else if (statistic.originalTitle) {
      return `${statistic.originalTitle}'s title was changed ${statistic.title}`;
    }
  };
  useEffect(() => {
    const savedStatistics: Statistic[] = JSON.parse(
      localStorage.statistics ?? "[]",
    );
    setStatistics(savedStatistics);
  }, []);
  return (
    <section className="card">
      {statistics
        ? statistics.map((statistic) => (
            <p key={statistic.id}>{statisticTitle(statistic)}</p>
          ))
        : "there is no statistics"}
    </section>
  );
}
