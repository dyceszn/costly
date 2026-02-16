import SearchInterface from "@/components/search/SearchInterface";
import React from "react";

export default function page() {
  return (
    <div className="w-full flex flex-col items-center px-4 justify-end md:justify-normal h-full flex-1 md:flex-0 py-4 md:py-0">
      <SearchInterface />
    </div>
  );
}
