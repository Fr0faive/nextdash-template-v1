"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Popover } from "./popover";
import { cn } from "./button";

interface MenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  label: string;
  rightElement?: React.ReactNode;
  variant?: "default" | "destructive";
}

export function MenuItem({
  icon,
  label,
  rightElement,
  variant = "default",
  className,
  ...props
}: MenuItemProps) {
  return (
    <button
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold transition-all outline-hidden",
        variant === "default"
          ? "hover:bg-accent text-foreground"
          : "hover:bg-destructive/10 text-destructive",
        "active:scale-98 disabled:opacity-50 disabled:pointer-events-none",
        className,
      )}
      {...props}
    >
      {icon && <span className="w-4 h-4 shrink-0 flex items-center justify-center opacity-70">{icon}</span>}
      <span className="flex-1 text-left">{label}</span>
      {rightElement && (
        <span className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">
          {rightElement}
        </span>
      )}
    </button>
  );
}

export function MenuSeparator() {
  return <div className="h-px bg-border/50 my-1.5 mx-1" />;
}

export function MenuLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
      {children}
    </div>
  );
}

interface MenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "start" | "center" | "end";
  side?: "top" | "bottom" | "left" | "right";
  width?: string;
}

export function Menu({ trigger, children, align = "end", side = "bottom", width = "w-56" }: MenuProps) {
  return (
    <Popover
      trigger={trigger}
      align={align}
      side={side}
      width={width}
      className="p-1.5"
    >
      <div className="flex flex-col">
        {children}
      </div>
    </Popover>
  );
}
