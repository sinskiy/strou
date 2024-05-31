import Task from "@/components/task";
import Tag from "@/components/ui/tag";

const tags = [
  "all",
  "purposeful",
  "necessary",
  "distracting",
  "unnecessary",
] as const;

export default function Tasks() {
  const tagsList = tags.map((tag, i) => (
    <Tag key={tag} defaultChecked={i === 0}>
      {tag}
    </Tag>
  ));
  return (
    <section className="card space-y-4">
      <ul className="flex gap-2">{tagsList}</ul>
      <div>
        <Task title="play the domra" />
        <Task title="play the chess" />
        <Task title="finish this" />
      </div>
    </section>
  );
}
