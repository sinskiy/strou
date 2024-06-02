import { Timestamp as ITimestamp } from "@/lib/time";
import FormattedTimeUnit from "./formattedTimeUnit";

interface TimestampProps {
  timeObject: ITimestamp;
}

export default function Timestamp({ timeObject }: TimestampProps) {
  return (
    <p className="font-bold text-6xl mt-2 mb-6">
      {Object.entries(timeObject).map(([label, value], i) => (
        <FormattedTimeUnit key={label} timeUnit={value} separator={i !== 2} />
      ))}
    </p>
  );
}
