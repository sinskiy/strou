import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
}

const Checkbox = ({ checked, className, ...props }: CheckboxProps) => {
  return (
    <div
      role="checkbox"
      aria-checked={checked}
      className={twMerge(
        "size-6 bg-transparent border-2 border-outline rounded-md flex justify-center items-center focus-visible:outline-primary transition-[transform,background-color,color] active:scale-95 aria-checked:bg-primary aria-checked:border-primary disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {checked && "✔"}
    </div>
  );
};

export default Checkbox;
