import { ChangeEvent } from "react";
import Tag from "./ui/tag";
import TasksAndTagsSettings from "./tasksAndTagsSettings";
import { Task } from "@/lib/tasks";
import { HandleChangeTasks } from "@/app/tasks/page";

interface TagsProps {
  tasks: Task[];
  setTasks: HandleChangeTasks;
  tags: string[];
  setTags: SetState<string[]>;
  selectedTags: string[];
  setSelectedTags: SetState<string[]>;
}

export default function Tags({
  tasks,
  setTasks,
  tags,
  setTags,
  selectedTags,
  setSelectedTags,
}: TagsProps) {
  const tagsList = tags.map((tag, i) => {
    const checkedIfEmpty = i === 0;
    const checked = checkedIfEmpty
      ? !selectedTags.length
      : selectedTags.includes(tag);
    return (
      <Tag
        key={tag}
        tag={tag}
        name="tags"
        checked={checked}
        onChange={handleTagCheck}
      />
    );
  });
  function handleTagCheck(e: ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.id === tags[0]) {
      return setSelectedTags([]);
    }

    if (e.currentTarget.checked) {
      setSelectedTags([...selectedTags, e.currentTarget.id]);
    } else {
      setSelectedTags([
        ...selectedTags.filter((tag) => tag !== e.currentTarget.id),
      ]);
    }
  }
  return (
    <div className="flex items-center justify-between gap-2">
      <ul className="flex gap-2 flex-wrap">{tagsList}</ul>
      <TasksAndTagsSettings
        tasks={tasks}
        setTasks={setTasks}
        tags={tags}
        setTags={setTags}
      />
    </div>
  );
}
