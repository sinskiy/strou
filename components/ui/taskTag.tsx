import { PropsWithChildren } from "react";

export default function TaskTag({ children }: PropsWithChildren) {
  return (
    <li className="h-6 w-fit px-4 border border-border rounded-full hover:bg-border transition-colors text-sm">
      {children}
    </li>
  );
}
