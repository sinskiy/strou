import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { TimerMode, getNextID } from "@/lib/timerModes";
import { MINUTE_IN_MS } from "@/lib/time";

interface TimerSettingsAddModeProps {
  setLocalModesTime: SetState<TimerMode[]>;
  localModesTime: TimerMode[];
}

export default function TimerSettingsAddMode({
  localModesTime,
  setLocalModesTime,
}: TimerSettingsAddModeProps) {
  const [newTimerModeTime, setNewTimerModeTime] = useState(0);
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newMode: TimerMode = {
      id: getNextID(localModesTime),
      name: `mode ${getNextID(localModesTime)}`,
      time: newTimerModeTime * MINUTE_IN_MS,
    };
    const newLocalModes: TimerMode[] = [...localModesTime, newMode];

    setLocalModesTime(newLocalModes);
  }
  return (
    <>
      <Label htmlFor="new-timer-mode">Enter new timer mode time</Label>
      <form method="get" onSubmit={handleSubmit} className="flex gap-4">
        <Input
          value={newTimerModeTime}
          onChange={(e) => setNewTimerModeTime(Number(e.target.value))}
          type="number"
          id="new-timer-mode"
          name="new-timer-mode"
        />
        <Button variant="secondary" type="submit">
          Add
        </Button>
      </form>
    </>
  );
}
