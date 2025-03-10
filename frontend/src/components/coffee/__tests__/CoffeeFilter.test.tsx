import { render, screen, fireEvent } from "@testing-library/react";
import { CoffeeFilter } from "../CoffeeFilter";
import { CoffeeType } from "@/types/coffee";

describe("CoffeeFilter", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("renders all filter options", () => {
    render(<CoffeeFilter selected="all" onChange={mockOnChange} />);

    // Check if "All" button is rendered
    expect(screen.getByText("All")).toBeInTheDocument();

    // Check if all coffee type options are rendered
    Object.values(CoffeeType).forEach((type) => {
      expect(screen.getByText(type)).toBeInTheDocument();
    });
  });

  it("applies correct styles to selected filter", () => {
    render(<CoffeeFilter selected="all" onChange={mockOnChange} />);

    // Check if "All" button has selected styles
    const allButton = screen.getByText("All");
    expect(allButton).toHaveClass("bg-white", "text-background");

    // Check if other buttons don't have selected styles
    Object.values(CoffeeType).forEach((type) => {
      const button = screen.getByText(type);
      expect(button).not.toHaveClass("bg-white", "text-background");
    });
  });

  it("calls onChange with correct filter value when clicked", () => {
    render(<CoffeeFilter selected="all" onChange={mockOnChange} />);

    // Click on Arabic filter
    fireEvent.click(screen.getByText(CoffeeType.ARABIC));
    expect(mockOnChange).toHaveBeenCalledWith(CoffeeType.ARABIC);

    // Click on Robusta filter
    fireEvent.click(screen.getByText(CoffeeType.ROBUSTA));
    expect(mockOnChange).toHaveBeenCalledWith(CoffeeType.ROBUSTA);

    // Click on All filter
    fireEvent.click(screen.getByText("All"));
    expect(mockOnChange).toHaveBeenCalledWith("all");
  });
});
