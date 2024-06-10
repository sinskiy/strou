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
import { TimerModesTime } from "@/lib/time";

interface TimerSettingsProps {
  timerModesTime: TimerModesTime;
  //TODO: reduce duplication
  setTimerModesTime: Dispatch<SetStateAction<TimerModesTime>>;
}

export default function TimerSettings({
  timerModesTime,
  setTimerModesTime,
}: TimerSettingsProps) {
  const [localModesTime, setLocalModesTime] = useState(timerModesTime);
  const timerModesList = Object.entries(localModesTime).map(([name, time]) => (
    <li key={name}>
      <Label htmlFor={name}>{name}</Label>
      <Input
        className="mt-2"
        id={name}
        value={time / 1000 / 60}
        onChange={handleInputChange}
      />
    </li>
  ));

  useEffect(() => {
    setLocalModesTime(timerModesTime);
  }, [timerModesTime]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const newLocalModes: TimerModesTime = {};
    for (const name in localModesTime) {
      if (name === e.target.id) {
        newLocalModes[name] = Number(e.target.value) * 1000 * 60;
      } else {
        newLocalModes[name] = localModesTime[name];
      }
    }
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
        <ul className="space-y-8">{timerModesList}</ul>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Save
          </Button>
          <DialogClose asChild>
            {/* TODO: show new time after close */}
            <Button type="submit" variant="destructive">
              Close/Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
