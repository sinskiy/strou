import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { Label } from "./label";

interface TagProps extends InputHTMLAttributes<HTMLInputElement> {
  tag: string;
  name: string;
}

export default function Tag({ className, tag, name, ...props }: TagProps) {
  return (
    <li>
      <Label className="relative">
        <input
          type="checkbox"
          className="absolute inset-0 peer opacity-0"
          id={tag}
          name={name}
          {...props}
        />
        <span
          className={twMerge(
            "font-medium w-fit text-sm py-1 px-2 rounded-sm transition-colors peer-checked:bg-primary peer-checked:text-primary-foreground hover:peer-checked:bg-primary/90 hover:bg-white/10",
            className,
          )}
        >
          {tag}
        </span>
      </Label>
    </li>
  );
}
