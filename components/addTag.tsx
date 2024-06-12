import { FormEvent, SetStateAction, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface AddTagProps {
  // TODO: reduce duplication
  setLocalTags: (value: SetStateAction<string[]>) => void;
  localTags: string[];
}

export default function AddTag({ setLocalTags, localTags }: AddTagProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [newTag, setNewTag] = useState("");
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newTags = newTag ? [...localTags, newTag] : localTags;
    setLocalTags(newTags);

    setNewTag("");
  }
  return (
    <form method="get" className="flex gap-4" onSubmit={handleSubmit}>
      <Input
        id="new-tag-title"
        name="new-tag-title"
        type="text"
        value={newTag}
        ref={inputRef}
        onChange={(e) => setNewTag(e.currentTarget.value)}
      />
      <Button
        variant="secondary"
        disabled={
          !inputRef?.current?.value ||
          localTags.includes(inputRef.current.value)
        }
      >
        Add tag
      </Button>
    </form>
  );
}
