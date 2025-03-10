"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { Modal } from "./ui/Modal";
import { AddCoffeeForm } from "./coffee/AddCoffeeForm";

export function Banner() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative h-banner bg-[url('/banner.png')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative h-full max-w-container mx-auto px-6">
        <div className="h-full flex flex-col justify-center">
          <h1 className="font-display text-banner uppercase text-white mb-4 md:text-left text-center">
            Roasted coffee
          </h1>
          <p className="text-coffee-text text-subtitle mb-8 md:text-left text-center">
            Choose a coffee from below or create your own.
          </p>
          <div className="flex md:justify-start justify-center">
            <Button size="lg" onClick={() => setIsModalOpen(true)}>
              Create your own coffee
            </Button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New"
      >
        <AddCoffeeForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}
