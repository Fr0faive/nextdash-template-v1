"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "./button";
import { motion } from "framer-motion";

export interface StepItem {
  label: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
}

export interface StepperProps {
  steps: StepItem[];
  currentStep: number; // 0-indexed
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function Stepper({
  steps,
  currentStep,
  orientation = "horizontal",
  className,
}: StepperProps) {
  return (
    <div
      className={cn(
        "flex w-full",
        orientation === "vertical" ? "flex-col space-y-4" : "flex-row items-center justify-between",
        className
      )}
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isUpcoming = index > currentStep;

        return (
          <div
            key={index}
            className={cn(
              "relative flex",
              orientation === "vertical" ? "flex-row items-start" : "flex-col items-center text-center w-full"
            )}
          >
            {/* The Step Indicator & Connector Container */}
            <div
              className={cn(
                "flex items-center justify-center",
                orientation === "vertical" ? "flex-col mr-4" : "flex-row w-full mb-3"
              )}
            >
              {/* Connector (Before) - Only visible if not first item and horizontal */}
              {orientation === "horizontal" && (
                <div
                  className={cn(
                    "flex-1 h-1 transition-colors duration-500",
                    index === 0 ? "bg-transparent" : isCompleted || isCurrent ? "bg-primary" : "bg-accent"
                  )}
                />
              )}

              {/* Step Circle */}
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                }}
                className={cn(
                  "relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 font-bold text-sm transition-colors duration-500 shrink-0",
                  isCompleted
                    ? "bg-primary border-primary text-primary-foreground"
                    : isCurrent
                    ? "bg-card border-primary text-primary ring-4 ring-primary/20"
                    : "bg-card border-accent text-muted-foreground"
                )}
              >
                {step.icon ? (
                  step.icon
                ) : isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  index + 1
                )}
              </motion.div>

              {/* Connector (After) - Only visible if not last item and horizontal */}
              {orientation === "horizontal" && (
                <div
                  className={cn(
                    "flex-1 h-1 transition-colors duration-500",
                    index === steps.length - 1 ? "bg-transparent" : isCompleted ? "bg-primary" : "bg-accent"
                  )}
                />
              )}

              {/* Connector for Vertical Layout */}
              {orientation === "vertical" && index !== steps.length - 1 && (
                <div
                  className={cn(
                    "w-1 h-full min-h-[40px] rounded-full mt-2 transition-colors duration-500",
                    isCompleted ? "bg-primary" : "bg-accent"
                  )}
                />
              )}
            </div>

            {/* Step Content */}
            <div
              className={cn(
                "flex flex-col",
                orientation === "vertical" ? "pt-1" : "px-2"
              )}
            >
              <div
                className={cn(
                  "text-sm font-bold transition-colors duration-500",
                  isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </div>
              {step.description && (
                <div className="text-xs font-medium text-muted-foreground mt-0.5">
                  {step.description}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
