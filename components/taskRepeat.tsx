import { ChangeEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Task } from "@/lib/tasks";
import { HandleChangeTask } from "@/app/tasks/page";
import { HOUR_IN_MS } from "@/lib/time";

interface TaskRepeatProps {
  task: Task;
  onChange: HandleChangeTask;
}

export default function TaskRepeat({ task, onChange }: TaskRepeatProps) {
  const [repeat, setRepeat] = useState(task.repeatInterval);
  function handleRepeatChange(e: ChangeEvent<HTMLInputElement>) {
    const newRepeat = Number(e.target.value);
    if (newRepeat < 0) return;

    setRepeat(newRepeat);

    onChange({
      ...task,
      repeatInterval: newRepeat ? newRepeat : undefined,
    });
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">repeat every</Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <Label>
          repeat every
          <div className="flex items-center mt-2 gap-2">
            <Input
              type="number"
              name="repeat-every"
              id="repeat-every"
              value={repeat}
              onChange={handleRepeatChange}
              className="w-24"
            />
            day
          </div>
        </Label>
      </PopoverContent>
    </Popover>
  );
}
