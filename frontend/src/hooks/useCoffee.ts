import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { coffeeApi } from "@/api";

export const coffeeKeys = {
  all: ["coffee"] as const,
  list: () => [...coffeeKeys.all, "list"] as const,
};

export const useCoffeeList = () => {
  return useQuery({
    queryKey: coffeeKeys.list(),
    queryFn: coffeeApi.list,
  });
};

export const useCreateCoffee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: coffeeApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: coffeeKeys.list() });
    },
  });
};
