import { format } from "date-fns";
import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { useState } from "react";
import type { HandleChangeTask } from "@/app/tasks/page";
import { Task } from "@/lib/tasks";

interface TaskDatePicker {
  task: Task;
  onChange: HandleChangeTask;
}

export default function TaskDatePicker({ task, onChange }: TaskDatePicker) {
  const [date, setDate] = useState<Date | undefined>(task.dateTime);

  function handleSelect(date: Date | undefined) {
    setDate(date);

    onChange({ ...task, dateTime: date });
  }
  function handleDelete() {
    setDate(undefined);

    onChange({ ...task, dateTime: undefined });
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
          onSelect={handleSelect}
          initialFocus
        />
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground ml-3 mb-3"
          onClick={handleDelete}
        >
          <TrashIcon />
        </Button>
      </PopoverContent>
    </Popover>
  );
}
