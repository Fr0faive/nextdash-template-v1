"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Search, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { startTransition } from "react";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="max-w-2xl w-full text-center space-y-12 relative z-10">
        {/* Animated Icon/Illustration */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative inline-block"
        >
          <div className="w-48 h-48 rounded-[3rem] bg-accent/50 flex items-center justify-center relative border shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="text-9xl font-black text-primary/10 absolute select-none">
              404
            </span>
            <AlertCircle className="w-24 h-24 text-primary relative z-10 animate-bounce" />
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            Lost in the <span className="text-primary italic">Gravity?</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
            The page you are looking for has either drifted into another
            dimension or simply doesn't exist anymore.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="rounded-2xl h-14 px-8 shadow-xl shadow-primary/20"
            leftIcon={<Home className="w-5 h-5" />}
            onClick={() => router.push("/dashboard")}
          >
            Back to Dashboard
          </Button>

          {/* <Button
            variant="outline"
            size="lg"
            className="rounded-2xl h-14 px-8 bg-card/50 backdrop-blur-sm"
            leftIcon={<ArrowLeft className="w-5 h-5" />}
            onClick={() => {
              startTransition(() => {
                router.back();
              });
            }}
          >
            Go Back
          </Button> */}
        </motion.div>

        {/* Footer Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="pt-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/30 border border-dashed text-xs font-medium text-muted-foreground">
            <Search className="w-3 h-3" />
            <span>Try searching for something else in the header</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
