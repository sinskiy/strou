import { TimerMode, getTimerModeID } from "@/lib/timerModes";
import { ChangeEvent, ChangeEventHandler, SetStateAction } from "react";
import { MINUTE_IN_MS } from "@/lib/time";
import TimerSettingsMode from "./timerSettingsMode";

interface TimerSettingsModesList {
  // TODO: reduce duplication
  setLocalModesTime: (value: SetStateAction<TimerMode[]>) => void;
  localModesTime: TimerMode[];
}

// TODO: make global types for events like these
export type HandleNameChange = ChangeEventHandler<HTMLInputElement>;
export type HandleTimeChange = ChangeEventHandler<HTMLInputElement>;
export type HandleDelete = (id: number) => void;

export function TimerSettingsModesList({
  setLocalModesTime,
  localModesTime,
}: TimerSettingsModesList) {
  const handleNameChange: HandleNameChange = (e) => {
    const newLocalModes: TimerMode[] = localModesTime.map((timerMode) => {
      const changedTimerMode =
        `${getTimerModeID(timerMode)}-name` === e.target.id;

      if (changedTimerMode) {
        return {
          ...timerMode,
          name: e.target.value,
        };
      } else {
        return timerMode;
      }
    });
    setLocalModesTime(newLocalModes);
  };
  const handleTimeChange: HandleTimeChange = (e) => {
    const newLocalModes: TimerMode[] = localModesTime.map((timerMode) => {
      const changedTimerMode =
        `${getTimerModeID(timerMode)}-time` === e.target.id;

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
  };
  const handleDelete: HandleDelete = (id) => {
    const filteredModes = localModesTime.filter((mode) => mode.id !== id);

    setLocalModesTime(filteredModes);
  };
  return (
    <ul className="space-y-4 mb-8">
      {localModesTime.map((timerMode) => {
        const timerModeID = getTimerModeID(timerMode);
        return (
          <TimerSettingsMode
            key={timerModeID}
            localModesTime={localModesTime}
            timerMode={timerMode}
            timerModeID={timerModeID}
            handleNameChange={handleNameChange}
            handleTimeChange={handleTimeChange}
            handleDelete={handleDelete}
          />
        );
      })}
    </ul>
  );
}
