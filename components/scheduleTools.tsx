import { type Modes } from "@/app/page";
import DeleteIcon from "./icons/deleteIcon";
import EditIcon from "./icons/editIcon";
import TaskIcon from "./icons/taskIcon";
import Button from "./ui/button";
import { Task } from "@/lib/scheduleTypes";
import { parseSchedule } from "@/lib/scheduleParser";
import { sortSchedule } from "@/lib/scheduleSorter";
import { useRef } from "react";

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

  function handleDeleteSchedule() {
    setScheduleObject([]);
    setSchedule("");
  }

  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <div className="flex w-full flex-wrap gap-2">
        <Button
          disabled={!schedule}
          onClick={handleModeClick}
          variant="outlined"
          colors="primary"
        >
          {mode === "tasks" ? <EditIcon /> : <TaskIcon />}
          {`enter ${mode === "tasks" ? "edit" : "tasks"} mode`}
        </Button>
        <Button
          disabled={!schedule}
          onClick={() => dialogRef.current?.showModal()}
          variant="text"
          colors="error"
          className="aspect-square h-full w-auto p-4"
        >
          <DeleteIcon />
        </Button>
        <dialog ref={dialogRef}>
          <p>are you sure you want to delete this schedule?</p>
          <form method="dialog">
            <Button autoFocus colors="primary-container">
              no, cancel
            </Button>
            <Button variant="text" onClick={handleDeleteSchedule}>
              yes, delete this schedule
            </Button>
          </form>
        </dialog>
      </div>
    </>
  );
}
