import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={twMerge("animate-pulse rounded-md bg-surface", className)}
      {...props}
    />
  );
}
