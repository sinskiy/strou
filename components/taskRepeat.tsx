import { ChangeEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Task } from "@/lib/tasks";
import { HandleChangeTask } from "@/app/tasks/page";

interface TaskRepeatProps {
  task: Task;
  onChange: HandleChangeTask;
}

export default function TaskRepeat({ task, onChange }: TaskRepeatProps) {
  const [repeat, setRepeat] = useState(0);
  function handleRepeatChange(e: ChangeEvent<HTMLInputElement>) {
    const newRepeat = Number(e.target.value);

    setRepeat(newRepeat);

    onChange({ ...task, repeatInterval: newRepeat, lastRepeated: Date.now() });
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
              min={0}
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
