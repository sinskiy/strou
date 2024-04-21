import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outlined" | "text";
  colors?: string;
}

const Button = ({
  variant = "filled",
  colors = "primary",
  children,
  className,
  ...attributes
}: ButtonProps) => {
  const before =
    'relative before:content-[""] before:absolute before:-z-10 before:rounded-full before:opacity-0 before:scale-0 before:left-0 before:top-0 before:right-0 before:bottom-0 before:duration-300 before:hover:scale-100 before:hover:opacity-80 active:opacity-100';
  const variants = {
    text: `text-on-${colors} before:bg-${colors} ${before}`,
    filled: `interactive-bg-${colors}`,
    outlined: `border-2 border-current text-inherit before:bg-${colors} ${before}`,
  };
  return (
    <button
      className={twMerge(
        "inline-flex items-center jusify-center gap-2 px-8 py-4 rounded-full font-medium text-base transition-[transform,background-color,color] active:scale-95 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        className
      )}
      {...attributes}
    >
      {children}
    </button>
  );
};

export default Button;
