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
    {
      id: "1",
      title: "What is NextDash?",
      content:
        "NextDash is a premium dashboard template built with Next.js and Tailwind CSS, focusing on rich aesthetics and modularity.",
    },
    {
      id: "2",
      title: "Is it responsive?",
      content:
        "Yes, every component is designed to be fully responsive across mobile, tablet, and desktop devices.",
    },
    {
      id: "3",
      title: "Can I customize the theme?",
      content:
        "Absolutely. You can change accent colors, switch between light and dark modes, and modify the global CSS variables easily.",
    },
  ];

  const tabs = [
    { id: "account", label: "Account", icon: <User className="w-4 h-4" /> },
    { id: "security", label: "Security", icon: <Shield className="w-4 h-4" /> },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="w-4 h-4" />,
    },
  ];

  return (
    <PageLayout>
      <PageHeader
        title="Disclosure & Navigation"
        subtitle="Components for organizing content and providing additional information."
        breadcrumbs={[
          { label: "Components", href: "/components" },
          { label: "Disclosure", active: true },
        ]}
      />

      <PageContent className="space-y-12">
        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">Tabs</h2>
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                Underline Variant
              </h3>
              <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onChange={setActiveTab}
                variant="underline"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                Pills Variant
              </h3>
              <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onChange={setActiveTab}
                variant="pills"
                className="max-w-md"
              />
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
          
          <div className="space-y-12">
            {/* Top Variations */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Top Side</h3>
              <div className="flex flex-wrap gap-4 items-center justify-center p-8 bg-accent/5 rounded-3xl border border-dashed border-accent/20">
                <Popover side="top" align="start" trigger={<Button variant="outline">Top Start</Button>}>
                  <div className="text-sm font-bold">Top Start Alignment</div>
                </Popover>
                <Popover side="top" align="center" trigger={<Button variant="outline">Top Center</Button>}>
                  <div className="text-sm font-bold">Top Center Alignment</div>
                </Popover>
                <Popover side="top" align="end" trigger={<Button variant="outline">Top End</Button>}>
                  <div className="text-sm font-bold">Top End Alignment</div>
                </Popover>
              </div>
            </div>

            {/* Bottom Variations */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Bottom Side</h3>
              <div className="flex flex-wrap gap-4 items-center justify-center p-8 bg-accent/5 rounded-3xl border border-dashed border-accent/20">
                <Popover side="bottom" align="start" trigger={<Button variant="outline">Bottom Start</Button>}>
                  <div className="text-sm font-bold">Bottom Start Alignment</div>
                </Popover>
                <Popover side="bottom" align="center" trigger={<Button variant="primary">Bottom Center</Button>}>
                  <div className="text-sm font-bold">Bottom Center Alignment</div>
                </Popover>
                <Popover side="bottom" align="end" trigger={<Button variant="outline">Bottom End</Button>}>
                  <div className="text-sm font-bold">Bottom End Alignment</div>
                </Popover>
              </div>
            </div>

            {/* Left Variations */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Left Side</h3>
              <div className="flex flex-wrap gap-4 items-center justify-center p-8 bg-accent/5 rounded-3xl border border-dashed border-accent/20">
                <Popover side="left" align="start" trigger={<Button variant="outline">Left Start</Button>}>
                  <div className="text-sm font-bold text-center">Left Start Alignment</div>
                </Popover>
                <Popover side="left" align="center" trigger={<Button variant="outline">Left Center</Button>}>
                  <div className="text-sm font-bold text-center">Left Center Alignment</div>
                </Popover>
                <Popover side="left" align="end" trigger={<Button variant="outline">Left End</Button>}>
                  <div className="text-sm font-bold text-center">Left End Alignment</div>
                </Popover>
              </div>
            </div>

            {/* Right Variations */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Right Side</h3>
              <div className="flex flex-wrap gap-4 items-center justify-center p-8 bg-accent/5 rounded-3xl border border-dashed border-accent/20">
                <Popover side="right" align="start" trigger={<Button variant="outline">Right Start</Button>}>
                  <div className="text-sm font-bold text-center">Right Start Alignment</div>
                </Popover>
                <Popover side="right" align="center" trigger={<Button variant="outline">Right Center</Button>}>
                  <div className="text-sm font-bold text-center">Right Center Alignment</div>
                </Popover>
                <Popover side="right" align="end" trigger={<Button variant="outline">Right End</Button>}>
                  <div className="text-sm font-bold text-center">Right End Alignment</div>
                </Popover>
              </div>
            </div>
          </div>
        </section>
      </PageContent>
    </PageLayout>
  );
}
