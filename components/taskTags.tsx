import { MouseEventHandler } from "react";
import TaskTag from "./ui/taskTag";

interface TaskTagsProps {
  tags: readonly string[];
  originalIndex?: number;
  onTagClick?: (originalIndex: number, tag: string) => void;
}

export default function TaskTags({
  tags,
  originalIndex,
  onTagClick,
}: TaskTagsProps) {
  return (
    <>
      {tags.map((tag) => (
        <TaskTag
          key={tag}
          onClick={() =>
            onTagClick &&
            originalIndex !== undefined &&
            onTagClick(originalIndex, tag)
          }
        >
          {tag}
        </TaskTag>
      ))}
    </>
  );
}
