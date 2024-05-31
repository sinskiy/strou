import Tag from "@/components/ui/tag";

const tags = [
  "all",
  "purposeful",
  "necessary",
  "distracting",
  "unnecessary",
] as const;

export default function Tasks() {
  const tagsList = tags.map((tag) => <Tag key={tag}>{tag}</Tag>);
  return <section className="card">{tagsList}</section>;
}
