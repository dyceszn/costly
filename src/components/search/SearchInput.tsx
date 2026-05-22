"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/search/CustomCommand";
import CustomButton from "../shared/CustomButton";
import { useRouter } from "next/navigation";
import SearchTags from "./SearchTags";

interface SearchInputProps {
  setSearchQueryState?: React.Dispatch<React.SetStateAction<string>>;
  /** Category filter lifted from SearchTags */
  category?: string;
  onCategoryChange?: (cat: string) => void;
}

interface ProductResult {
  id: string;
  name: string;
  searchableName: string;
  prices: { amount: number }[];
}

const SearchInput: React.FC<SearchInputProps> = ({
  setSearchQueryState,
  category = "",
  onCategoryChange,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<ProductResult[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch results from the API (debounced via useEffect)
  const fetchResults = useCallback(async (q: string, cat: string) => {
    if (!q.trim()) { setResults([]); return; }
    setLoading(true);
    try {
      const params = new URLSearchParams({ q, limit: "15" });
      if (cat) params.set("category", cat);
      const res = await fetch(`/api/products?${params}`);
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      setResults(data.products ?? []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // 300 ms debounce on query or category change
  useEffect(() => {
    const timer = setTimeout(() => fetchResults(searchQuery, category), 300);
    return () => clearTimeout(timer);
  }, [searchQuery, category, fetchResults]);

  const handleValueChange = (text: string) => {
    setSearchQueryState?.(text);
    setSearchQuery(text);
  };

  return (
    <Command
      // Disable cmdk's built-in client-side filter – we drive results from the API
      shouldFilter={false}
      className="w-full max-w-5xl flex flex-col gap-5"
    >
      <CommandInput
        className="text-center text-lg placeholder:text-text-muted bg-white border-none placeholder:sm:text-lg placeholder:text-sm w-full focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
        placeholder="Start searching..."
        value={searchQuery}
        onValueChange={handleValueChange}
      />

      {searchQuery.length > 0 && (
        <>
          <p className="text-[10px] uppercase tracking-[0.15em] text-text-2 px-1">
            Refine your search
          </p>
          <SearchTags
            value={category}
            onValueChange={onCategoryChange ?? (() => {})}
          />
          <p className="text-[10px] uppercase tracking-[0.15em] text-text-2 font-bold px-1">
            {loading ? "Searching…" : "Matches"}
          </p>
          <CommandList>
            <CommandEmpty className="flex flex-col gap-6 items-center justify-center py-4 px-6 text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-50">
                <Search className="h-5 w-5 text-brand-primary stroke-[1.5px]" />
              </div>
              <div className="space-y-1">
                <p className="text-[13px] font-semibold tracking-tight">
                  Awaiting Discovery
                </p>
                <p className="text-[11px] leading-relaxed text-text-muted max-w-55">
                  No exact matches found. Verify the spelling or add it to our
                  Radar for active sourcing.
                </p>
              </div>
              <CustomButton text="Signal Radar" />
            </CommandEmpty>
            <CommandGroup>
              {results.map((product) => (
                <CommandItem
                  key={product.id}
                  value={product.searchableName}
                  className="cursor-pointer relative rounded-none bg-transparent py-6 px-2 border-b border-neutral-100 aria-selected:bg-transparent group transition-all duration-500"
                  onSelect={() => router.push(`/search/${product.id}`)}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="tracking-tight text-text-muted group-aria-selected:text-text-primary transition-colors duration-500">
                      {product.name}
                    </span>
                    {product.prices[0] && (
                      <span className="text-xs text-text-2 font-medium">
                        ₦{product.prices[0].amount.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-text-primary transition-all duration-500 ease-out group-aria-selected:w-full" />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </>
      )}
    </Command>
  );
};

export default SearchInput;
