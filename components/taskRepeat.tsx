import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Task } from "@/lib/tasks";
import { HandleChangeTask } from "@/app/tasks/page";
import { getDefaultTime } from "@/lib/time";

interface TaskRepeatProps {
  task: Task;
  onChange: HandleChangeTask;
}

export default function TaskRepeat({ task, onChange }: TaskRepeatProps) {
  const [repeat, setRepeat] = useState(task.repeatInterval);
  useEffect(() => {
    !task.dateTime && setRepeat(undefined);
  }, [task]);
  function handleRepeatChange(e: ChangeEvent<HTMLInputElement>) {
    const newRepeat = Number(e.target.value);
    if (newRepeat < 0) return;

    setRepeat(newRepeat);

    onChange({
      ...task,
      repeatInterval: newRepeat ? newRepeat : undefined,
      dateTime: task.dateTime ? task.dateTime : getDefaultTime(),
    });
  }
  return (
    <div className="m-3">
      <Label htmlFor="repeat-every">repeat every</Label>
      <div className="flex items-center mt-2 gap-2">
        <Input
          type="number"
          name="repeat-every"
          id="repeat-every"
          value={repeat ?? ""}
          onChange={handleRepeatChange}
          className="w-24"
          min={0}
        />
        {repeat === 1 ? "day" : "days"}
      </div>
    </div>
  );
}
