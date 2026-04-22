import * as React from "react";
import { X } from "lucide-react";
import { cn } from "./button";

interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  onDelete?: () => void;
  icon?: React.ReactNode;
  variant?: "filled" | "soft" | "outline";
  color?: "primary" | "secondary" | "success" | "warning" | "destructive" | "neutral";
}

export function Chip({ 
  label, 
  onDelete, 
  icon, 
  variant = "soft", 
  color = "secondary", 
  className, 
  ...props 
}: ChipProps) {
  const styles = {
    filled: {
      primary: "bg-primary text-primary-foreground shadow-sm shadow-primary/20",
      secondary: "bg-zinc-800 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900",
      success: "bg-green-600 text-white",
      warning: "bg-orange-500 text-white",
      destructive: "bg-destructive text-destructive-foreground",
      neutral: "bg-accent text-accent-foreground",
    },
    soft: {
      primary: "bg-primary/10 text-primary border border-primary/10",
      secondary: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border border-zinc-500/10",
      success: "bg-green-500/10 text-green-600 border border-green-500/10",
      warning: "bg-orange-500/10 text-orange-600 border border-orange-500/10",
      destructive: "bg-destructive/10 text-destructive border border-destructive/10",
      neutral: "bg-accent text-accent-foreground border border-border/50",
    },
    outline: {
      primary: "border-2 border-primary/30 text-primary bg-transparent hover:border-primary",
      secondary: "border-2 border-zinc-500/30 text-zinc-600 dark:text-zinc-400 bg-transparent hover:border-zinc-500",
      success: "border-2 border-green-500/30 text-green-600 bg-transparent hover:border-green-500",
      warning: "border-2 border-orange-500/30 text-orange-600 bg-transparent hover:border-orange-500",
      destructive: "border-2 border-destructive/30 text-destructive bg-transparent hover:border-destructive",
      neutral: "border-2 border-border text-muted-foreground bg-transparent hover:border-muted-foreground/50",
    },
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all",
        styles[variant][color],
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="truncate">{label}</span>
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-0.5 rounded-full hover:bg-black/10 transition-colors shrink-0"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
