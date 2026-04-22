"use client";

import * as React from "react";
import { Moon, Sun, Check, Palette } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const accents = [
  { name: "Blue", value: "blue", class: "bg-blue-500" },
  { name: "Violet", value: "violet", class: "bg-violet-500" },
  { name: "Rose", value: "rose", class: "bg-rose-500" },
  { name: "Orange", value: "orange", class: "bg-orange-500" },
] as const;

export function ThemeSwitcher() {
  const { theme, setTheme, accent, setAccent } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 p-2 bg-card border rounded-2xl shadow-xl z-50">
      <div className="flex items-center gap-2 border-b pb-2 mb-1 px-1">
        <Palette className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground">Themes</span>
      </div>
      
      {/* Accent Switcher */}
      <div className="grid grid-cols-2 gap-2">
        {accents.map((a) => (
          <button
            key={a.value}
            onClick={() => setAccent(a.value)}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95",
              a.class,
              accent === a.value ? "ring-2 ring-offset-2 ring-foreground" : "opacity-80"
            )}
            title={a.name}
          >
            {accent === a.value && <Check className="w-4 h-4 text-white" />}
          </button>
        ))}
      </div>

      <div className="border-t pt-2 mt-1 grid grid-cols-2 gap-2">
        <button
          onClick={() => setTheme("light")}
          className={cn(
            "p-2 rounded-lg flex items-center justify-center transition-all hover:bg-accent",
            theme === "light" ? "bg-accent text-accent-foreground" : "text-muted-foreground"
          )}
        >
          <Sun className="w-4 h-4" />
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={cn(
            "p-2 rounded-lg flex items-center justify-center transition-all hover:bg-accent",
            theme === "dark" ? "bg-accent text-accent-foreground" : "text-muted-foreground"
          )}
        >
          <Moon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
