import { Button } from "./button";
import { HandleTagCheck } from "../tagsSelector";

interface TaskTagProps {
  checked: boolean;
  onTagCheck: HandleTagCheck;
  children: string;
}

export default function TaskTag({
  checked,
  onTagCheck,
  children,
}: TaskTagProps) {
  return (
    <Button variant="ghost" asChild>
      <li className="relative flex gap-2">
        <input
          type="checkbox"
          className="absolute opacity-0 size-full peer"
          checked={checked}
          onChange={onTagCheck}
          id={children}
        />
        <span className="absolute left-2 hidden peer-checked:inline">✓</span>
        {children}
      </li>
    </Button>
  );
}
