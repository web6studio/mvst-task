import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddCoffeeForm } from "../AddCoffeeForm";
import { useCreateCoffee } from "@/hooks/useCoffee";
import { CoffeeType } from "@/types/coffee";

// Mock the useCoffee hook
jest.mock("@/hooks/useCoffee", () => ({
  useCreateCoffee: jest.fn(),
}));

describe("AddCoffeeForm", () => {
  const mockCreateCoffee = jest.fn();
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    (useCreateCoffee as jest.Mock).mockReturnValue({
      mutate: mockCreateCoffee,
      isPending: false,
    });
    mockCreateCoffee.mockClear();
    mockOnSuccess.mockClear();
  });

  it("renders form fields correctly", () => {
    render(<AddCoffeeForm onSuccess={mockOnSuccess} />);

    // Check if all form fields are rendered
    expect(screen.getByPlaceholderText("Coffee name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Coffee price")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Coffee description")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Coffee image URL")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    render(<AddCoffeeForm onSuccess={mockOnSuccess} />);

    // Fill form with valid data
    await userEvent.type(
      screen.getByPlaceholderText("Coffee name"),
      "Test Coffee"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Coffee description"),
      "A test coffee"
    );
    await userEvent.type(screen.getByPlaceholderText("Coffee price"), "9.99");
    await userEvent.type(
      screen.getByPlaceholderText("Coffee image URL"),
      "https://example.com/coffee.jpg"
    );

    // Select coffee type
    await userEvent.selectOptions(
      screen.getByRole("combobox"),
      CoffeeType.ARABIC
    );

    // Submit form
    fireEvent.click(screen.getByText("Confirm"));

    // Check if form was submitted with correct data
    await waitFor(() => {
      expect(mockCreateCoffee).toHaveBeenCalledWith(
        {
          name: "Test Coffee",
          description: "A test coffee",
          price: 9.99,
          type: CoffeeType.ARABIC,
          imageUrl: "https://example.com/coffee.jpg",
        },
        expect.any(Object)
      );
    });
  });
});
