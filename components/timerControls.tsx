import { TimerState } from "@/app/page";
import { Button } from "./ui/button";

interface TimerControlsProps {
  handleTimerStart: () => void;
  state: TimerState;
  handleTimeModeSkip: () => void;
}

export default function TimerControls({
  handleTimerStart,
  state,
  handleTimeModeSkip,
}: TimerControlsProps) {
  return (
    <div className="flex gap-4 justify-center">
      <Button size="icon" onClick={handleTimerStart}>
        {state === "started" ? "⏸" : "▶"}
      </Button>
      <Button variant="secondary" size="icon" onClick={handleTimeModeSkip}>
        ▶▶
      </Button>
    </div>
  );
}
