import { TimerMode, getTimerModeID } from "@/lib/timerModes";
import { Input } from "./ui/input";
import TimerModeDelete from "./timerModeDelete";
import {
  HandleNameChange,
  HandleTimeChange,
  HandleDelete,
} from "./timerSettingsModesList";

interface TimerSettingsModeProps {
  localModesTime: TimerMode[];
  timerMode: TimerMode;
  timerModeID: string;
  handleNameChange: HandleNameChange;
  handleTimeChange: HandleTimeChange;
  handleDelete: HandleDelete;
}

export default function TimerSettingsMode({
  localModesTime,
  timerMode,
  timerModeID,
  handleNameChange,
  handleTimeChange,
  handleDelete,
}: TimerSettingsModeProps) {
  return (
    <li>
      <div className="flex items-end gap-4 mt-6">
        <Input
          type="text"
          name={timerModeID}
          id={`${timerModeID}-name`}
          value={timerMode.name}
          onChange={handleNameChange}
        />
        <Input
          id={`${timerModeID}-time`}
          name={timerModeID}
          type="number"
          value={timerMode.time / 1000 / 60}
          onChange={handleTimeChange}
        />
        <TimerModeDelete
          handleDelete={handleDelete}
          timerMode={timerMode}
          localModesTime={localModesTime}
        />
      </div>
    </li>
  );
}
