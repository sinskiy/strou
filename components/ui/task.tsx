import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

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
