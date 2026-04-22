"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextTheme,
} from "next-themes";
import { usePathname } from "next/navigation";

type Accent = "blue" | "violet" | "rose" | "orange" | "zinc";
type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

interface ThemeContextType {
  accent: Accent;
  setAccent: (accent: Accent) => void;
  toastPosition: ToastPosition;
  setToastPosition: (pos: ToastPosition) => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined,
);



export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccent] = React.useState<Accent>("blue");
  const [toastPosition, setToastPosition] =
    React.useState<ToastPosition>("top-right");

  const [mounted, setMounted] = React.useState(false);

  // Load from localStorage on mount and set mounted
  React.useEffect(() => {
    const savedAccent = localStorage.getItem("dashboard-accent") as Accent;
    const savedPos = localStorage.getItem(
      "dashboard-toast-pos",
    ) as ToastPosition;
    if (savedAccent) setAccent(savedAccent);
    if (savedPos) setToastPosition(savedPos);
    setMounted(true);
  }, []);

  const pathname = usePathname();

  // Use useLayoutEffect for immediate attribute application to avoid flashes
  React.useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-accent", accent);
      localStorage.setItem("dashboard-accent", accent);
    }
  }, [accent, mounted, pathname]);

  // Update toast pos in storage
  React.useEffect(() => {
    localStorage.setItem("dashboard-toast-pos", toastPosition);
  }, [toastPosition]);

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeContext.Provider
        value={{ accent, setAccent, toastPosition, setToastPosition }}
      >
        {children}
      </ThemeContext.Provider>
    </NextThemesProvider>
  );
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  const nextTheme = useNextTheme();

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return {
    ...nextTheme,
    accent: context.accent,
    setAccent: context.setAccent,
    toastPosition: context.toastPosition,
    setToastPosition: context.setToastPosition,
  };
};
