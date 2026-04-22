"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/components/ui/button";
import { useTheme } from "./theme-provider";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast extends Omit<ToastOptions, "id"> {
  id: string;
}

interface ToastOptions {
  title?: string;
  message: string;
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
}

interface ToastContextType {
  toast: (options: ToastOptions) => void;
  success: (message: string, title?: string, position?: ToastPosition) => void;
  error: (message: string, title?: string, position?: ToastPosition) => void;
  info: (message: string, title?: string, position?: ToastPosition) => void;
  warning: (message: string, title?: string, position?: ToastPosition) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined,
);

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

interface ToastProviderProps {
  children: React.ReactNode;
  defaultPosition?: ToastPosition;
}

export function ToastProvider({
  children,
  defaultPosition: propDefaultPosition,
}: ToastProviderProps) {
  const { toastPosition: contextPosition } = useTheme();
  const defaultPosition = contextPosition || propDefaultPosition || "bottom-right";
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = React.useCallback(
    (options: ToastOptions) => {
      const id = Math.random().toString(36).substr(2, 9);
      const position = options.position || defaultPosition;
      const newToast = { id, ...options, position };

      setToasts((prev) => [...prev, newToast]);

      if (options.duration !== 0) {
        setTimeout(() => {
          removeToast(id);
        }, options.duration || 5000);
      }
    },
    [defaultPosition, removeToast],
  );

  const toastHandlers = React.useMemo(
    () => ({
      toast: addToast,
      success: (message: string, title?: string, position?: ToastPosition) =>
        addToast({ message, title, type: "success", position }),
      error: (message: string, title?: string, position?: ToastPosition) =>
        addToast({ message, title, type: "error", position }),
      info: (message: string, title?: string, position?: ToastPosition) =>
        addToast({ message, title, type: "info", position }),
      warning: (message: string, title?: string, position?: ToastPosition) =>
        addToast({ message, title, type: "warning", position }),
    }),
    [addToast],
  );

  const positions: ToastPosition[] = [
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ];

  const positionClasses: Record<ToastPosition, string> = {
    "top-left": "top-6 left-6 items-start",
    "top-center": "top-6 left-1/2 -translate-x-1/2 items-center",
    "top-right": "top-6 right-6 items-end",
    "bottom-left": "bottom-6 left-6 items-start",
    "bottom-center": "bottom-6 left-1/2 -translate-x-1/2 items-center",
    "bottom-right": "bottom-6 right-6 items-end",
  };

  return (
    <ToastContext.Provider value={toastHandlers}>
      {children}

      {positions.map((pos) => {
        const toastsInPosition = toasts.filter((t) => t.position === pos);
        if (toastsInPosition.length === 0) return null;

        const isTop = pos.startsWith("top");

        return (
          <div
            key={pos}
            className={cn(
              "fixed z-9999 flex flex-col gap-3 w-full max-w-sm pointer-events-none transition-all duration-500",
              positionClasses[pos],
            )}
          >
            <AnimatePresence mode="popLayout">
              {toastsInPosition.map((t) => (
                <motion.div
                  key={t.id}
                  layout
                  initial={{ opacity: 0, y: isTop ? -50 : 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    transition: { duration: 0.2 },
                  }}
                  className="pointer-events-auto w-full px-4 sm:px-0"
                >
                  <ToastItem
                    toast={t}
                    onRemove={() => removeToast(t.id)}
                    position={pos}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        );
      })}
    </ToastContext.Provider>
  );
}

function ToastItem({
  toast,
  onRemove,
  position,
}: {
  toast: Toast;
  onRemove: () => void;
  position: ToastPosition;
}) {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-destructive" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-orange-500" />,
  };

  const backgrounds = {
    success: "border-green-500/20 bg-green-500/5",
    error: "border-destructive/20 bg-destructive/5",
    info: "border-blue-500/20 bg-blue-500/5",
    warning: "border-orange-500/20 bg-orange-500/5",
  };

  const type = toast.type || "info";

  return (
    <div
      className={cn(
        "relative group flex items-start gap-4 p-4 bg-card/80 backdrop-blur-xl border rounded-lg shadow-2xl overflow-hidden",
        backgrounds[type],
      )}
    >
      {/* Type-specific side accent */}
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 w-1.5",
          type === "success" && "bg-green-500",
          type === "error" && "bg-destructive",
          type === "info" && "bg-blue-500",
          type === "warning" && "bg-orange-500",
        )}
      />

      <div className="shrink-0 mt-0.5">{icons[type]}</div>

      <div className="flex-1 space-y-1 pr-6">
        {toast.title && (
          <h4 className="text-sm font-black tracking-tight">{toast.title}</h4>
        )}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {toast.message}
        </p>
      </div>

      <button
        onClick={onRemove}
        className="absolute top-4 right-4 p-1 rounded-lg hover:bg-accent text-muted-foreground transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Progress Bar (Visual) */}
      {toast.duration !== 0 && (
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{
            duration: (toast.duration || 5000) / 1000,
            ease: "linear",
          }}
          className={cn(
            "absolute bottom-0 left-0 h-1",
            type === "success" && "bg-green-500/50",
            type === "error" && "bg-destructive/50",
            type === "info" && "bg-blue-500/50",
            type === "warning" && "bg-orange-500/50",
          )}
        />
      )}
    </div>
  );
}
