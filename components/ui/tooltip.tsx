"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "./button";

interface TooltipProps {
  content: string | React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function Tooltip({
  content,
  children,
  position = "top",
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const variants = {
    initial: {
      opacity: 0,
      scale: 0.95,
      y: position === "top" ? 5 : position === "bottom" ? -5 : 0,
      x: position === "left" ? 5 : position === "right" ? -5 : 0,
    },
    animate: { opacity: 1, scale: 1, y: 0, x: 0 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            className={cn(
              "absolute z-110 px-2.5 py-1.5 bg-zinc-900 text-white text-[11px] font-bold rounded-lg shadow-xl pointer-events-none whitespace-nowrap",
              positions[position],
              className,
            )}
          >
            {content}
            {/* Arrow */}
            <div
              className={cn(
                "absolute w-2 h-2 bg-zinc-900 rotate-45",
                position === "top" && "bottom-[-4px] left-1/2 -translate-x-1/2",
                position === "bottom" && "top-[-4px] left-1/2 -translate-x-1/2",
                position === "left" && "right-[-4px] top-1/2 -translate-y-1/2",
                position === "right" && "left-[-4px] top-1/2 -translate-y-1/2",
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
