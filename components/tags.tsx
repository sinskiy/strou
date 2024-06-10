import { ChangeEvent, Dispatch, SetStateAction } from "react";
import Tag from "./ui/tag";
import AddTag from "./addTag";

interface TagsProps {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
  selectedTags: string[];
  setSelectedTags: Dispatch<SetStateAction<string[]>>;
}

export default function Tags({
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
    <div className="flex items-center  gap-2">
      <ul className="flex gap-2">{tagsList}</ul>
      <AddTag tags={tags} setTags={setTags} />
    </div>
  );
}
