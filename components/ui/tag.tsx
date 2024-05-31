import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { Label } from "./label";

interface TagProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Tag({ className, children, ...props }: TagProps) {
  return (
    <li>
      <Label className="relative">
        <input
          type="checkbox"
          className="absolute inset-0 peer opacity-0"
          id="TODO"
          name="TODO"
          {...props}
        />
        <span
          className={twMerge(
            "font-medium w-fit text-sm py-1 px-2 rounded-sm transition-colors peer-checked:bg-primary peer-checked:text-primary-foreground hover:peer-checked:bg-primary/90 hover:bg-white/10",
            className,
          )}
        >
          {children}
        </span>
      </Label>
    </li>
  );
}
