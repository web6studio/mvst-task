"use client";

import { Banner } from "@/components/Banner";
import { CoffeeList } from "@/components/coffee/CoffeeList";

export default function Home() {
  return (
    <>
      <Banner />
      <main className="max-w-container mx-auto px-6 py-32">
        <CoffeeList />
      </main>
    </>
  );
}
