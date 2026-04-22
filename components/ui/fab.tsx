"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { cn } from "./button";
import { IconButton } from "./icon-button";
import { Tooltip } from "./tooltip";

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
  position?:
    | "bottom-right"
    | "bottom-left"
    | "top-right"
    | "top-left"
    | "bottom-center"
    | "top-center";
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
    "bottom-center": "bottom-8 left-1/2 -translate-x-1/2",
    "top-right": "top-8 right-8",
    "top-left": "top-8 left-8",
    "top-center": "top-8 left-1/2 -translate-x-1/2",
  };

  const isBottom = position.startsWith("bottom");

  // Radial positioning logic
  const getActionStyles = (index: number, total: number) => {
    const radius = 90; // Distance from FAB
    let startAngle = 0;
    let endAngle = 90;

    if (position === "bottom-right") {
      startAngle = 180;
      endAngle = 270;
    } else if (position === "bottom-left") {
      startAngle = 270;
      endAngle = 360;
    } else if (position === "top-right") {
      startAngle = 90;
      endAngle = 180;
    } else if (position === "top-left") {
      startAngle = 0;
      endAngle = 90;
    } else if (position === "bottom-center") {
      startAngle = 210;
      endAngle = 330;
    } else if (position === "top-center") {
      startAngle = 30;
      endAngle = 150;
    }

    const angleRange = endAngle - startAngle;
    const angleStep = total > 1 ? angleRange / (total - 1) : 0;
    const currentAngle = startAngle + index * angleStep;
    const radian = (currentAngle * Math.PI) / 180;

    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;

    return { x, y };
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
        "fixed z-50 flex items-center justify-center",
        positions[position],
        className,
      )}
    >
      <AnimatePresence>
        {isOpen &&
          actions.map((action, index) => {
            const { x, y } = getActionStyles(index, actions.length);
            return (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ opacity: 1, scale: 1, x, y }}
                exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: index * 0.05,
                }}
                className="absolute flex flex-col items-center group"
              >
                <Tooltip
                  content={action.label}
                  position={isBottom ? "top" : "bottom"}
                >
                  <IconButton
                    icon={action.icon}
                    onClick={() => {
                      action.onClick();
                      setIsOpen(false);
                    }}
                    variant="outline"
                    className={cn(
                      "w-12 h-12 rounded-2xl bg-card border shadow-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:scale-110 transition-all shrink-0",
                      action.color,
                    )}
                  />
                </Tooltip>
              </motion.div>
            );
          })}
      </AnimatePresence>

      <IconButton
        onClick={handleMainClick}
        icon={
          <div
            className={cn(
              "transition-transform duration-300",
              isOpen && "rotate-0",
            )}
          >
            {isOpen ? <X className="w-8 h-8" /> : icon}
          </div>
        }
        className={cn(
          "w-16 h-16 rounded-4xl bg-primary text-primary-foreground shadow-2xl shadow-primary/40 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shrink-0 z-10 p-0 border-0",
          isOpen && "rotate-45 bg-destructive shadow-destructive/40 hover:bg-destructive",
        )}
      />
    </div>
  );
}
