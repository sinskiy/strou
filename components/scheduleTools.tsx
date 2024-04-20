import { type Modes, type Schedule } from "@/app/page";
import DeleteIcon from "./icons/deleteIcon";
import EditIcon from "./icons/editIcon";
import TaskIcon from "./icons/taskIcon";
import Button from "./ui/button";
import { type SetStateAction } from "react";

interface ScheduleToolsProps {
  schedule: Schedule;
  mode: Modes;
  setMode: (value: SetStateAction<Modes>) => void;
}

export default function ScheduleTools({
  schedule,
  mode,
  setMode,
}: ScheduleToolsProps) {
  return (
    <div className="w-full flex gap-2">
      <Button
        disabled={!schedule}
        onClick={() => (mode === "tasks" ? setMode("edit") : setMode("tasks"))}
        variant="outlined"
        colors="primary-container"
        className="p-4"
      >
        {mode === "tasks" ? <EditIcon /> : <TaskIcon />}
        {`enter ${mode === "tasks" ? "edit" : "tasks"} mode`}
      </Button>
      <Button
        disabled={!schedule}
        variant="text"
        colors="background"
        className="p-4"
      >
        <DeleteIcon />
        delete current schedule
      </Button>
    </div>
  );
}
