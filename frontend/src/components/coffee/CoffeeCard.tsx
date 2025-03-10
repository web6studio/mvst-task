import Image from "next/image";
import { Coffee, CoffeeType } from "@/types/coffee";
import { cn } from "@/utils";

interface CoffeeCardProps {
  coffee: Coffee;
  priority?: boolean;
}

export const CoffeeCard = ({ coffee, priority }: CoffeeCardProps) => {
  return (
    <div className="bg-[#191919] rounded-md shadow-[0_0_15px_rgba(0,0,0,0.2)] overflow-hidden">
      <div className="relative">
        <div
          className={cn(
            "absolute top-4 left-4 z-10 px-4 py-1 rounded-full text-sm text-white",
            coffee.type === CoffeeType.ARABIC
              ? "bg-badge-arabic"
              : "bg-badge-robusta"
          )}
        >
          {coffee.type}
        </div>
        <div className="relative h-[300px]">
          <Image
            src={coffee.imageUrl}
            alt={coffee.name}
            fill
            priority={priority}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      <div className="p-6 text-center">
        <h3 className="font-semibold text-coffee-title text-coffee-title mb-2">
          {coffee.name}
        </h3>
        <p className="text-coffee-description font-medium mb-4">
          {coffee.description}
        </p>
        <p className="text-white font-bold text-coffee-price">
          {coffee.price} €
        </p>
      </div>
    </div>
  );
};
