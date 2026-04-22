import * as React from "react";
import { cn } from "./button";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "success"
    | "warning"
    | "destructive"
    | "dot";
  count?: number | string;
  maxCount?: number;
  showZero?: boolean;
  children?: React.ReactNode;
}

export function Badge({
  className,
  variant = "primary",
  count,
  maxCount = 99,
  showZero = false,
  children,
  ...props
}: BadgeProps) {
  const variants = {
    primary: "bg-primary text-primary-foreground border-primary/20",
    secondary: "bg-secondary text-secondary-foreground border-border",
    outline: "bg-background text-foreground border-border",
    success: "bg-green-600 text-white border-green-500/20",
    warning: "bg-orange-500 text-white border-orange-500/20",
    destructive:
      "bg-destructive text-destructive-foreground border-destructive/20",
    dot: "w-2.5 h-2.5 p-0 min-w-0 rounded-full bg-primary border-2 border-card shadow-sm",
  };

  const isDot = variant === "dot";
  const displayCount =
    typeof count === "number" && count > maxCount ? `${maxCount}+` : count;
  const shouldShow =
    isDot || (count !== undefined && (showZero || count !== 0));

  const badgeContent = (
    <div
      className={cn(
        "inline-flex items-center justify-center font-bold transition-all",
        !isDot && "px-1.5 py-0.5 rounded-full text-[10px] min-w-5 border",
        children &&
          "absolute top-0 right-0 translate-y-[-20%] translate-x-[20%] ring-4 ring-card shadow-lg",
        variants[variant],
        className,
      )}
      {...props}
    >
      {!isDot && displayCount}
    </div>
  );

  if (children) {
    return (
      <div className="relative inline-flex align-middle">
        {children}
        {shouldShow && badgeContent}
      </div>
    );
  }

  return badgeContent;
}
