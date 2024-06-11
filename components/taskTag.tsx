import { PropsWithChildren } from "react";

export default function TaskTag({ children }: PropsWithChildren) {
  return <li className="task-tag">{children}</li>;
}
