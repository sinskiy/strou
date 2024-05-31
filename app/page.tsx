import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function Timer() {
  return (
    <>
      <div className="card">
        <p className="opacity-50">work 1</p>
        <p className="font-bold text-6xl text-center mt-2 mb-6">
          <time>50:00</time>
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="icon">▶</Button>
          <Button variant="secondary" size="icon">
            ▶▶
          </Button>
        </div>
      </div>
      <div className="card flex items-center gap-4">
        <Label className="flex gap-2">
          <Checkbox />
          play the domra <span className="opacity-30">is current task</span>
        </Label>
        <Button variant="secondary">change</Button>
      </div>
    </>
  );
}
