"use client";

import { useState } from "react";
import { useCoffeeList } from "@/hooks/useCoffee";
import { CoffeeCard } from "./CoffeeCard";
import { CoffeeFilter } from "./CoffeeFilter";
import { CoffeeType } from "@/types/coffee";

type FilterType = "all" | CoffeeType;

export const CoffeeList = () => {
  const { data: coffees, isLoading, error } = useCoffeeList();
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredCoffees = coffees?.filter(
    (coffee) => filter === "all" || coffee.type === filter
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-coffee gap-y-coffee-y">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-filter-bg rounded-lg h-[420px] animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-white">
          Oops! Something went wrong
        </h2>
        <p className="mt-2 text-coffee-text">
          We couldn&apos;t load the coffee list. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-[1230px]">
      <h2 className="font-display text-section-title text-white text-center mb-filters-top">
        MVST. EXCLUSIVE COFFEE
      </h2>

      <div className="flex justify-center mb-16">
        <CoffeeFilter selected={filter} onChange={setFilter} />
      </div>

      {!filteredCoffees?.length ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-white">
            No coffee available
          </h2>
          <p className="mt-2 text-coffee-text">
            {filter === "all"
              ? "Add your first coffee to get started."
              : `No ${filter} coffee available.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-coffee gap-y-coffee-y">
          {filteredCoffees.map((coffee, index) => (
            <CoffeeCard key={coffee.id} coffee={coffee} priority={index < 3} />
          ))}
        </div>
      )}
    </section>
  );
};
