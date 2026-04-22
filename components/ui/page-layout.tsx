import * as React from "react";
import { cn } from "./button";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div className={cn("min-h-full flex flex-col gap-8", className)}>
      {children}
    </div>
  );
}

interface PageContentProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContent({ children, className }: PageContentProps) {
  return (
    <div className={cn("animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150", className)}>
      {children}
    </div>
  );
}

interface PageFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function PageFooter({ children, className }: PageFooterProps) {
  return (
    <footer className={cn("mt-auto pt-8 border-t border-border flex items-center justify-between gap-4 text-xs font-medium text-muted-foreground", className)}>
      {children}
    </footer>
  );
}
