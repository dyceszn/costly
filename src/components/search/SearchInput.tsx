"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { ChevronRight, Search, Sparkles } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/search/CustomCommand";
import SearchTag from "./SearchTag";

interface SearchInputProps {
  setSearchQueryState?: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput: React.FC<SearchInputProps> = ({ setSearchQueryState }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Command className="w-full max-w-5xl flex flex-col gap-5">
      <CommandInput
        className="text-center text-lg placeholder:text-text-muted bg-white border-none placeholder:sm:text-lg placeholder:text-sm w-full focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
        placeholder="Start searching..."
        value={searchQuery}
        onValueChange={(text) => {
          setSearchQueryState?.(text);
          setSearchQuery(text);
        }}
      />
      {searchQuery.length > 0 && (
        <>
          <p className="text-[10px] uppercase tracking-[0.15em] text-text-2 px-1">
            Refine your search
          </p>
          <div className="flex gap-3">
            <SearchTag />
            <SearchTag />
            <SearchTag />
          </div>
          <p className="text-[10px] uppercase tracking-[0.15em] text-text-2 font-bold px-1">
            Matches
          </p>
          <CommandList>
            <CommandEmpty className="flex flex-col gap-6 items-center justify-center py-4 px-6 text-center animate-in fade-in zoom-in-95 duration-300">
              <div className=" flex h-12 w-12 items-center justify-center rounded-full bg-neutral-50">
                <Search className="h-5 w-5 text-brand-primary stroke-[1.5px]" />
              </div>

              <div className="space-y-1">
                <p className="text-[13px] font-semibold tracking-tight">
                  Awaiting Discovery
                </p>
                <p className="text-[11px] leading-relaxed text-text-muted max-w-55">
                  No exact matches found. Verify the spelling or add it to the
                  Radar for active sourcing.
                </p>
              </div>
              <button className="flex items-center gap-2 px-5 py-2 rounded-full border text-[10px] font-bold uppercase cursor-pointer tracking-[0.2em] hover:bg-text-primary hover:text-white hover:border-black transition-all duration-500">
                Signal Radar
                <ChevronRight className="w-3 h-3 opacity-50" />
              </button>
            </CommandEmpty>
            <CommandGroup>
              <CommandItem className="relative rounded-none bg-transparent py-6 px-2 border-b border-neutral-100 aria-selected:bg-transparent group cursor-pointer transition-all duration-500">
                <span className="tracking-tight text-text-muted group-aria-selected:text-text-primary transition-colors duration-500">
                  Indomie
                </span>
                <div className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-text-primary transition-all duration-500 ease-out group-aria-selected:w-full" />
              </CommandItem>
              <CommandItem className="relative rounded-none bg-transparent py-6 px-2 border-b border-neutral-100 aria-selected:bg-transparent group cursor-pointer transition-all duration-500">
                <span className="tracking-tight text-text-muted group-aria-selected:text-text-primary transition-colors duration-500">
                  Toothpaste
                </span>
                <div className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-text-primary transition-all duration-500 ease-out group-aria-selected:w-full" />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </>
      )}
    </Command>
  );
};

export default SearchInput;
