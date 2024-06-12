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
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { MINUTE_IN_MS } from "@/lib/time";
import { TimerMode, getNextID } from "@/lib/timerModes";
import { TimerSettingsModesList } from "./timerSettingsModesList";
import TimerSettingsAddMode from "./timerSettingsAddMode";

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
