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

  function handleDateChange(date: Date | undefined = undefined) {
    setDate(date);
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
        <div className="m-3">
          <TimePicker date={date} setDate={setDate} />
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground"
            onClick={() => handleDateChange()}
          >
            <TrashIcon />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
