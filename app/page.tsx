import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <p className="font-bold text-6xl text-center mb-4">
        <time>00:00</time>
      </p>
      <div className="flex gap-4 justify-center">
        <Button size="icon">▶</Button>
        <Button size="icon">▶▶</Button>
      </div>
    </>
  );
}
