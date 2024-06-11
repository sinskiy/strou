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
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { MINUTE_IN_MS, TimerMode, getNextID, getTimerModeID } from "@/lib/time";

interface TimerSettingsProps {
  timerModesTime: TimerMode[];
  //TODO: reduce duplication
  setTimerModesTime: Dispatch<SetStateAction<TimerMode[]>>;
}

export default function TimerSettings({
  timerModesTime,
  setTimerModesTime,
}: TimerSettingsProps) {
  const [newTimerModeTime, setNewTimerModeTime] = useState<number>(0);
  const [localModesTime, setLocalModesTime] = useState(timerModesTime);
  const timerModesList = localModesTime.map((timerMode) => {
    const timerModeID = getTimerModeID(timerMode);
    return (
      <li key={timerModeID}>
        <Label htmlFor={timerModeID}>{timerMode.name}</Label>
        <div className="flex items-end gap-4">
          <Input
            className="mt-2"
            id={timerModeID}
            type="number"
            value={timerMode.time / 1000 / 60}
            onChange={handleInputChange}
          />
          <Button
            variant="secondary"
            className="h-full"
            onClick={() => handleDelete(timerMode.id)}
            disabled={localModesTime.length === 1}
          >
            Delete
          </Button>
        </div>
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
        return {
          ...timerMode,
          time: Number(e.target.value) * MINUTE_IN_MS,
        };
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
  function handleDelete(id: number) {
    const filteredModes = localModesTime.filter((mode) => mode.id !== id);

    setLocalModesTime(filteredModes);
  }
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
        <ul className="space-y-4 mb-8">{timerModesList}</ul>
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
