import { render, screen } from "@testing-library/react";
import { CoffeeCard } from "../CoffeeCard";
import { CoffeeType, Coffee } from "@/types/coffee";

describe("CoffeeCard", () => {
  const mockCoffee: Coffee = {
    id: "1",
    name: "Test Coffee",
    description: "A delicious test coffee",
    price: 9.99,
    type: CoffeeType.ARABIC,
    imageUrl: "/test-coffee.jpg",
    createdAt: "2023-01-01",
    updatedAt: "2023-01-01",
  };

  it("renders coffee information correctly", () => {
    render(<CoffeeCard coffee={mockCoffee} />);

    // Check if all the coffee information is displayed
    expect(screen.getByText("Test Coffee")).toBeInTheDocument();
    expect(screen.getByText("A delicious test coffee")).toBeInTheDocument();
    expect(screen.getByText("9.99 €")).toBeInTheDocument();
    expect(screen.getByText(CoffeeType.ARABIC)).toBeInTheDocument();

    // Check if the image is rendered with correct props
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", "Test Coffee");
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("test-coffee.jpg")
    );
  });

  it("applies correct badge styles based on coffee type", () => {
    render(<CoffeeCard coffee={mockCoffee} />);

    const badge = screen.getByText(CoffeeType.ARABIC);
    expect(badge).toHaveClass("bg-badge-arabic");

    // Test with Robusta type
    const robustaCoffee = { ...mockCoffee, type: CoffeeType.ROBUSTA };
    render(<CoffeeCard coffee={robustaCoffee} />);

    const robustaBadge = screen.getByText(CoffeeType.ROBUSTA);
    expect(robustaBadge).toHaveClass("bg-badge-robusta");
  });
});
