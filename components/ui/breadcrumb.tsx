import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "./button";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      className={cn(
        "flex items-center gap-2 text-xs font-medium text-muted-foreground",
        className,
      )}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="w-3 h-3 shrink-0 opacity-50" />}
          {item.href && !item.active ? (
            <Link
              href={item.href}
              className="hover:text-primary transition-colors flex items-center gap-1.5"
            >
              {item.icon && <span className="shrink-0">{item.icon}</span>}
              <span>{item.label}</span>
            </Link>
          ) : (
            <div
              className={cn(
                "flex items-center gap-1.5",
                item.active ? "text-foreground font-bold" : "",
              )}
            >
              {item.icon && <span className="shrink-0">{item.icon}</span>}
              <span>{item.label}</span>
            </div>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
