import { Statistic as StatisticI } from "@/lib/statistics";
import Statistic from "./statistic";

interface StatisticsIntervalProps {
  title: string;
  statistics: StatisticI[] | undefined;
}

export default function StatisticsInterval({
  title,
  statistics,
}: StatisticsIntervalProps) {
  return (
    <>
      {statistics && statistics.length ? (
        <>
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <ul className="list-disc ml-2">
            {statistics.map((statistic) => (
              <Statistic key={statistic.id} statistic={statistic} />
            ))}
          </ul>
        </>
      ) : (
        ""
      )}
    </>
  );
}
