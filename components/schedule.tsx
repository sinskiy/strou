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
      ? scheduleObject.map((task, i) => {
          const key = `${task.start && task.start.toString()} ${
            task.finish && task.finish.toString()
          } ${task.name}`;

          return <Task key={key} task={task} setSchedule={setSchedule} />;
        })
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
          className="resize-none w-full"
        ></textarea>
      ) : (
        <div className="flex flex-col gap-2">{scheduleList}</div>
      )}
    </div>
  );
}
