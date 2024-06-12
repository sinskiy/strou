import { TimerMode } from "@/lib/timerModes";
import { Button } from "./ui/button";
import { HandleDelete } from "./timerSettingsModesList";

interface TimerModeDelete {
  handleDelete: HandleDelete;
  timerMode: TimerMode;
  localModesTime: TimerMode[];
}

export default function TimerModeDelete({
  handleDelete,
  timerMode,
  localModesTime,
}: TimerModeDelete) {
  return (
    <Button
      variant="secondary"
      className="h-full"
      onClick={() => handleDelete(timerMode.id)}
      disabled={localModesTime.length === 1}
    >
      Delete
    </Button>
  );
}
