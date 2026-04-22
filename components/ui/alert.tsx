import * as React from "react";
import { Info, CheckCircle, AlertTriangle, AlertCircle, X } from "lucide-react";
import { cn } from "./button";

interface AlertProps {
  variant?: "info" | "success" | "warning" | "destructive";
  title?: string;
  description: string;
  icon?: boolean;
  onClose?: () => void;
  className?: string;
}

export function Alert({
  variant = "info",
  title,
  description,
  icon = true,
  onClose,
  className,
}: AlertProps) {
  const icons = {
    info: Info,
    success: CheckCircle,
    warning: AlertTriangle,
    destructive: AlertCircle,
  };

  const variants = {
    info: "bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-400",
    success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400",
    warning: "bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400",
    destructive: "bg-rose-500/10 border-rose-500/20 text-rose-700 dark:text-rose-400",
  };

  const Icon = icons[variant];

  return (
    <div
      role="alert"
      className={cn(
        "relative w-full rounded-2xl border p-4 flex gap-3 transition-all",
        variants[variant],
        className
      )}
    >
      {icon && <Icon className="h-5 w-5 shrink-0 mt-0.5" />}
      <div className="flex-1 space-y-1">
        {title && <h5 className="font-black leading-none tracking-tight">{title}</h5>}
        <div className="text-sm font-medium leading-relaxed opacity-90">
          {description}
        </div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="shrink-0 p-1 rounded-lg hover:bg-black/5 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
