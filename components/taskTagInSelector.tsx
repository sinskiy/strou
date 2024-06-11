import { Button } from "./ui/button";
import { HandleTagCheck } from "./taskTagsSelector";

interface TaskTagInSelectorProps {
  checked: boolean;
  onTagCheck: HandleTagCheck;
  children: string;
}

export default function TaskTagInSelector({
  checked,
  onTagCheck,
  children,
}: TaskTagInSelectorProps) {
  return (
    <Button variant="ghost" asChild>
      <li className="relative flex gap-2">
        <input
          type="checkbox"
          className="absolute opacity-0 size-full peer"
          checked={checked}
          onChange={onTagCheck}
          data-tag={children}
        />
        <span className="absolute left-2 hidden peer-checked:inline">✓</span>
        {children}
      </li>
    </Button>
  );
}
