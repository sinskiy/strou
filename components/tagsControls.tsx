import {
  Dispatch,
  FormEvent,
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Task, filterTasksTags } from "@/lib/tasks";
import { HandleChangeTasks } from "@/app/tasks/page";
import TaskTag from "./taskTag";

interface TagsControlsProps {
  // TODO: reduce duplication
  tasks: Task[];
  setTasks: HandleChangeTasks;
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}

export default function TagsControls({
  tasks,
  setTasks,
  tags,
  setTags,
}: TagsControlsProps) {
  const [localTags, setLocalTags] = useState(tags);
  const tagsList = localTags
    .slice(1)
    .map((tag) => <TaskTag key={tag}>{tag}</TaskTag>);

  const [newTag, setNewTag] = useState("");
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newTags = newTag ? [...localTags, newTag] : localTags;
    setLocalTags(newTags);
  }
  function handleSaveClick() {
    setTags(localTags);
    localStorage.tags = JSON.stringify(localTags);

    const tasksWithoutDeletedTags = filterTasksTags(tasks, localTags);
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
        <form method="get" className="flex gap-4" onSubmit={handleSubmit}>
          <Input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.currentTarget.value)}
          />
          <Button variant="secondary" disabled={newTag.length === 0}>
            Add tag
          </Button>
        </form>
        <DialogHeader className="mt-6">
          <DialogTitle>Delete tags</DialogTitle>
          <DialogDescription>
            Click on tag to delete. Local (unsaved) tags are displayed
          </DialogDescription>
        </DialogHeader>
        <ul className="flex flex-wrap gap-1" onClick={handleDeleteTag}>
          {tagsList.length ? tagsList : <h1>No tags available</h1>}
        </ul>
        <DialogFooter>
          <Button type="submit" onClick={handleSaveClick}>
            Save
          </Button>
          <DialogClose asChild>
            <Button variant="destructive">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
