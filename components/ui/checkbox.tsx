import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import CheckIcon from "../icons/checkIcon";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
}

const Checkbox = ({ checked, className, ...props }: CheckboxProps) => {
  return (
    <div
      role="checkbox"
      aria-checked={checked}
      className={twMerge(
        "size-6 bg-transparent border-2 border-outline rounded-md focus-visible:outline-primary transition-[transform,background-color,color,border-color] duration-300 active:scale-95 aria-checked:bg-primary aria-checked:border-primary disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckIcon
        className={`${checked ? "opacity-100 delay-200" : "opacity-0"} transition-opacity`}
      />
    </div>
  );
};

export default Checkbox;
