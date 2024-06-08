import TaskTag from "./ui/taskTag";

interface TaskTagsProps {
  tags: readonly string[];
}

export default function TaskTags({ tags }: TaskTagsProps) {
  return (
    <>
      {tags.map((tag) => (
        <TaskTag key={tag}>{tag}</TaskTag>
      ))}
    </>
  );
}
