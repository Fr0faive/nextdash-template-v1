"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "./button";

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: "underline" | "pills" | "pills-dark";
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, variant = "underline", className }: TabsProps) {
  return (
    <div className={cn(
      "flex items-center gap-1 p-1",
      variant === "underline" && "border-b gap-6 px-0",
      variant === "pills" && "bg-accent/30 rounded-2xl",
      variant === "pills-dark" && "bg-zinc-900/50 rounded-2xl backdrop-blur-xl",
      className
    )}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative flex items-center gap-2 px-4 py-2 text-sm font-black transition-all outline-none",
              variant === "underline" && (isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"),
              (variant === "pills" || variant === "pills-dark") && (isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"),
              className
            )}
          >
            {tab.icon && (
              <span className="relative z-10 w-4 h-4 transition-colors">
                {tab.icon}
              </span>
            )}
            <span className="relative z-10 transition-colors">{tab.label}</span>
            
            {isActive && variant === "underline" && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-[-5px] left-0 right-0 h-1 bg-primary rounded-full shadow-lg shadow-primary/20"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            
            {isActive && (variant === "pills" || variant === "pills-dark") && (
              <motion.div
                layoutId="activeTabPill"
                className={cn(
                  "absolute inset-0 rounded-xl shadow-xl",
                  variant === "pills" ? "bg-primary shadow-primary/20" : "bg-white text-zinc-900"
                )}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
