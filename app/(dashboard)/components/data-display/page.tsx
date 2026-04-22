"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Chip } from "@/components/ui/chip";
import { ProgressBar } from "@/components/ui/progress-bar";
import { PageLayout, PageContent } from "@/components/ui/page-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Check, User, Code, Palette, Settings, Bell, Mail } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";

import { Avatar } from "@/components/ui/avatar";
import { Timeline } from "@/components/ui/timeline";

export default function DataDisplayDemo() {
  const timelineItems = [
    { title: "Project Launched", description: "The new dashboard system was successfully deployed.", time: "Just now", icon: <Check className="w-5 h-5 text-green-500" /> },
    { title: "Design Review", description: "Team reviewed the new component library.", time: "2h ago", icon: <Palette className="w-5 h-5 text-primary" /> },
    { title: "Server Alert", description: "High latency detected in us-east-1 region.", time: "5h ago", icon: <Bell className="w-5 h-5 text-rose-500" /> },
  ];

  return (
    <PageLayout>
      <PageHeader
        title="Data Display"
        subtitle="Badges, avatars, timelines, and more for rich data presentation."
        breadcrumbs={[
          { label: "Components", href: "/components" },
          { label: "Data Display", active: true },
        ]}
      />

      <PageContent className="space-y-16">
        <section className="space-y-8">
          <h2 className="text-xl font-bold border-b pb-2">Avatars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Sizes & Shapes</h3>
              <div className="flex flex-wrap items-end gap-4">
                <Avatar size="sm" fallback="JD" />
                <Avatar size="md" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" />
                <Avatar size="lg" fallback="AR" shape="circle" />
                <Avatar size="xl" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" shape="rounded" />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Status</h3>
              <div className="flex flex-wrap gap-6">
                <Avatar status="online" src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" />
                <Avatar status="away" fallback="JD" shape="circle" />
                <Avatar status="busy" src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop" />
                <Avatar status="offline" fallback="MK" />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-xl font-bold border-b pb-2">Timeline Variants</h2>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            {/* Left & Right */}
            <div className="space-y-12">
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Left Aligned (Default)</h3>
                <div className="p-8 bg-card border rounded-4xl">
                  <Timeline items={timelineItems} variant="left" />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Right Aligned</h3>
                <div className="p-8 bg-card border rounded-4xl">
                  <Timeline items={timelineItems} variant="right" />
                </div>
              </div>
            </div>

            {/* Alternating */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Alternating Center</h3>
              <div className="p-8 bg-card border rounded-4xl overflow-hidden">
                <Timeline items={timelineItems} variant="alternating" />
              </div>
            </div>
          </div>
        </section>
        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">
            Badges & Indicators
          </h2>
          <div className="space-y-10">
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Notification Styles
              </h3>
              <div className="flex flex-wrap gap-8 items-center">
                <Badge count={5} variant="destructive">
                  <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center">
                    <Bell className="w-6 h-6 text-muted-foreground" />
                  </div>
                </Badge>

                <Badge count="99+" variant="primary">
                  <IconButton
                    icon={<Mail className="w-6 h-6" />}
                    variant="outline"
                  />
                </Badge>

                <Badge variant="dot" color="primary">
                  <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center">
                    <Settings className="w-6 h-6 text-muted-foreground" />
                  </div>
                </Badge>

                <Badge count={0} showZero variant="success">
                  <IconButton
                    icon={<Check className="w-6 h-6" />}
                    variant="secondary"
                  />
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Standalone Badges
              </h3>
              <div className="flex flex-wrap gap-3">
                <Badge count="New" variant="primary" />
                <Badge count="Hot" variant="destructive" />
                <Badge count="Active" variant="success" />
                <Badge count="Draft" variant="secondary" />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">Chips & Tags</h2>
          <div className="space-y-10">
            {/* Filled Variants */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Filled Style
              </h3>
              <div className="flex flex-wrap gap-3">
                <Chip label="Primary" variant="filled" color="primary" />
                <Chip label="Success" variant="filled" color="success" />
                <Chip label="Warning" variant="filled" color="warning" />
                <Chip
                  label="Destructive"
                  variant="filled"
                  color="destructive"
                />
                <Chip label="Secondary" variant="filled" color="secondary" />
              </div>
            </div>

            {/* Soft Variants */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Soft Style
              </h3>
              <div className="flex flex-wrap gap-3">
                <Chip label="Primary" variant="soft" color="primary" />
                <Chip label="Success" variant="soft" color="success" />
                <Chip label="Warning" variant="soft" color="warning" />
                <Chip label="Destructive" variant="soft" color="destructive" />
                <Chip label="Secondary" variant="soft" color="secondary" />
              </div>
            </div>

            {/* Outline Variants */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Outline Style
              </h3>
              <div className="flex flex-wrap gap-3">
                <Chip label="Primary" variant="outline" color="primary" />
                <Chip label="Success" variant="outline" color="success" />
                <Chip label="Warning" variant="outline" color="warning" />
                <Chip
                  label="Destructive"
                  variant="outline"
                  color="destructive"
                />
                <Chip label="Secondary" variant="outline" color="secondary" />
              </div>
            </div>

            {/* Interactive */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Interactive & Icons
              </h3>
              <div className="flex flex-wrap gap-4">
                <Chip
                  label="React.js"
                  variant="filled"
                  color="primary"
                  icon={<Code className="w-3.5 h-3.5" />}
                />
                <Chip
                  label="Verified"
                  variant="soft"
                  color="success"
                  icon={<Check className="w-3.5 h-3.5" />}
                />
                <Chip
                  label="John Doe"
                  color="neutral"
                  icon={<User className="w-3.5 h-3.5" />}
                  onDelete={() => alert("Deleted")}
                />
                <Chip
                  label="Designer"
                  variant="outline"
                  color="primary"
                  icon={<Palette className="w-3.5 h-3.5" />}
                  onDelete={() => {}}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ProgressBar value={75} showValue />
            <div className="space-y-4">
              <ProgressBar
                value={40}
                className="h-2"
                indicatorClassName="bg-green-500 shadow-green-500/20"
              />
              <ProgressBar
                value={90}
                className="h-2"
                indicatorClassName="bg-destructive shadow-destructive/20"
              />
            </div>
          </div>
        </section>
      </PageContent>
    </PageLayout>
  );
}
