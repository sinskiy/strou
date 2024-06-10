import TaskTag from "./taskTag";

interface TaskTagsProps {
  tags: string[];
}

export default function TaskTags({ tags }: TaskTagsProps) {
  return (
    <ul className="flex flex-wrap gap-1 mt-1 w-full">
      {tags.map((tag) => (
        <TaskTag key={`${tag}-TaskTag`}>{tag}</TaskTag>
      ))}
    </ul>
  );
}
