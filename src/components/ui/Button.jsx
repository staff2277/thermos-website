"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { forwardRef } from "react";

const buttonVariants = {
  primary:
    "bg-brand-green text-white hover:bg-brand-green-dark border border-brand-green",
  secondary: "bg-white text-black hover:bg-gray-100 border border-white",
  outline: "bg-transparent text-white border border-white/20 hover:bg-white/5",
  ghost:
    "bg-transparent text-white hover:bg-white/10 border border-transparent",
};

const sizeVariants = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const Button = forwardRef(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:pointer-events-none uppercase tracking-widest",
          buttonVariants[variant],
          sizeVariants[size],
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
