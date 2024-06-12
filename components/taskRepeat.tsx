import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface TaskRepeatProps {}
export default function TaskRepeat({}: TaskRepeatProps) {
  const [repeat, setRepeat] = useState(0);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">repeat</Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <Label className="flex flex-col gap-2">
          repeat every
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min={0}
              name="repeat-every"
              id="repeat-every"
              value={repeat}
              onChange={(e) => setRepeat(Number(e.target.value))}
              className="w-24"
            />
            <span>day</span>
          </div>
        </Label>
      </PopoverContent>
    </Popover>
  );
}
