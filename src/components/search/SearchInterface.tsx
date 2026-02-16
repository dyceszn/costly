"use client";
import React, { useState } from "react";
import SearchInput from "@/components/search/SearchInput";
import { Card } from "@/components/ui/card";

const SearchInterface = () => {
  const [searchQuery, setSearchQueryState] = useState("");

  return (
    <div className="w-full md:w-[60%] flex flex-col gap-10">
      <SearchInput setSearchQueryState={setSearchQueryState} />
      {searchQuery.length === 0 && (
        <div className="xl:grid grid-cols-3 gap-10 hidden h-54">
          <Card />
          <Card />
          <Card />
        </div>
      )}
    </div>
  );
};

export default SearchInterface;
