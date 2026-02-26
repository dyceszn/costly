import React from "react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Circle } from "lucide-react";

const SearchTags = () => {
  const tags = ["technology", "food", "health"];
  const tagStyle =
    "hover:bg-brand-primary hover:text-white px-4 py-1.5 bg-brand-primary/5 border-none rounded-full border flex items-center justify-center uppercase font-semibold tracking-wide cursor-pointer text-[10px] md:text-xs text-brand-primary data-[state=on]:bg-brand-primary data-[state=on]:text-white";
  return (
    <ToggleGroup
      type="single"
      className="w-full flex-wrap gap-2"
      defaultValue="all"
      spacing={4}
    >
      {tags.map((tag, index) => (
        <ToggleGroupItem
          key={index}
          value={tag}
          aria-label={`Toggle ${tag}`}
          className={tagStyle}
        >
          <Circle className="size-2 mr-2" />
          {tag}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default SearchTags;
