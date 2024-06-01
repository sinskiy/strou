import Tags from "@/components/tags";
import Task from "@/components/ui/task";

const tags = [
  "all",
  "purposeful",
  "necessary",
  "distracting",
  "unnecessary",
] as const;

export default function Tasks() {
  return (
    <section className="card space-y-4">
      <Tags tags={tags} />
      <div>
        <Task title="play the domra" />
        <Task title="play the chess" />
        <Task title="finish this" />
      </div>
    </section>
  );
}
