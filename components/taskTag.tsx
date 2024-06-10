import { PropsWithChildren } from "react";

export default function TaskTag({ children }: PropsWithChildren) {
  return (
    <li className="h-6 w-fit px-4 border rounded-full border-border text-sm">
      {children}
    </li>
  );
}
