import { Task } from "@/lib/tasks";
import { HandleTagCheck } from "./tagsSelector";
import SelectorTag from "./selectorTag";

interface SelectorTagsProps {
  task: Task;
  tags: string[];
  onTagCheck: HandleTagCheck;
}

export default function SelectorTags({
  task,
  tags,
  onTagCheck,
}: SelectorTagsProps) {
  return (
    <>
      {tags.map((tag) => (
        <>
          <SelectorTag
            key={tag}
            checked={Boolean(task.tags?.includes(tag))}
            onTagCheck={onTagCheck}
          >
            {tag}
          </SelectorTag>
        </>
      ))}
    </>
  );
}
