"use client";

import { cn } from "@/lib/utils";

export function ModernCard({
  className,
  children,
  variant = "default",
  hover = true,
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border overflow-hidden transition-all duration-500",
        variant === "default" && "bg-[#111] border-white/5",
        variant === "glass" && "glass",
        variant === "glass-dark" && "glass-dark",
        hover &&
          "hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-1",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Section({ className, children, id, fullHeight = false }) {
  return (
    <section
      id={id}
      className={cn(
        "w-full px-6 md:px-12 py-24 md:py-32 relative",
        fullHeight && "min-h-[100svh] flex flex-col justify-center",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto w-full">{children}</div>
    </section>
  );
}
