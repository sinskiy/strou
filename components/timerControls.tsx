import { Mode } from "@/app/page";
import { Button } from "./ui/button";

interface TimerControlsProps {
  handleTimerStart: () => void;
  mode: Mode;
  handleTimeModeSkip: () => void;
}

export default function TimerControls({
  handleTimerStart,
  mode,
  handleTimeModeSkip,
}: TimerControlsProps) {
  return (
    <div className="flex gap-4 justify-center">
      <Button size="icon" onClick={handleTimerStart}>
        {mode === "started" ? "⏸" : "▶"}
      </Button>
      <Button variant="secondary" size="icon" onClick={handleTimeModeSkip}>
        ▶▶
      </Button>
    </div>
  );
}
