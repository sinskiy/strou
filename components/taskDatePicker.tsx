import { format } from "date-fns";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { useEffect, useState } from "react";
import type { HandleChangeTask } from "@/app/tasks/page";
import { Task } from "@/lib/tasks";
import { TimePicker } from "./timePicker";
import TaskRepeat from "./taskRepeat";

interface TaskDatePicker {
  task: Task;
  onChange: HandleChangeTask;
}

export default function TaskDatePicker({ task, onChange }: TaskDatePicker) {
  const [date, setDate] = useState<Date | undefined>(
    task.dateTime ? new Date(task.dateTime) : undefined,
  );

  useEffect(() => {
    onChange({
      ...task,
      dateTime: date?.getTime(),
    });
  }, [date]);

  function handleDateChange(newDate: Date | undefined = undefined) {
    if (!date) {
      newDate?.setHours(23, 59);
    } else {
      const prevHours = date.getHours();
      const prevMinutes = date.getMinutes();
      newDate?.setHours(prevHours);
      newDate?.setMinutes(prevMinutes);
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
      <PopoverContent className="w-min p-0">
        <Calendar
          mode="single"
          selected={date ? date : undefined}
          onSelect={handleDateChange}
          fromDate={new Date()}
          initialFocus
        />
        <TimePicker date={date} setDate={setDate} />
        <TaskRepeat task={task} onChange={onChange} />
      </PopoverContent>
    </Popover>
  );
}
