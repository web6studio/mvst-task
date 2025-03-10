export enum CoffeeType {
  ARABIC = "Arabic",
  ROBUSTA = "Robusta",
}

export type Coffee = {
  id: string;
  name: string;
  description: string;
  type: CoffeeType;
  price: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateCoffeeDto = Omit<Coffee, "id" | "createdAt" | "updatedAt">;
