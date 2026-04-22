"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { cn } from "./button";

interface FABAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color?: string;
}

interface FABProps {
  icon?: React.ReactNode;
  actions?: FABAction[];
  onClick?: () => void;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  className?: string;
}

export function FAB({
  icon = <Plus className="w-6 h-6" />,
  actions = [],
  onClick,
  position = "bottom-right",
  className,
}: FABProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const positions = {
    "bottom-right": "bottom-8 right-8",
    "bottom-left": "bottom-8 left-8",
    "top-right": "top-8 right-8",
    "top-left": "top-8 left-8",
  };

  const handleMainClick = () => {
    if (actions.length > 0) {
      setIsOpen(!isOpen);
    } else {
      onClick?.();
    }
  };

  return (
    <div
      className={cn(
        "fixed z-50 flex flex-col items-center gap-4",
        positions[position],
        className,
      )}
    >
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col-reverse items-center gap-3 mb-2">
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                transition={{ delay: index * 0.05 }}
                className="group flex items-center gap-3"
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-card border px-3 py-1.5 rounded-xl text-xs font-bold shadow-xl whitespace-nowrap">
                  {action.label}
                </span>
                <button
                  onClick={() => {
                    action.onClick();
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-12 h-12 rounded-2xl bg-card border shadow-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:scale-110 transition-all",
                    action.color,
                  )}
                >
                  {action.icon}
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <button
        onClick={handleMainClick}
        className={cn(
          "w-16 h-16 rounded-4xl bg-primary text-primary-foreground shadow-2xl shadow-primary/40 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95",
          isOpen && "rotate-45 bg-destructive shadow-destructive/40",
        )}
      >
        <div
          className={cn(
            "transition-transform duration-300",
            isOpen && "rotate-0",
          )}
        >
          {isOpen ? <X className="w-8 h-8" /> : icon}
        </div>
      </button>
    </div>
  );
}
