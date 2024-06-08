import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import Link from "next/link";

interface Props {}
export default function CurrentTask({}: Props) {
  return (
    <section className="card flex items-center gap-4">
      <Label className="flex gap-3">
        <Checkbox />
        <p>
          play the domra <span className="opacity-30">is current task</span>
        </p>
      </Label>
      <Button variant="secondary" size="sm" asChild>
        <Link href="/tasks">change</Link>
      </Button>
    </section>
  );
}
