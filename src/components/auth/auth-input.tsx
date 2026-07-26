import * as React from "react";
import { cn } from "@/lib/utils";

export const AuthInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(function AuthInput({ className, ...props }, ref) {
  return (
    <div className="group/field relative">
      <input
        ref={ref}
        data-slot="input"
        className={cn(
          "w-full border-0 border-b border-outline-variant/40 bg-transparent px-0 py-3 text-base text-foreground placeholder:text-outline-variant focus:ring-0 focus:outline-none",
          "aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] w-0 bg-primary transition-all duration-300 ease-out group-focus-within/field:w-full" />
    </div>
  );
});
