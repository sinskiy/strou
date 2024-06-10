import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

interface AddTagProps {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}

export default function AddTag({ tags, setTags }: AddTagProps) {
  const [newTag, setNewTag] = useState("");
  function handleAddTagClick() {
    const newTags = [...tags, newTag];
    setTags(newTags);
    localStorage.tags = JSON.stringify(newTags);

    setNewTag("");
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" aria-label="add tag">
          +
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new tag</DialogTitle>
        </DialogHeader>
        <div>
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.currentTarget.value)}
          />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleAddTagClick}>
            Add
          </Button>
          <DialogClose asChild>
            <Button variant="destructive">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
