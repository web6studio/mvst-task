"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/Button";
import { Modal } from "./ui/Modal";
import { AddCoffeeForm } from "./coffee/AddCoffeeForm";

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-container mx-auto px-6">
        <div className="h-header flex items-center justify-between">
          <Image
            src="/MVST-Coffee-logo.svg"
            alt="MVST Coffee"
            width={168}
            height={26}
          />
          <Button size="lg" onClick={() => setIsModalOpen(true)}>
            Create
          </Button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New"
      >
        <AddCoffeeForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </header>
  );
}
