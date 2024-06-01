import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Label } from "./label";

interface TaskProps {
  title: string;
}

export default function Task({ title }: TaskProps) {
  return (
    <div className="flex gap-4 items-center py-4 justify-between w-full">
      <Label className="flex gap-2">
        <Checkbox />
        {title}
      </Label>
      <Button variant="secondary" size="sm">
        start working on
      </Button>
    </div>
  );
}
