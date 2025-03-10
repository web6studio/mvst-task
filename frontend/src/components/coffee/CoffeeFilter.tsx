"use client";

import { CoffeeType } from "@/types/coffee";
import { cn } from "@/utils";

type FilterType = "all" | CoffeeType;

interface CoffeeFilterProps {
  selected: FilterType;
  onChange: (filter: FilterType) => void;
}

export const CoffeeFilter = ({ selected, onChange }: CoffeeFilterProps) => {
  return (
    <div className="bg-filter-bg rounded-full inline-flex w-full max-w-[550px]">
      <button
        onClick={() => onChange("all")}
        className={cn(
          "flex-1 px-10 py-3 rounded-full transition-colors",
          selected === "all"
            ? "bg-white text-background"
            : "text-white hover:bg-white/5"
        )}
      >
        All
      </button>
      {Object.values(CoffeeType).map((type) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={cn(
            "flex-1 px-10 py-3 rounded-full transition-colors",
            selected === type
              ? "bg-white text-background"
              : "text-white hover:bg-white/5"
          )}
        >
          {type}
        </button>
      ))}
    </div>
  );
};
