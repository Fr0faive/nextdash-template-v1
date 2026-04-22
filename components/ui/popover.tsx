"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { cn } from "./button";

interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  width?: string;
  className?: string;
  triggerAction?: "click" | "hover";
  useMobileOverlay?: boolean;
}

export function Popover({
  trigger,
  children,
  side = "bottom",
  align = "center",
  width = "w-64",
  className,
  triggerAction = "click",
  useMobileOverlay = false,
}: PopoverProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [coords, setCoords] = React.useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const containerRef = React.useRef<HTMLDivElement>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout>(null);

  const updateCoords = React.useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    }
  }, []);

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

    if (triggerAction === "click") {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [triggerAction]);

  React.useLayoutEffect(() => {
    if (isOpen) {
      updateCoords();
    }
  }, [isOpen, updateCoords]);

  React.useEffect(() => {
    if (isOpen) {
      window.addEventListener("resize", updateCoords);
      window.addEventListener("scroll", updateCoords, true);
    }
    return () => {
      window.removeEventListener("resize", updateCoords);
      window.removeEventListener("scroll", updateCoords, true);
    };
  }, [isOpen, updateCoords]);

  const handleMouseEnter = () => {
    if (triggerAction === "hover") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      updateCoords();
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (triggerAction === "hover") {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 100);
    }
  };

  const toggleOpen = () => {
    if (triggerAction === "click") {
      updateCoords();
      setIsOpen(!isOpen);
    }
  };

  const getPositionStyles = (): React.CSSProperties => {
    if (typeof window === "undefined" || !coords.width) return { opacity: 0 };

    const isMobile = window.innerWidth < 640 && useMobileOverlay;
    if (isMobile) return { position: "fixed", zIndex: 9999 };

    let styles: React.CSSProperties = {
      position: "fixed",
      zIndex: 9999,
    };

    if (side === "top") {
      styles.bottom = `${window.innerHeight - coords.top + 6}px`;
      if (align === "center") {
        styles.left = `${coords.left + coords.width / 2}px`;
        styles.transform = "translateX(-50%)";
      } else if (align === "start") {
        styles.left = `${coords.left}px`;
      } else if (align === "end") {
        styles.left = `${coords.left + coords.width}px`;
        styles.transform = "translateX(-100%)";
      }
    } else if (side === "bottom") {
      styles.top = `${coords.top + coords.height + 6}px`;
      if (align === "center") {
        styles.left = `${coords.left + coords.width / 2}px`;
        styles.transform = "translateX(-50%)";
      } else if (align === "start") {
        styles.left = `${coords.left}px`;
      } else if (align === "end") {
        styles.left = `${coords.left + coords.width}px`;
        styles.transform = "translateX(-100%)";
      }
    } else if (side === "left") {
      styles.right = `${window.innerWidth - coords.left + 6}px`;
      if (align === "center") {
        styles.top = `${coords.top + coords.height / 2}px`;
        styles.transform = "translateY(-50%)";
      } else if (align === "start") {
        styles.top = `${coords.top}px`;
      } else if (align === "end") {
        styles.top = `${coords.top + coords.height}px`;
        styles.transform = "translateY(-100%)";
      }
    } else if (side === "right") {
      styles.left = `${coords.left + coords.width + 6}px`;
      if (align === "center") {
        styles.top = `${coords.top + coords.height / 2}px`;
        styles.transform = "translateY(-50%)";
      } else if (align === "start") {
        styles.top = `${coords.top}px`;
      } else if (align === "end") {
        styles.top = `${coords.top + coords.height}px`;
        styles.transform = "translateY(-100%)";
      }
    }

    return styles;
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

  const popoverContent = (
    <AnimatePresence>
      {isOpen && (
        <div style={getPositionStyles()} className="z-9999">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, ...anim.initial }}
            animate={{ opacity: 1, scale: 1, ...anim.animate }}
            exit={{ opacity: 0, scale: 0.9, ...anim.initial }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "p-4 bg-card/90 backdrop-blur-2xl border rounded-3xl shadow-2xl overflow-hidden",
              useMobileOverlay &&
                "fixed inset-x-4 bottom-4 top-auto sm:top-auto sm:relative sm:inset-auto",
              width,
              className,
            )}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <div
      className={cn("relative inline-block", className)}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        onClick={toggleOpen}
        className="cursor-pointer transition-transform active:scale-95"
      >
        {trigger}
      </div>

      {mounted && createPortal(popoverContent, document.body)}
    </div>
  );
}
