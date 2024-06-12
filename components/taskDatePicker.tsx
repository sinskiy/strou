import { format } from "date-fns";
import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { useEffect, useState } from "react";
import type { HandleChangeTask } from "@/app/tasks/page";
import { Task } from "@/lib/tasks";
import { TimePicker } from "./timePicker";

interface TaskDatePicker {
  task: Task;
  onChange: HandleChangeTask;
}

export default function TaskDatePicker({ task, onChange }: TaskDatePicker) {
  const [date, setDate] = useState<Date | undefined>(
    task.dateTime ? new Date(task.dateTime) : undefined,
  );

  useEffect(() => {
    onChange({ ...task, dateTime: date });
  }, [date]);

  function handleDateChange(newDate: Date | undefined = undefined) {
    if (!date) {
      newDate?.setHours(23, 59);
    }

    setDate(newDate);
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          {date ? format(date, "PPP") : <span>pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date ? date : undefined}
          onSelect={handleDateChange}
          initialFocus
        />
        <TimePicker date={date} setDate={setDate} />
      </PopoverContent>
    </Popover>
  );
}
