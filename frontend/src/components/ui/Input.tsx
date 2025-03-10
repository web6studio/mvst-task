import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full p-2 rounded border outline-none focus:border-white transition-colors bg-[#2D2D2D] border-[#838382] text-white placeholder:text-[#838382] text-sm",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
