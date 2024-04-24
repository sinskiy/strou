import { type Modes } from "@/app/page";
import Task from "./ui/task";
import type { Task as ITask } from "@/lib/scheduleTypes";

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
