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
  const finalColors =
    variant === "text"
      ? `text-${colors} text relative`
      : variant === "filled"
      ? `interactive-bg-${colors}`
      : `border-2 border-${colors} text-black hover:interactive-bg-${colors}`;
  return (
    <button
      className={twMerge(
        "inline-flex items-center jusify-center gap-2 px-6 py-2 rounded-md font-medium text-base transition-[transform,background-color] active:scale-95 disabled:pointer-events-none",
        finalColors,
        className
      )}
      {...attributes}
    >
      {children}
    </button>
  );
};

export default Button;
