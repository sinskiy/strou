import { type Modes } from "@/app/page";
import DeleteIcon from "./icons/deleteIcon";
import EditIcon from "./icons/editIcon";
import TaskIcon from "./icons/taskIcon";
import Button from "./ui/button";
import { Task } from "@/lib/scheduleTypes";
import { parseSchedule } from "@/lib/scheduleParser";
import { sortSchedule } from "@/lib/scheduleSorter";

interface ScheduleToolsProps {
  schedule: string;
  mode: Modes;
  setSchedule: SetStateFunction<string>;
  setMode: SetStateFunction<Modes>;
  setScheduleObject: SetStateFunction<Task[]>;
}

export default function ScheduleTools({
  schedule,
  mode,
  setSchedule,
  setMode,
  setScheduleObject,
}: ScheduleToolsProps) {
  function handleModeClick(): void {
    mode === "tasks" ? setMode("edit") : setMode("tasks");
    const parsedSchedule = parseSchedule(schedule);
    const sortedSchedule = sortSchedule(parsedSchedule);
    setScheduleObject(sortedSchedule);
  }
  function handleDeleteClick(): void {
    setScheduleObject([]);
    setSchedule("");
  }
  return (
    <div className="w-full flex gap-2">
      <Button
        disabled={!schedule}
        onClick={handleModeClick}
        variant="outlined"
        colors="primary-container"
      >
        {mode === "tasks" ? <EditIcon /> : <TaskIcon />}
        {`enter ${mode === "tasks" ? "edit" : "tasks"} mode`}
      </Button>
      <Button
        disabled={!schedule}
        onClick={handleDeleteClick}
        variant="text"
        colors="error-container"
        className="w-auto h-full p-4 aspect-square"
      >
        <DeleteIcon />
      </Button>
    </div>
  );
}
