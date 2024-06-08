import Tag from "./ui/tag";

interface TaskTagsProps {
  tags: readonly string[];
}

export default function TaskTags({ tags }: TaskTagsProps) {
  return (
    <>
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} name="task-tags" checked={false} />
      ))}
    </>
  );
}
