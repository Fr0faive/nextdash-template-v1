import * as React from "react";
import { cn } from "./button";

type TimelineVariant = "left" | "right" | "alternating";

interface TimelineItemProps {
  title: string;
  description?: string;
  time: string;
  icon?: React.ReactNode;
  isLast?: boolean;
  variant?: TimelineVariant;
  index?: number;
}

export function TimelineItem({ 
  title, 
  description, 
  time, 
  icon, 
  isLast, 
  variant = "left",
  index = 0
}: TimelineItemProps) {
  const isRight = variant === "right" || (variant === "alternating" && index % 2 !== 0);
  
  return (
    <div className={cn(
      "flex gap-4 group relative",
      isRight ? "flex-row-reverse text-right" : "flex-row"
    )}>
      {/* Icon & Line Area */}
      <div className={cn(
        "flex flex-col items-center",
        variant === "alternating" && "absolute left-1/2 -translate-x-1/2 h-full z-10"
      )}>
        <div className="w-10 h-10 rounded-2xl bg-accent flex items-center justify-center shrink-0 border border-border group-hover:border-primary transition-all duration-300 relative z-20">
          {icon || <div className="w-2 h-2 rounded-full bg-primary" />}
        </div>
        {!isLast && (
          <div className="w-px h-full bg-border my-2 relative z-10" />
        )}
      </div>

      {/* Content Area */}
      <div className={cn(
        "flex flex-col pb-10 flex-1",
        variant === "alternating" && (isRight ? "mr-[50%] pr-8" : "ml-[50%] pl-8")
      )}>
        <div className={cn(
          "flex flex-col mb-1",
          isRight ? "items-end" : "items-start"
        )}>
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">{time}</span>
          <h4 className="font-black text-base tracking-tight">{title}</h4>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

interface TimelineProps {
  items: Omit<TimelineItemProps, "isLast" | "index" | "variant">[];
  variant?: TimelineVariant;
  className?: string;
}

export function Timeline({ items, variant = "left", className }: TimelineProps) {
  return (
    <div className={cn(
      "flex flex-col w-full",
      variant === "alternating" && "relative",
      className
    )}>
      {items.map((item, idx) => (
        <TimelineItem
          key={idx}
          {...item}
          variant={variant}
          index={idx}
          isLast={idx === items.length - 1}
        />
      ))}
    </div>
  );
}
