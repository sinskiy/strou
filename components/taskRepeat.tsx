import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Task } from "@/lib/tasks";
import { HandleChangeTask } from "@/app/tasks/page";
import { getDefaultTime } from "@/lib/time";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import WeekDaysPicker from "./weekDaysPicker";

interface TaskRepeatProps {
  task: Task;
  onChange: HandleChangeTask;
}

export default function TaskRepeat({ task, onChange }: TaskRepeatProps) {
  const [multiplier, setMultiplier] = useState(
    task.repeatInterval && task.repeatInterval >= 7 ? 7 : 1,
  );
  const [repeat, setRepeat] = useState(
    task.repeatInterval && task.repeatInterval / multiplier,
  );
  useEffect(() => {
    !task.repeatInterval && setRepeat(undefined);
  }, [task]);
  function handleRepeatChange(e: ChangeEvent<HTMLInputElement>) {
    const newRepeat = Number(e.target.value);
    if (newRepeat < 0) return;

    setRepeat(newRepeat);

    onChange({
      ...task,
      repeatInterval: newRepeat ? newRepeat * multiplier : undefined,
      dateTime: task.dateTime ? task.dateTime : getDefaultTime(),
    });
  }
  function handleMultiplierChange(multiplier: string) {
    setMultiplier(Number(multiplier));
  }
  const plural = repeat && repeat === 1 ? "" : "s";
  return (
    <>
      <div className="space-y-1">
        <Label htmlFor="repeat-every">repeat every</Label>
        <div className="flex gap-2">
          <Input
            type="number"
            name="repeat-every"
            id="repeat-every"
            value={repeat ?? ""}
            onChange={handleRepeatChange}
            className="w-24"
            min={0}
          />
          <Select onValueChange={handleMultiplierChange}>
            <SelectTrigger>
              <SelectValue
                defaultValue="1"
                placeholder={
                  multiplier === 7 ? `week${plural}` : `day${plural}`
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">day{plural}</SelectItem>
              <SelectItem value="7">week{plural}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {multiplier === 7 && <WeekDaysPicker />}
    </>
  );
}
