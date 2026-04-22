"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { FAB } from "@/components/ui/fab";
import { PageLayout, PageContent } from "@/components/ui/page-layout";
import { PageHeader } from "@/components/ui/page-header";
import {
  Send,
  Bell,
  Settings,
  Search,
  Check,
  Download,
  Zap,
  Trash2,
  Plus,
  UserPlus,
  FileText,
  Cloud,
  Share2,
} from "lucide-react";

import { useToast } from "@/components/providers/toast-provider";
import { Card } from "@/components/ui/card";

export default function ButtonsDemo() {
  const [loading, setLoading] = React.useState(false);
  const { success, error, info } = useToast();

  const handleAsyncAction = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      success("Data has been synchronized successfully!", "Sync Complete");
    }, 2000);
  };

  return (
    <PageLayout>
      <PageHeader
        title="Buttons"
        subtitle="Various button styles, sizes, and states for your application."
        breadcrumbs={[
          { label: "Components", href: "/components" },
          { label: "Buttons", active: true },
        ]}
      />

      <PageContent className="space-y-12">
        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={() =>
                info("You clicked a primary button", "Primary Action")
              }
            >
              Primary
            </Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button
              variant="destructive"
              onClick={() => error("This action is prohibited.", "Error")}
            >
              Destructive
            </Button>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">Sizes</h2>
          <div className="flex flex-wrap items-end gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">With Icons</h2>
          <div className="flex flex-wrap gap-4">
            <Button leftIcon={<Send className="w-4 h-4" />}>
              Send Message
            </Button>
            <Button
              variant="outline"
              rightIcon={<Download className="w-4 h-4" />}
            >
              Export CSV
            </Button>
            <Button variant="secondary" leftIcon={<Zap className="w-4 h-4" />}>
              Optimize
            </Button>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">
            Loading & Async States
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button isLoading>Loading State</Button>
            <Button
              variant="secondary"
              isLoading={loading}
              onClick={handleAsyncAction}
            >
              {loading ? "Processing..." : "Click to Start Async"}
            </Button>
            <Button variant="outline" isLoading>
              Processing
            </Button>
            <IconButton
              icon={<Check className="w-5 h-5" />}
              isLoading
              variant="outline"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            The <code>isLoading</code> prop automatically disables the button
            and replaces any icons with a spinner.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">Minimal / Ghost</h2>
          <div className="flex flex-wrap gap-6">
            <IconButton icon={<Bell className="w-5 h-5" />} variant="ghost" />
            <IconButton
              icon={<Settings className="w-5 h-5" />}
              variant="ghost"
            />
            <IconButton icon={<Search className="w-5 h-5" />} variant="ghost" />
            <IconButton
              icon={<Download className="w-5 h-5" />}
              variant="ghost"
            />
            <IconButton
              icon={<Trash2 className="w-5 h-5" />}
              variant="ghost"
              className="text-destructive hover:bg-destructive/10"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Ghost variants have no background or border in their default state,
            making them perfect for low-priority actions or clean headers.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">Icon Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <IconButton icon={<Bell className="w-5 h-5" />} variant="outline" />
            <IconButton
              icon={<Settings className="w-5 h-5" />}
              variant="secondary"
            />
            <IconButton icon={<Search className="w-5 h-5" />} />
            <IconButton
              icon={<Check className="w-5 h-5" />}
              className="rounded-full bg-green-500 text-white"
            />
          </div>
        </section>
        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">
            Floating Action Button
          </h2>
          <div className="p-12 bg-accent/20 rounded-4xl border-2 border-dashed border-primary/20 flex flex-col items-center justify-center gap-8 relative overflow-hidden min-h-[400px]">
            <div className="text-center space-y-2">
              <h3 className="font-bold">Speed Dial Interface</h3>
              <p className="text-sm text-muted-foreground">
                Click the FAB in the corner to see multi-action transitions.
              </p>
            </div>

            <FAB
              position="bottom-right"
              actions={[
                {
                  icon: <UserPlus className="w-5 h-5" />,
                  label: "Add User",
                  onClick: () => success("User addition triggered", "Add User"),
                },
                {
                  icon: <FileText className="w-5 h-5" />,
                  label: "New Report",
                  onClick: () => info("Drafting new report...", "New Report"),
                },
                {
                  icon: <Settings className="w-5 h-5" />,
                  label: "Settings",
                  onClick: () => info("Opening configuration...", "Settings"),
                },
              ]}
              className="absolute right-8! bottom-8!"
            />

            <FAB
              position="bottom-left"
              icon={<Send className="w-6 h-6" />}
              onClick={() =>
                success("Message sent successfully!", "Direct Action")
              }
              className="absolute left-8! bottom-8!"
            />
          </div>
        </section>
        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">
            FAB Positions & Smart Layouts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 bg-accent/5 border-dashed relative min-h-[400px] overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-xs font-black uppercase tracking-widest opacity-20 -rotate-45">
                  FAB Positions Playground
                </span>
              </div>

              {/* Bottom Right - Actions Up, Labels Left */}
              <FAB
                position="bottom-right"
                actions={[
                  { icon: <Plus />, label: "Create New", onClick: () => {} },
                  { icon: <FileText />, label: "New Draft", onClick: () => {} },
                  { icon: <Download />, label: "Export Data", onClick: () => {} },
                ]}
                className="absolute! bottom-8! right-8!"
              />

              {/* Bottom Left - Actions Up, Labels Right */}
              <FAB
                position="bottom-left"
                actions={[
                  { icon: <Cloud />, label: "Sync Now", onClick: () => {} },
                  { icon: <Share2 />, label: "Share Link", onClick: () => {} },
                  { icon: <Bell />, label: "Notifications", onClick: () => {} },
                ]}
                className="absolute! bottom-8! left-8!"
              />

              {/* Bottom Center - Actions Up, Labels Centered */}
              <FAB
                position="bottom-center"
                actions={[
                  { icon: <Plus />, label: "Quick Add", onClick: () => {} },
                  { icon: <Settings />, label: "Preferences", onClick: () => {} },
                  { icon: <Plus />, label: "Favorites", onClick: () => {} },
                ]}
                className="absolute! bottom-8! left-1/2! -translate-x-1/2!"
              />
            </Card>

            <Card className="p-8 bg-accent/5 border-dashed relative min-h-[400px] overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-xs font-black uppercase tracking-widest opacity-20 rotate-45">
                  Top Positions
                </span>
              </div>

              {/* Top Right - Actions Down, Labels Left */}
              <FAB
                position="top-right"
                actions={[
                  { icon: <Bell />, label: "Notify All", onClick: () => {} },
                  { icon: <Plus />, label: "Invite User", onClick: () => {} },
                  { icon: <Send />, label: "Direct Message", onClick: () => {} },
                ]}
                className="absolute! top-8! right-8!"
              />

              {/* Top Left - Actions Down, Labels Right */}
              <FAB
                position="top-left"
                actions={[
                  { icon: <Search />, label: "Global Search", onClick: () => {} },
                  { icon: <Plus />, label: "New Project", onClick: () => {} },
                  { icon: <FileText />, label: "Docs", onClick: () => {} },
                ]}
                className="absolute! top-8! left-8!"
              />

              {/* Top Center - Actions Down, Labels Centered */}
              <FAB
                position="top-center"
                actions={[
                  { icon: <Plus />, label: "Add Entry", onClick: () => {} },
                  { icon: <Plus />, label: "Schedule", onClick: () => {} },
                  { icon: <Plus />, label: "History", onClick: () => {} },
                ]}
                className="absolute! top-8! left-1/2! -translate-x-1/2!"
              />
            </Card>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Notice how labels and stack directions <b>automatically adjust</b>{" "}
            to prevent clipping. When on the right, labels shift left. When at
            the bottom, actions stack upward.
          </p>
        </section>
      </PageContent>
    </PageLayout>
  );
}
