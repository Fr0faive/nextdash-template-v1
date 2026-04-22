import * as React from "react";
import { cn } from "./button";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  hover?: boolean;
}

export function Card({
  children,
  className,
  padding = "lg",
  hover = false,
  ...props
}: CardProps) {
  const paddings = {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  };

  return (
    <div
      className={cn(
        "bg-card border rounded-[2.5rem] shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)] dark:shadow-none relative overflow-hidden transition-all duration-300",
        paddings[padding],
        hover && "hover:shadow-md hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/20 hover:bg-accent/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  actions,
  className,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between mb-6", className)}>
      <div className="space-y-1">
        <h3 className="text-xl font-bold tracking-tight">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
