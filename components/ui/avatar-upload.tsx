"use client";

import * as React from "react";
import { Camera, User, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "./button";

interface AvatarUploadProps {
  value?: string; // URL or Base64
  onChange?: (file: File) => void;
  onRemove?: () => void;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function AvatarUpload({
  value,
  onChange,
  onRemove,
  size = "md",
  className,
}: AvatarUploadProps) {
  const [preview, setPreview] = React.useState<string | null>(value || null);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const sizes = {
    sm: "w-16 h-16 rounded-2xl",
    md: "w-24 h-24 rounded-3xl",
    lg: "w-32 h-32 rounded-[2.5rem]",
    xl: "w-48 h-48 rounded-[3.5rem]",
  };

  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
    xl: "w-16 h-16",
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
      onChange?.(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
    onRemove?.();
  };

  return (
    <div 
      className={cn("relative inline-block group", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative overflow-hidden cursor-pointer transition-all duration-500 border-4 border-card shadow-xl",
          sizes[size],
          preview ? "ring-2 ring-primary/20" : "bg-accent/50 border-dashed border-2 border-muted-foreground/20"
        )}
      >
        <AnimatePresence mode="wait">
          {preview ? (
            <motion.img
              key="preview"
              src={preview}
              alt="Avatar"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full h-full object-cover"
            />
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full flex items-center justify-center text-muted-foreground/30"
            >
              <User className={iconSizes[size]} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overlay */}
        <div className={cn(
          "absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-300",
          isHovered || isLoading ? "opacity-100" : "opacity-0"
        )}>
          {isLoading ? (
            <Loader2 className={cn("text-white animate-spin", iconSizes[size])} />
          ) : (
            <Camera className={cn("text-white transition-transform duration-300", isHovered && "scale-110", iconSizes[size])} />
          )}
        </div>
      </div>

      {/* Remove Button */}
      <AnimatePresence>
        {preview && isHovered && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            onClick={handleRemove}
            className="absolute -top-2 -right-2 p-1.5 bg-destructive text-destructive-foreground rounded-xl shadow-lg shadow-destructive/20 hover:scale-110 active:scale-95 transition-all z-10"
          >
            <X className="w-3.5 h-3.5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Action Badge (Optional aesthetic) */}
      {!preview && (
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary text-white rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 animate-bounce">
          <span className="text-[10px] font-bold">+</span>
        </div>
      )}
    </div>
  );
}
