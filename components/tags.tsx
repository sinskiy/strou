import { ChangeEvent, useState } from "react";
import Tag from "./ui/tag";

interface TagsProps {
  tags: readonly string[];
}

export default function Tags({ tags }: TagsProps) {
  const [selectedTags, setSelectedTags] = useState<typeof tags>([]);
  const tagsList = tags.map((tag, i) => {
    const checkedIfEmpty = i === 0;
    const checked = checkedIfEmpty
      ? !selectedTags.length
      : selectedTags.includes(tag);
    return (
      <Tag key={tag} tag={tag} checked={checked} onChange={handleTagCheck} />
    );
  });
  function handleTagCheck(e: ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.id === tags[0]) {
      setSelectedTags([]);
      return;
    }

    if (e.currentTarget.checked) {
      setSelectedTags([...selectedTags, e.currentTarget.id]);
    } else {
      setSelectedTags([
        ...selectedTags.filter((tag) => tag !== e.currentTarget.id),
      ]);
    }
  }
  return <ul className="flex gap-2">{tagsList}</ul>;
}
