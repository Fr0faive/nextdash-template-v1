import { cn } from "./button";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "rectangle" | "circle" | "rounded";
}

export function Skeleton({
  className,
  variant = "rounded",
  ...props
}: SkeletonProps) {
  const variants = {
    rectangle: "rounded-none",
    circle: "rounded-full",
    rounded: "rounded-2xl",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted/80 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-linear-to-r before:from-transparent before:via-white/20 before:to-transparent",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
