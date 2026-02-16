"use client";
import React, { useState } from "react";
import SearchInput from "@/components/search/SearchInput";
import SearchResult from "@/components/search/SearchResult";

const SearchResultInterface = () => {
  const [searchQueryState, setSearchQueryState] = useState("");
  return (
    <div className="w-full md:w-[60%] flex flex-col gap-10">
      <SearchInput setSearchQueryState={setSearchQueryState} />
      {searchQueryState.length === 0 && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <SearchResult />
        </div>
      )}
    </div>
  );
};

export default SearchResultInterface;
