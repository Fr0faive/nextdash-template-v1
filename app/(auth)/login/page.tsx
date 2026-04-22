"use client";

import Link from "next/link";
import { LayoutDashboard, Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-accent/30 p-4 font-sans">
      <div className="w-full max-w-md space-y-8 bg-card p-10 rounded-[2.5rem] shadow-xl border relative overflow-hidden animate-in fade-in zoom-in duration-500">
        <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
        
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-primary items-center justify-center mb-4 shadow-lg shadow-primary/20">
            <LayoutDashboard className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground">Please enter your details to sign in.</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input 
                type="email" 
                placeholder="alex@example.com"
                className="w-full bg-accent/50 border-none rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-4 focus:ring-primary/10 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Password</label>
              <Link href="#" className="text-xs font-bold text-primary hover:underline">Forgot?</Link>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-accent/50 border-none rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-4 focus:ring-primary/10 outline-none transition-all"
              />
            </div>
          </div>

          <button className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 mt-6">
            Sign In <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground pt-4">
          Don't have an account? <Link href="#" className="text-primary font-bold hover:underline">Sign up for free</Link>
        </p>
      </div>
    </div>
  );
}
