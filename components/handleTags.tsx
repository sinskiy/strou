import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
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
import TaskTag from "./ui/taskTag";
import { Task, filterTasksTags } from "@/lib/tasks";
import { HandleChangeTasks } from "@/app/tasks/page";

interface AddTagProps {
  // TODO: reduce duplication
  tasks: Task[];
  setTasks: HandleChangeTasks;
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}

export default function HandleTags({
  tasks,
  setTasks,
  tags,
  setTags,
}: AddTagProps) {
  const [localTags, setLocalTags] = useState(tags);
  // TODO: fix
  const tagsList = localTags
    .slice(1)
    .map((tag) => <TaskTag key={tag}>{tag}</TaskTag>);

  const [newTag, setNewTag] = useState("");
  function handleSaveClick() {
    const newTags = newTag ? [...localTags, newTag] : localTags;
    setTags(newTags);
    localStorage.tags = JSON.stringify(newTags);

    const tasksWithoutDeletedTags = filterTasksTags(tasks, newTags);
    setTasks(tasksWithoutDeletedTags);

    setNewTag("");
  }
  function handleDeleteTag(e: MouseEvent<HTMLUListElement>) {
    const { innerText } = e.target as HTMLElement;
    if (!localTags.includes(innerText)) return;

    setLocalTags(localTags.filter((tag) => tag !== innerText));
  }
  useEffect(() => setLocalTags(tags), [tags]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" aria-label="add tag">
          ⚙
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
        <DialogHeader>
          <DialogTitle>Delete tags</DialogTitle>
        </DialogHeader>
        <ul className="flex flex-wrap gap-1" onClick={handleDeleteTag}>
          {tagsList}
        </ul>
        <DialogFooter>
          <Button type="submit" onClick={handleSaveClick}>
            Save
          </Button>
          <DialogClose asChild>
            <Button variant="destructive">Cancel/Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
