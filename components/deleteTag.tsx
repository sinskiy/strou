import { MouseEvent } from "react";
import TaskTag from "./taskTag";

interface DeleteTagProps {
  localTags: string[];
  setLocalTags: SetState<string[]>;
}

export default function DeleteTag({ localTags, setLocalTags }: DeleteTagProps) {
  const tagsList = localTags
    .slice(1)
    .map((tag) => <TaskTag key={tag}>{tag}</TaskTag>);

  function handleDeleteTag(e: MouseEvent<HTMLUListElement>) {
    const { innerText } = e.target as HTMLElement;

    setLocalTags(localTags.filter((tag) => tag !== innerText));
  }
  return (
    <ul className="flex flex-wrap gap-1" onClick={handleDeleteTag}>
      {tagsList.length ? tagsList : <h1>No tags available</h1>}
    </ul>
  );
}
