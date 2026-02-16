import React from "react";
import { ChevronRight } from "lucide-react"; // Assuming Lucide or similar

const SearchResult = () => {
  return (
    <div className="w-full mx-auto flex flex-col gap-3">
      {/* Label - Muted and small */}
      <p className="text-[10px] uppercase tracking-[0.15em] text-text-2 font-bold px-1">
        Found Result
      </p>

      <div className="group border border-border rounded-2xl p-6 bg-card hover:border-brand-primary/50 transition-all duration-300">
        <div className="grid md:grid-cols-12 gap-6 items-center">
          {/* 1. Name: The clear visual anchor */}
          <div className="md:col-span-6">
            <h3 className="text-xl font-semibold tracking-tight text-text-1">
              Indomie Noodles 50g
              <span className="block text-sm font-normal text-text-2 mt-1">
                Super pack — Single
              </span>
            </h3>
          </div>

          {/* 2. Price & Date: Balanced metadata */}
          <div className="md:col-span-3 flex md:justify-center">
            <div className="flex flex-col items-start md:items-center">
              <span className="text-2xl font-light tracking-tighter text-text-1">
                ₦500
              </span>
              <span className="text-[10px] text-text-2 uppercase tracking-wide">
                Verified 20.02.26
              </span>
            </div>
          </div>

          {/* 3. Action: Clear but refined */}
          <div className="md:col-span-3 flex justify-end">
            <a
              href="#"
              className="flex items-center gap-1 text-sm font-medium text-brand-primary hover:gap-2 transition-all"
            >
              Find a retailer
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* 4. Secondary Action: Tucked away */}
      <div className="flex justify-end px-2">
        <button className="text-[11px] text-text-2 hover:text-text-1 transition-colors flex gap-1 items-center">
          Price looking wrong?
          <span className="underline underline-offset-2 decoration-brand-primary/30 hover:decoration-brand-primary">
            Improve accuracy
          </span>
        </button>
      </div>
    </div>
  );
};

export default SearchResult;
