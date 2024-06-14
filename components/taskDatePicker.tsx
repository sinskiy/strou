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
  const [date, setDate] = useState<Date | undefined>();
  function getTaskDate(task: Task) {
    return task.dateTime ? new Date(task.dateTime) : undefined;
  }
  function changeTaskDate(date: Date | undefined) {
    const dateTime = date?.getTime();
    onChange({
      ...task,
      dateTime: dateTime,
      repeatInterval: dateTime ? task.repeatInterval : undefined,
    });
  }
  useEffect(() => {
    setDate(getTaskDate(task));
  }, [task]);

  function handleDateChange(newDate: Date | undefined = undefined) {
    if (!date) {
      newDate?.setHours(23, 59);
    } else {
      const prevHours = date.getHours();
      const prevMinutes = date.getMinutes();
      newDate?.setHours(prevHours);
      newDate?.setMinutes(prevMinutes);
    }
    changeTaskDate(newDate);
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
        <TimePicker date={date} setDate={changeTaskDate} />
        <TaskRepeat task={task} onChange={onChange} />
      </PopoverContent>
    </Popover>
  );
}
