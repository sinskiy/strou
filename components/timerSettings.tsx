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
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { MINUTE_IN_MS, TimerMode, getTimerModeID } from "@/lib/time";

interface TimerSettingsProps {
  timerModesTime: TimerMode[];
  //TODO: reduce duplication
  setTimerModesTime: Dispatch<SetStateAction<TimerMode[]>>;
}

export default function TimerSettings({
  timerModesTime,
  setTimerModesTime,
}: TimerSettingsProps) {
  const [localModesTime, setLocalModesTime] = useState(timerModesTime);
  const timerModesList = localModesTime.map((timerMode) => {
    const timerModeID = getTimerModeID(timerMode);
    return (
      <li key={timerModeID}>
        <Label htmlFor={timerModeID}>{timerMode.name}</Label>
        <Input
          className="mt-2"
          id={timerModeID}
          type="number"
          value={timerMode.time / 1000 / 60}
          onChange={handleInputChange}
        />
      </li>
    );
  });

  useEffect(() => {
    setLocalModesTime(timerModesTime);
  }, [timerModesTime]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const newLocalModes: TimerMode[] = localModesTime.map((timerMode) => {
      const changedTimerMode = getTimerModeID(timerMode) === e.target.id;

      if (changedTimerMode) {
        return { ...timerMode, time: Number(e.target.value) * MINUTE_IN_MS };
      } else {
        return timerMode;
      }
    });
    setLocalModesTime(newLocalModes);
  }
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
        <div>
          <ul className="space-y-4 mb-8">{timerModesList}</ul>
          <Button variant="secondary">+ Add</Button>
        </div>
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
