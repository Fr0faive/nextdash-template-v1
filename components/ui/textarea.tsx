import * as React from "react";
import { cn } from "./button";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
            {label}
          </label>
        )}
        <div className="relative group">
          <textarea
            ref={ref}
            className={cn(
              "w-full min-h-[100px] bg-accent/40 border-none rounded-2xl py-3 px-4 text-sm focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-muted-foreground/60 resize-y",
              error && "ring-2 ring-destructive/50 focus:ring-destructive/20",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs font-medium text-destructive ml-1">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
