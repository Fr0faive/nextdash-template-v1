"use client";

import * as React from "react";
import { Accordion } from "@/components/ui/accordion";
import { Tabs } from "@/components/ui/tabs";
import { Popover } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { PageLayout, PageContent } from "@/components/ui/page-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Bell, User, Settings, Shield, Info } from "lucide-react";

export default function DisclosureDemo() {
  const [activeTab, setActiveTab] = React.useState("account");

  const accordionItems = [
    { id: "1", title: "What is NextDash?", content: "NextDash is a premium dashboard template built with Next.js and Tailwind CSS, focusing on rich aesthetics and modularity." },
    { id: "2", title: "Is it responsive?", content: "Yes, every component is designed to be fully responsive across mobile, tablet, and desktop devices." },
    { id: "3", title: "Can I customize the theme?", content: "Absolutely. You can change accent colors, switch between light and dark modes, and modify the global CSS variables easily." },
  ];

  const tabs = [
    { id: "account", label: "Account", icon: <User className="w-4 h-4" /> },
    { id: "security", label: "Security", icon: <Shield className="w-4 h-4" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
  ];

  return (
    <PageLayout>
      <PageHeader 
        title="Disclosure & Navigation"
        subtitle="Components for organizing content and providing additional information."
        breadcrumbs={[
          { label: "Components", href: "/components" },
          { label: "Disclosure", active: true }
        ]}
      />

      <PageContent className="space-y-12">
        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">Tabs</h2>
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Underline Variant</h3>
              <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="underline" />
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Pills Variant</h3>
              <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" className="max-w-md" />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">Accordion</h2>
          <div className="max-w-2xl">
            <Accordion items={accordionItems} />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">Popover Positions</h2>
          <div className="flex flex-wrap gap-8 items-center justify-center p-12 bg-accent/10 rounded-4xl border border-dashed border-accent/30">
            <Popover 
              trigger={<Button variant="outline">Top Popover</Button>}
              side="top"
              align="center"
            >
              <div className="text-sm font-bold">I'm on top!</div>
            </Popover>

            <Popover 
              trigger={<Button variant="outline">Left Popover</Button>}
              side="left"
              align="center"
              width="w-48"
            >
              <div className="text-sm font-bold">Coming from the left!</div>
            </Popover>

            <Popover 
              trigger={<Button variant="outline">Right Popover</Button>}
              side="right"
              align="center"
              width="w-48"
            >
              <div className="text-sm font-bold">Hello from the right!</div>
            </Popover>

            <Popover 
              trigger={<Button variant="primary">Bottom (Default)</Button>}
              side="bottom"
              align="center"
            >
              <div className="text-sm font-bold">Standard bottom popover.</div>
            </Popover>
          </div>
        </section>
      </PageContent>
    </PageLayout>
  );
}
