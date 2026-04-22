import Link from "next/link";
import { LayoutDashboard, ArrowRight, Shield, Zap, Globe } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <nav className="h-20 px-8 flex items-center justify-between border-b sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <LayoutDashboard className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl tracking-tight">NextDash</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm font-bold hover:text-primary transition-colors">Login</Link>
          <Link href="/login" className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
            Get Started
          </Link>
        </div>
      </nav>

      <main className="flex-1">
        <section className="py-24 px-8 text-center space-y-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-top-10 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            v1.0 is now live
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
            The Ultimate <span className="text-primary">Dashboard</span> Template for Next.js
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Beautifully designed, highly customizable, and fully responsive. Build your next SaaS faster with NextDash's premium components.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link href="/dashboard" className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-2">
              Explore Demo <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="px-8 py-4 bg-accent text-accent-foreground rounded-2xl font-bold text-lg hover:bg-accent/80 transition-all">
              Documentation
            </button>
          </div>
        </section>

        <section className="py-24 px-8 bg-accent/30 border-y">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Shield, title: "Secure by Default", desc: "Enterprise-grade security patterns implemented across the board." },
              { icon: Zap, title: "Ultra Fast", desc: "Built on Next.js 15 for maximum performance and SEO efficiency." },
              { icon: Globe, title: "Global Scale", desc: "i18n ready and optimized for global content delivery." },
            ].map((feature) => (
              <div key={feature.title} className="space-y-4 text-center md:text-left">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto md:mx-0">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-12 border-t px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg tracking-tight">NextDash</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 NextDash Template. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
