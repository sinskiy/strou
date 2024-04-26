import { type Modes } from "@/app/page";
import Task from "./ui/task";
import type { Task as ITask } from "@/lib/scheduleTypes";
import { useEffect, useState } from "react";
import Skeleton from "./ui/skeleton";
import Checkbox from "./ui/checkbox";

interface ScheduleProps {
  mode: Modes;
  schedule: string;
  setSchedule: SetStateFunction<string>;
  scheduleObject: ITask[];
}

export default function Schedule({
  mode,
  schedule,
  setSchedule,
  scheduleObject,
}: ScheduleProps) {
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  const scheduleList =
    mode === "tasks"
      ? scheduleObject.map((task) => (
          <Task
            key={task.originalIndex}
            task={task}
            setSchedule={setSchedule}
          />
        ))
      : "";

  if (!mounted) {
    const skeletonList = Array(3)
      .fill(0)
      .map((_, i) => (
        <Skeleton key={i} className="flex h-20 w-full items-center gap-4 px-8">
          <Skeleton className="size-6" />
          <Skeleton className="h-4 w-24" />
        </Skeleton>
      ));
    return <div className="flex flex-col gap-2">{skeletonList}</div>;
  }

  return (
    <div>
      {mode === "edit" ? (
        <textarea
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
          rows={20}
          placeholder="17:00-21:00 domra&#10;&#13;then homework"
          name="schedule"
          id="schedule"
          className="w-full resize-none"
        ></textarea>
      ) : (
        <div className="flex flex-col gap-2">{scheduleList}</div>
      )}
    </div>
  );
}
