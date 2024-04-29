import { modes, type Modes } from "@/app/page";
import DeleteIcon from "./icons/deleteIcon";
import Button from "./ui/button";
import { Task } from "@/lib/scheduleTypes";
import { parseSchedule } from "@/lib/scheduleParser";
import { sortSchedule } from "@/lib/scheduleSorter";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { Tab, Tabs } from "./ui/tabs";
import TaskIcon from "./icons/taskIcon";
import { updateSchedule } from "@/lib/storage";

interface ScheduleToolsProps {
  schedule: string;
  setSchedule: SetStateFunction<string>;
  mode: Modes;
  setMode: SetStateFunction<Modes>;
  setScheduleObject: SetStateFunction<Task[]>;
}

export default function ScheduleTools({
  schedule,
  setSchedule,
  mode,
  setMode,
  setScheduleObject,
}: ScheduleToolsProps) {
  const [lastSavedSchedule, setLastSaved] = useState(schedule);

  const handleModeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setMode(e.target.id);

      const parsedSchedule = parseSchedule(schedule);
      const sortedSchedule = sortSchedule(parsedSchedule);
      setScheduleObject(sortedSchedule);
    },
    [schedule, setMode, setScheduleObject],
  );

  function handleSaveClick() {
    setLastSaved(schedule);
    updateSchedule(schedule);
  }

  function handleDeleteSchedule() {
    setScheduleObject([]);
    setSchedule("");
  }

  const dialogRef = useRef<HTMLDialogElement>(null);

  const tabList = modes.map((tabMode) => (
    <Tab
      key={tabMode}
      name={tabMode}
      group="mode"
      onChange={handleModeChange}
      checked={tabMode === mode}
      disabled={!schedule}
    />
  ));

  return (
    <>
      <Tabs>{tabList}</Tabs>
      <div className="flex w-full flex-wrap">
        <Button
          disabled={
            !schedule || mode !== "edit" || lastSavedSchedule === schedule
          }
          onClick={handleSaveClick}
          variant="outlined"
          colors="primary"
        >
          <TaskIcon />
          {mode !== "edit" || lastSavedSchedule == schedule ? "saved" : "save"}
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
