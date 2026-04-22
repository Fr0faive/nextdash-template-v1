import * as React from "react";
import { cn } from "./button";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  shape?: "circle" | "square" | "rounded";
  status?: "online" | "offline" | "away" | "busy";
}

export function Avatar({
  src,
  alt,
  fallback,
  size = "md",
  shape = "rounded",
  status,
  className,
  ...props
}: AvatarProps) {
  const [hasError, setHasError] = React.useState(false);

  const sizes = {
    xs: "w-6 h-6 text-[10px]",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-xl",
  };

  const shapes = {
    circle: "rounded-full",
    square: "rounded-none",
    rounded: "rounded-2xl",
  };

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-zinc-400",
    away: "bg-orange-500",
    busy: "bg-rose-500",
  };

  return (
    <div className="relative inline-block shrink-0">
      <div
        className={cn(
          "flex items-center justify-center bg-accent overflow-hidden transition-all border border-border",
          sizes[size],
          shapes[shape],
          className
        )}
        {...props}
      >
        {src && !hasError ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={() => setHasError(true)}
          />
        ) : (
          <span className="font-bold text-muted-foreground uppercase">
            {fallback?.substring(0, 2) || "?"}
          </span>
        )}
      </div>
      
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 w-[25%] h-[25%] min-w-[8px] min-h-[8px] rounded-full border-2 border-card ring-1 ring-black/5",
            statusColors[status]
          )}
        />
      )}
    </div>
  );
}
