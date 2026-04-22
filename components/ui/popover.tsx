"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "./button";

interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  width?: string;
  className?: string;
}

export function Popover({
  trigger,
  children,
  side = "bottom",
  align = "center",
  width = "w-64",
  className,
}: PopoverProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPositionClasses = () => {
    const sideClasses = {
      top: "bottom-full mb-2",
      bottom: "top-full mt-2",
      left: "right-full mr-2",
      right: "left-full ml-2",
    };

    const alignClasses = {
      start: side === "left" || side === "right" ? "top-0" : "left-0",
      center: side === "left" || side === "right" ? "top-1/2 -translate-y-1/2" : "left-1/2 -translate-x-1/2",
      end: side === "left" || side === "right" ? "bottom-0" : "right-0",
    };

    return cn(sideClasses[side], alignClasses[align]);
  };

  const getAnimation = () => {
    const variants = {
      top: { initial: { y: 10 }, animate: { y: 0 } },
      bottom: { initial: { y: -10 }, animate: { y: 0 } },
      left: { initial: { x: 10 }, animate: { x: 0 } },
      right: { initial: { x: -10 }, animate: { x: 0 } },
    };
    return variants[side];
  };

  const anim = getAnimation();

  return (
    <div className="relative inline-block" ref={containerRef}>
      <div 
        onClick={() => mounted && setIsOpen(!isOpen)} 
        className="cursor-pointer"
      >
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, ...anim.initial }}
            animate={{ opacity: 1, scale: 1, ...anim.animate }}
            exit={{ opacity: 0, scale: 0.95, ...anim.initial }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "absolute z-100 p-4 bg-card border rounded-3xl shadow-2xl",
              getPositionClasses(),
              width,
              className,
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
