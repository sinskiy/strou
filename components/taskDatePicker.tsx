import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { HandleChangeTask } from "@/app/tasks/page";
import { Task } from "@/lib/tasks";

interface TaskDatePicker {
  task: Task;
  onChange: HandleChangeTask;
}

export default function TaskDatePicker({ task, onChange }: TaskDatePicker) {
  const [date, setDate] = useState<Date>(task.dateTime);

  function handleSelect(date: Date | undefined) {
    if (!date) return;

    setDate(date);

    onChange({ ...task, dateTime: date });
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
          selected={date}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
