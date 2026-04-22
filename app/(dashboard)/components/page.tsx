"use client";

import Link from "next/link";
import { Zap, UserCircle, ShieldCheck, BarChart3, ArrowRight } from "lucide-react";
import { PageLayout, PageContent } from "@/components/ui/page-layout";
import { PageHeader } from "@/components/ui/page-header";

export default function ComponentsOverview() {
  const groups = [
    { 
      title: "Buttons", 
      desc: "Interactive elements with various styles and states.", 
      href: "/components/buttons", 
      icon: Zap,
      color: "text-blue-500 bg-blue-500/10"
    },
    { 
      title: "Inputs", 
      desc: "Form controls, text fields, and selection components.", 
      href: "/components/inputs", 
      icon: UserCircle,
      color: "text-orange-500 bg-orange-500/10"
    },
    { 
      title: "Overlays", 
      desc: "Modals, dialogs, and floating informational elements.", 
      href: "/components/overlays", 
      icon: ShieldCheck,
      color: "text-violet-500 bg-violet-500/10"
    },
    { 
      title: "Data Display", 
      desc: "Badges, chips, and progress indicators for visualization.", 
      href: "/components/data-display", 
      icon: BarChart3,
      color: "text-green-500 bg-green-500/10"
    },
  ];

  return (
    <PageLayout>
      <PageHeader 
        title="UI Library"
        subtitle="Our comprehensive collection of pre-built, premium components."
      />

      <PageContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groups.map((group) => (
            <Link 
              key={group.title} 
              href={group.href}
              className="group p-8 bg-card border rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${group.color}`}>
                <group.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">{group.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed pr-8">
                {group.desc}
              </p>
              <ArrowRight className="absolute bottom-8 right-8 w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </PageContent>
    </PageLayout>
  );
}
