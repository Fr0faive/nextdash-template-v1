"use client";

import * as React from "react";
import { Upload, X, File as FileIcon, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "./button";

interface FileUploadProps {
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // in MB
  onFilesChange?: (files: File[]) => void;
  className?: string;
}

export function FileUpload({
  multiple = false,
  accept = "image/*,application/pdf",
  maxSize = 5,
  onFilesChange,
  className,
}: FileUploadProps) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;

    const validFiles = Array.from(newFiles).filter((file) => {
      const isSizeValid = file.size <= maxSize * 1024 * 1024;
      return isSizeValid;
    });

    const updatedFiles = multiple ? [...files, ...validFiles] : [validFiles[0]].filter(Boolean);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className={cn("w-full space-y-4", className)}>
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative group cursor-pointer border-2 border-dashed rounded-3xl p-10 transition-all duration-300",
          "flex flex-col items-center justify-center text-center space-y-4",
          isDragging 
            ? "border-primary bg-primary/5 scale-[0.99] ring-4 ring-primary/5" 
            : "border-muted-foreground/20 hover:border-primary/50 hover:bg-accent/30"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />

        <div className={cn(
          "w-16 h-16 rounded-2xl bg-accent flex items-center justify-center transition-transform duration-300",
          isDragging ? "scale-110 rotate-5 text-primary" : "group-hover:scale-110 group-hover:text-primary"
        )}>
          <Upload className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-bold">
            {isDragging ? "Drop files here" : "Click or drag files to upload"}
          </p>
          <p className="text-xs text-muted-foreground">
            Support for {multiple ? "multiple files" : "single file"} up to {maxSize}MB
          </p>
        </div>

        <AnimatePresence>
          {isDragging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-primary/5 rounded-3xl pointer-events-none"
            />
          )}
        </AnimatePresence>
      </div>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {files.map((file, idx) => {
              const isImage = file.type.startsWith("image/");
              return (
                <motion.div
                  key={`${file.name}-${idx}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-3 p-3 bg-card border rounded-2xl group relative"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0 overflow-hidden">
                    {isImage ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FileIcon className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate pr-6">{file.name}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(idx);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-destructive/10 text-destructive opacity-0 group-hover:opacity-100 transition-all hover:bg-destructive hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 group-hover:hidden transition-all">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
