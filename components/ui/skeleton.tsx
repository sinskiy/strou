import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function Skeleton({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={twMerge(
        "animate-pulse rounded-md bg-on-background/20",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
