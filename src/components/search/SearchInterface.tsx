"use client";
import React, { useState } from "react";
import SearchInput from "@/components/search/SearchInput";
import SearchCard from "./SearchCard";

const SearchInterface = () => {
  const [searchQuery, setSearchQueryState] = useState("");

  const search_card_data = [
    {
      title: "Search the Market",
      description:
        "Instantly find current prices and verified sellers for any product.",
      link: "/search",
      image:
        "https://images.unsplash.com/photo-1585861299373-491140ca920e?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Get Discovered",
      description:
        "Join the ecosystem as a verified seller and connect with customers worldwide.",
      link: "/sellers/onboarding",
      image:
        "https://images.unsplash.com/photo-1527454113887-0c84d9abf9f1?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },

    {
      title: "Share on Costly",
      description:
        "Add to the platform by sharing real-time prices and product insights.",
      link: "/logs/entry",
      image:
        "https://images.unsplash.com/photo-1502790671504-542ad42d5189?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="w-full md:w-[60%] flex flex-col gap-10">
      <SearchInput setSearchQueryState={setSearchQueryState} />
      {searchQuery.length === 0 && (
        <div className="xl:grid grid-cols-3 gap-10 hidden h-54">
          {search_card_data.map((card, index) => (
            <SearchCard key={index} {...card} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInterface;
