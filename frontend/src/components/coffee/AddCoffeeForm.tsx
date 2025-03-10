"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { FormField } from "../ui/FormField";
import { useCreateCoffee } from "@/hooks/useCoffee";
import { CoffeeType, CreateCoffeeDto } from "@/types/coffee";

const schema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(256, "Name is too long")
    .trim(),

  description: z
    .string()
    .min(1, "Description is required")
    .max(256, "Description is too long")
    .trim(),

  type: z.nativeEnum(CoffeeType, {
    errorMap: () => ({ message: "Please select a coffee type" }),
  }),

  price: z
    .number()
    .min(0, "Price must be positive")
    .max(999999.99, "Price is too high"),

  imageUrl: z
    .string()
    .url("Must be a valid URL")
    .max(256, "URL is too long")
    .trim(),
});

export const AddCoffeeForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<CreateCoffeeDto>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const { mutate: createCoffee, isPending } = useCreateCoffee();

  const onSubmit = (data: CreateCoffeeDto) => {
    createCoffee(data, {
      onSuccess: () => {
        reset();
        onSuccess?.();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-[450px] mx-auto space-y-6">
        <div className="flex gap-4">
          <FormField label="Name" error={errors.name?.message}>
            <Input {...register("name")} placeholder="Coffee name" />
          </FormField>

          <FormField label="Price" error={errors.price?.message}>
            <Input
              {...register("price", { valueAsNumber: true })}
              type="number"
              step="0.01"
              min="0"
              max="999999.99"
              placeholder="Coffee price"
            />
          </FormField>
        </div>

        <FormField label="Type" error={errors.type?.message}>
          <select
            {...register("type")}
            className="w-full p-2 rounded border outline-none focus:border-white transition-colors bg-[#2D2D2D] border-[#838382] text-white placeholder:text-[#838382] text-sm"
          >
            <option value="">Select type</option>
            {Object.values(CoffeeType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Image URL" error={errors.imageUrl?.message}>
          <Input {...register("imageUrl")} placeholder="Coffee image URL" />
        </FormField>

        <FormField label="Description" error={errors.description?.message}>
          <Input
            {...register("description")}
            placeholder="Coffee description"
          />
        </FormField>

        <div className="flex justify-center gap-4 mt-8 pt-4">
          <Button
            variant="outline"
            onClick={() => onSuccess?.()}
            type="button"
            size="lg"
          >
            Discard
          </Button>
          <Button
            type="submit"
            disabled={!isValid}
            isLoading={isPending}
            size="lg"
          >
            Confirm
          </Button>
        </div>
      </div>
    </form>
  );
};
