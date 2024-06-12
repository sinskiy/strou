import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { Task, filterTasksTags } from "@/lib/tasks";
import { HandleChangeTasks } from "@/app/tasks/page";
import AddTag from "./addTag";
import DeleteTag from "./deleteTag";

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

  function handleSaveClick() {
    setTags(localTags);
    localStorage.tags = JSON.stringify(localTags);

    const tasksWithoutDeletedTags = filterTasksTags(tasks, localTags);
    setTasks(tasksWithoutDeletedTags);
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
        <AddTag localTags={localTags} setLocalTags={setLocalTags} />
        <DialogHeader className="mt-6">
          <DialogTitle>Delete tags</DialogTitle>
          <DialogDescription>
            Click on tag to delete. Local (unsaved) tags are displayed
          </DialogDescription>
        </DialogHeader>
        <DeleteTag localTags={localTags} setLocalTags={setLocalTags} />
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
