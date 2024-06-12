import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TimerMode, getNextID } from "@/lib/timerModes";
import { TimerSettingsModesList } from "./timerSettingsModesList";
import TimerSettingsAddMode from "./timerSettingsAddMode";

interface TimerSettingsProps {
  timerModesTime: TimerMode[];
  setTimerModesTime: SetState<TimerMode[]>;
}

export default function TimerSettings({
  timerModesTime,
  setTimerModesTime,
}: TimerSettingsProps) {
  const [localModesTime, setLocalModesTime] = useState(timerModesTime);

  useEffect(() => {
    setLocalModesTime(timerModesTime);
  }, [timerModesTime]);

  function handleSave() {
    setTimerModesTime(localModesTime);

    localStorage.timerModesTime = JSON.stringify(localModesTime);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="absolute right-0">
          ⚙
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change timer modes time (in minutes)</DialogTitle>
        </DialogHeader>
        <TimerSettingsModesList
          localModesTime={localModesTime}
          setLocalModesTime={setLocalModesTime}
        />
        <TimerSettingsAddMode
          localModesTime={localModesTime}
          setLocalModesTime={setLocalModesTime}
        />
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Save
          </Button>
          <DialogClose asChild>
            {/* TODO: show new time after close */}
            <Button type="submit" variant="destructive">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
