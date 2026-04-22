"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/providers/toast-provider";

export default function LoginPage() {
  const router = useRouter();
  const { success } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      success(
        "Welcome back! Redirecting you to the dashboard.",
        "Login Successful",
      );
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent/30 p-4 font-sans selection:bg-primary/30">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex w-16 h-16 rounded-4xl bg-primary items-center justify-center mb-4 shadow-2xl shadow-primary/30">
            <LayoutDashboard className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-black tracking-tight">NextDash</h1>
          <p className="text-muted-foreground font-medium">
            Please sign in to your account
          </p>
        </div>

        <Card
          padding="xl"
          className="border-primary/10 shadow-2xl shadow-primary/5 relative"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary/50 via-primary to-primary/50"></div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  placeholder="alex@example.com"
                  required
                  disabled={isLoading}
                  className="w-full bg-accent/50 border border-transparent focus:border-primary/20 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-muted-foreground/50 disabled:opacity-50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-bold text-primary hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  className="w-full bg-accent/50 border border-transparent focus:border-primary/20 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-muted-foreground/50 disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-7 text-base font-bold rounded-2xl group shadow-xl shadow-primary/20"
              isLoading={isLoading}
              rightIcon={
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              }
            >
              Sign In to Dashboard
            </Button>

            <div className="text-center pt-2">
              <p className="text-sm text-muted-foreground font-medium">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="text-primary font-bold hover:underline"
                >
                  Create Account
                </button>
              </p>
            </div>
          </form>
        </Card>

        <p className="mt-8 text-center text-xs text-muted-foreground/60 font-medium">
          © 2026 NextDash Premium. All rights reserved.
        </p>
      </div>
    </div>
  );
}
