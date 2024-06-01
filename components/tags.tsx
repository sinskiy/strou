import Tag from "./ui/tag";

interface TagsProps {
  tags: readonly string[];
}

export default function Tags({ tags }: TagsProps) {
  const tagsList = tags.map((tag, i) => (
    <Tag key={tag} defaultChecked={i === 0}>
      {tag}
    </Tag>
  ));
  return <ul className="flex gap-2">{tagsList}</ul>;
}
