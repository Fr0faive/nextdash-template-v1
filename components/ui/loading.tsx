import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "./button";

interface LoadingProps {
  variant?: "spinner" | "dots" | "ring";
  size?: "sm" | "md" | "lg" | "xl";
  label?: string;
  className?: string;
}

export function Loading({ 
  variant = "spinner", 
  size = "md", 
  label, 
  className 
}: LoadingProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const dotSizes = {
    sm: "w-1 h-1",
    md: "w-2 h-2",
    lg: "w-3 h-3",
    xl: "w-4 h-4",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      {variant === "spinner" && (
        <Loader2 className={cn("text-primary animate-spin", sizes[size])} />
      )}

      {variant === "dots" && (
        <div className="flex gap-1.5">
          <div className={cn("bg-primary rounded-full animate-bounce [animation-delay:-0.3s]", dotSizes[size])}></div>
          <div className={cn("bg-primary rounded-full animate-bounce [animation-delay:-0.15s]", dotSizes[size])}></div>
          <div className={cn("bg-primary rounded-full animate-bounce", dotSizes[size])}></div>
        </div>
      )}

      {variant === "ring" && (
        <div className={cn(
          "border-4 border-primary/20 border-t-primary rounded-full animate-spin",
          sizes[size]
        )}></div>
      )}

      {label && (
        <p className={cn(
          "font-medium text-muted-foreground tracking-wide",
          size === "sm" ? "text-[10px]" : "text-sm"
        )}>
          {label}
        </p>
      )}
    </div>
  );
}
