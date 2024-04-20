import { type Modes, type Schedule } from "@/app/page";
import Task from "./ui/task";
import { parseSchedule } from "@/lib/scheduleParser";

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
  const parsedSchedule = parseSchedule(schedule);
  console.log(parsedSchedule);
  // const date = new Date();
  // const tasks = schedule.split("\n").map((task) => task.split(" "));
  // tasks.forEach((task) => {
  //   const likelyTime = task[0];
  //   const taskTime = likelyTime.split(":").map((time) => Number(time));
  //   if (taskTime.length === 2) {
  //     const [hours, minutes] = taskTime;
  //     if (hours === date.getHours()) {
  //       if (minutes - 10 > date.getMinutes()) {
  //         console.log(task);
  //       }
  //     } else if (hours < date.getHours()) {
  //       console.log(task);
  //     }
  //   }
  // });

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
        ></textarea>
      ) : (
        <div className="flex flex-col gap-2">{scheduleList}</div>
      )}
    </div>
  );
}
