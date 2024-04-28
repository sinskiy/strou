import { type Modes } from "@/app/page";
import DeleteIcon from "./icons/deleteIcon";
import EditIcon from "./icons/editIcon";
import TaskIcon from "./icons/taskIcon";
import Button from "./ui/button";
import { Task } from "@/lib/scheduleTypes";
import { parseSchedule } from "@/lib/scheduleParser";
import { sortSchedule } from "@/lib/scheduleSorter";
import { useCallback, useEffect, useRef } from "react";

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
  const handleModeClick = useCallback(() => {
    mode === "edit" ? setMode("tasks") : setMode("edit");

    const parsedSchedule = parseSchedule(schedule);
    const sortedSchedule = sortSchedule(parsedSchedule);
    setScheduleObject(sortedSchedule);
  }, [mode, schedule, setMode, setScheduleObject]);

  function handleDeleteSchedule() {
    setScheduleObject([]);
    setSchedule("");
  }

  const dialogRef = useRef<HTMLDialogElement>(null);

  const modeButtonRef = useRef<HTMLButtonElement>(null);
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.altKey && e.key === "t") {
      modeButtonRef.current?.click();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
  return (
    <>
      <div className="flex w-full flex-wrap">
        <Button
          ref={modeButtonRef}
          disabled={!schedule}
          onClick={handleModeClick}
          variant="outlined"
          colors="primary"
        >
          {mode === "tasks" ? <EditIcon /> : <TaskIcon />}
          {`enter ${mode === "tasks" ? "edit" : "tasks"} mode`}
          <kbd>alt+t</kbd>
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
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl">delete this schedule?</h2>
            <p>are you sure you want to delete this schedule?</p>
          </div>
          <form method="dialog">
            <Button autoFocus variant="text">
              cancel
            </Button>
            <Button variant="text" onClick={handleDeleteSchedule}>
              ok
            </Button>
          </form>
        </dialog>
      </div>
    </>
  );
}
