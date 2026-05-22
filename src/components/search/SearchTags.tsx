import React from "react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Circle } from "lucide-react";

// All product categories present in the data
const CATEGORIES = [
  "Food",
  "Beverage",
  "Electronics",
  "Personal Care",
  "Health",
  "Household",
  "Baby",
  "Dairy",
  "Snacks",
];

interface SearchTagsProps {
  /** The currently-selected category ("" means All) */
  value?: string;
  onValueChange?: (cat: string) => void;
}

const SearchTags: React.FC<SearchTagsProps> = ({
  value = "",
  onValueChange,
}) => {
  const tagStyle =
    "hover:bg-brand-primary hover:text-white px-4 py-1.5 bg-brand-primary/5 border-none rounded-full border flex items-center justify-center uppercase font-semibold tracking-wide cursor-pointer text-[10px] md:text-xs text-brand-primary data-[state=on]:bg-brand-primary data-[state=on]:text-white";

  return (
    <ToggleGroup
      type="single"
      className="w-full flex-wrap gap-2"
      value={value}
      onValueChange={(v) => onValueChange?.(v)}
      spacing={4}
    >
      {/* "All" pill clears the category filter */}
      <ToggleGroupItem
        value=""
        aria-label="All categories"
        className={tagStyle}
      >
        <Circle className="size-2 mr-2" />
        All
      </ToggleGroupItem>
      {CATEGORIES.map((cat) => (
        <ToggleGroupItem
          key={cat}
          value={cat}
          aria-label={`Filter ${cat}`}
          className={tagStyle}
        >
          <Circle className="size-2 mr-2" />
          {cat}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default SearchTags;
