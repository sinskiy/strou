import { HandleChangeTask } from "@/app/tasks/page";
import { Task } from "@/lib/tasks";
import { WEEK_DAYS } from "@/lib/time";
import { ChangeEvent } from "react";

interface WeekDaysPickerProps {
  task: Task;
  onChange: HandleChangeTask;
}

export default function WeekDaysPicker({
  task,
  onChange,
}: WeekDaysPickerProps) {
  function handleWeekDaysChange(e: ChangeEvent<HTMLInputElement>) {
    const { value, checked } = e.currentTarget;
    const weekDay = Number(value);
    if (checked) {
      onChange({
        ...task,
        weekDays: task.weekDays ? [...task.weekDays, weekDay] : [weekDay],
      });
    } else {
      onChange({
        ...task,
        weekDays: task.weekDays?.filter((day) => day !== weekDay),
      });
    }
  }
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium">week days</legend>
      <ul className="flex gap-2">
        {WEEK_DAYS.map((day, i) => (
          <li key={day} className="relative flex-1">
            <input
              type="checkbox"
              name={day}
              id={day}
              value={i + 1}
              onChange={handleWeekDaysChange}
              checked={task.weekDays ? task.weekDays.includes(i + 1) : false}
              className="absolute inset-0 opacity-0 peer"
            />
            <label
              htmlFor={day}
              className="size-full uppercase aspect-square text-sm flex justify-center items-center bg-secondary peer-checked:bg-primary peer-checked:text-primary-foreground rounded-full transition-colors"
            >
              {day.slice(0, 1)}
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}
