import { Timestamp as ITimestamp } from "@/lib/time";
import FormattedTimeUnit from "./formattedTimeUnit";

interface TimestampProps {
  timeObject: ITimestamp;
}

const LAST_POSITION = 2;

export default function Timestamp({ timeObject }: TimestampProps) {
  return (
    <p className="font-bold text-6xl mt-2 mb-6">
      {Object.entries(timeObject).map(([label, value], i) => {
        return label === "hours" && value < 1 ? (
          ""
        ) : (
          <FormattedTimeUnit
            key={label}
            timeUnit={value}
            separator={i !== LAST_POSITION}
          />
        );
      })}
    </p>
  );
}
