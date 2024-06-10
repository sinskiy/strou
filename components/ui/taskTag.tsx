import { LiHTMLAttributes } from "react";

export default function TaskTag({
  children,
  ...props
}: LiHTMLAttributes<HTMLLIElement>) {
  return (
    <li
      className="h-6 w-fit px-4 border border-border rounded-full hover:bg-border transition-colors text-sm"
      {...props}
    >
      {children}
    </li>
  );
}
