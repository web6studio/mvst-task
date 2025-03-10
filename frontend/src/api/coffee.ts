import { Coffee, CreateCoffeeDto } from "@/types/coffee";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const coffeeApi = {
  list: async (): Promise<Coffee[]> => {
    const response = await fetch(`${API_URL}/coffees`);
    if (!response.ok) throw new Error("Failed to fetch coffee list");
    return response.json();
  },

  create: async (data: CreateCoffeeDto): Promise<Coffee> => {
    const response = await fetch(`${API_URL}/coffees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create coffee");
    }

    return response.json();
  },
};
