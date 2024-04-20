import { type Modes, type Schedule } from "@/app/page";
import { type ReactElement } from "react";
import Task from "./ui/task";

interface ScheduleProps {
  mode: Modes;
  schedule: Schedule;
  setSchedule: SetStateFunction<string>;
}

export default function Schedule({
  mode,
  schedule,
  setSchedule,
}: ScheduleProps) {
  const scheduleList =
    mode === "tasks"
      ? schedule.split("\n").map((task) => {
          if (!task.length) return "";
          return <Task key={task} task={task} />;
        })
      : "";
  return (
    <div className="w-full">
      {mode === "edit" ? (
        <textarea
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
          rows={20}
          placeholder="17:00-21:00 domra&#10;&#13;then homework"
          name="schedule"
          id="schedule"
          className="resize-none w-full"
        >
          {schedule}
        </textarea>
      ) : (
        <div className="flex flex-col gap-2">{scheduleList}</div>
      )}
    </div>
  );
}
