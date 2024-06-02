import { formatTimeUnit } from "@/lib/time";

interface FormattedTimeUnitProps {
  timeUnit: number;
  separator: boolean;
}

export default function FormattedTimeUnit({
  timeUnit,
  separator,
}: FormattedTimeUnitProps) {
  return (
    <span>
      {formatTimeUnit(timeUnit)}
      {separator && ":"}
    </span>
  );
}
