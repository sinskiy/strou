interface WeekDaysPickerProps {}

export default function WeekDaysPicker({}: WeekDaysPickerProps) {
  return (
    <fieldset>
      <legend className="mb-1 text-sm font-medium">week days</legend>
      <ul className="flex gap-2">
        {weekDays.map((day) => (
          <li key={day} className="relative flex-1">
            <input
              type="checkbox"
              name={day}
              id={day}
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

const weekDays = ["mon", "tue", "wed", "thu", "sat", "sun"] as const;
