import { Circle } from "lucide-react";
import React from "react";

const SearchTag = () => {
  return (
    <button className="px-4 py-1.5 rounded-full border flex items-center justify-center uppercase font-semibold tracking-wide cursor-pointer text-xs text-text-muted">
      <Circle className="size-2 mr-2" />
      tag
    </button>
  );
};

export default SearchTag;
