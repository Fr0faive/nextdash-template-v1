"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Zap,
  Layout,
  Activity,
  Box,
  BookOpen,
  ChevronRight,
  MessageSquare,
  Bell,
  Settings,
  User,
  Shield,
  Info,
  Clock,
  CheckCircle2,
  AlertCircle,
  Copy,
  Terminal,
  Home,
  Plus,
  Trash2,
  Mail,
  Lock,
  Phone,
  MoreHorizontal,
  ChevronLeft,
  Calendar,
  FileText,
  Download,
  Upload,
  Image as ImageIcon,
  Search,
  Filter,
  Eye,
  Check,
  List,
  CreditCard,
  PieChart,
  Layers,
  Sliders,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
  Monitor,
  Menu,
  AlertTriangle,
  FileCode,
  UserPlus,
  Fingerprint,
  Hash,
  Globe,
} from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { Accordion } from "@/components/ui/accordion";
import { Popover } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Radio, RadioGroup } from "@/components/ui/radio";
import { Modal } from "@/components/ui/modal";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { Chip } from "@/components/ui/chip";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Alert } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Pagination } from "@/components/ui/pagination";
import { Tooltip } from "@/components/ui/tooltip";
import { Loading } from "@/components/ui/loading";
import { FAB } from "@/components/ui/fab";
import { Timeline } from "@/components/ui/timeline";
import { Select } from "@/components/ui/select";
import { Chart } from "@/components/ui/chart";
import { 
  Menu as DropdownMenu, 
  MenuItem, 
  MenuLabel, 
  MenuSeparator 
} from "@/components/ui/menu";

import { useToast } from "@/components/providers/toast-provider";
import { cn } from "@/components/ui/button";

export default function DocsPage() {
  const [activeCategory, setActiveCategory] = React.useState("general");
  const { success, error, info, warning } = useToast();

  // State for interactive components
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("one");
  const [switchState, setSwitchState] = React.useState(true);
  const [radioValue, setRadioValue] = React.useState("option1");
  const [selectValue, setSelectValue] = React.useState("apple");

  const categories = [
    { id: "general", label: "General", icon: BookOpen },
    { id: "buttons", label: "Buttons & Navigation", icon: Zap },
    { id: "disclosure", label: "Disclosure & Overlays", icon: Layout },
    { id: "data", label: "Data & Visualization", icon: Layers },
    { id: "forms", label: "Forms & Inputs", icon: Box },
    { id: "feedback", label: "Feedback & Status", icon: Activity },
  ];

  const CodeBlock = ({ code }: { code: string }) => (
    <div className="group relative mt-4">
      <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <IconButton
          icon={<Copy className="w-4 h-4" />}
          variant="ghost"
          size="sm"
          className="bg-zinc-900/50 backdrop-blur-md border border-white/10"
          onClick={() => {
            navigator.clipboard.writeText(code);
            success("Code copied to clipboard");
          }}
        />
      </div>
      <pre className="bg-zinc-950 text-zinc-300 p-6 rounded-3xl overflow-x-auto font-mono text-[13px] leading-relaxed border border-white/5 scrollbar-hide">
        <code>{code}</code>
      </pre>
    </div>
  );

  const SectionHeader = ({
    title,
    description,
  }: {
    title: string;
    description?: string;
  }) => (
    <div className="space-y-2 mb-8 border-l-4 border-primary pl-6 py-1">
      <h2 className="text-3xl font-black tracking-tight uppercase">{title}</h2>
      {description && (
        <p className="text-muted-foreground font-medium text-lg">
          {description}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <LayoutDashboard className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-black tracking-tight leading-none">
                NextDash
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                Documentation v1.0
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex bg-accent/50 rounded-2xl p-1 border">
              <Button
                variant="ghost"
                size="sm"
                className="px-4 h-8 text-[11px] font-black uppercase tracking-widest bg-background shadow-sm"
              >
                Components
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="px-4 h-8 text-[11px] font-black uppercase tracking-widest opacity-50"
              >
                Guides
              </Button>
            </div>
            <div className="w-px h-8 bg-border mx-2 hidden md:block" />
            <a 
              href="https://github.com/Fr0faive/nextdash-template-v1" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button
                variant="primary"
                size="sm"
                className="h-10 rounded-xl px-6 font-bold"
              >
                Download
              </Button>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Navigation Sidebar */}
          <aside className="w-full lg:w-72 shrink-0 space-y-8">
            <div className="sticky top-32">
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all group",
                      activeCategory === cat.id
                        ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-[1.02]"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    )}
                  >
                    <cat.icon
                      className={cn(
                        "w-4 h-4 shrink-0 transition-transform group-hover:scale-110",
                        activeCategory === cat.id
                          ? "text-primary-foreground"
                          : "text-primary",
                      )}
                    />
                    <span className="flex-1 text-left">{cat.label}</span>
                    {activeCategory === cat.id && (
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-8 p-6 rounded-4xl bg-linear-to-br from-primary/10 to-primary/5 border border-primary/10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                    <Zap className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest">
                    Premium Support
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                  Get exclusive access to our private community and 24/7
                  technical assistance.
                </p>
                <Button
                  variant="outline"
                  className="w-full h-10 text-[10px] uppercase font-black tracking-widest bg-background/50"
                >
                  Join Discord
                </Button>
              </div>
            </div>
          </aside>

          {/* Content Area */}
          <div className="flex-1 min-w-0 pb-24">
            {activeCategory === "general" && (
              <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="space-y-6">
                  <Badge
                    variant="primary"
                    className="px-4 py-1.5 text-[10px] uppercase font-black tracking-[0.2em]"
                  >
                    Getting Started
                  </Badge>
                  <h2 className="text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                    The Professional
                    <br />
                    <span className="text-primary">Dashboard</span> Template
                  </h2>
                  <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl font-medium">
                    Build stunning, high-performance dashboards with our
                    enterprise-grade component library. Optimized for Next.js
                    15+ and Tailwind CSS 4.0.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      icon: Zap,
                      title: "Ultra Fast",
                      text: "Zero-bundle overhead components optimized for LCP.",
                    },
                    {
                      icon: Shield,
                      title: "Secure",
                      text: "Best-in-class security patterns for auth and data.",
                    },
                    {
                      icon: Layout,
                      title: "Modular",
                      text: "Easily swap, extend, and customize every element.",
                    },
                  ].map((feat, i) => (
                    <Card
                      key={i}
                      padding="xl"
                      className="group hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:rotate-6 transition-all duration-300">
                        <feat.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                      </div>
                      <h3 className="text-lg font-black mb-2">{feat.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feat.text}
                      </p>
                    </Card>
                  ))}
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-black">Architecture</h3>
                  <div className="prose prose-zinc dark:prose-invert max-w-none">
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      NextDash uses a{" "}
                      <span className="text-foreground font-bold">
                        Compound Component
                      </span>{" "}
                      pattern where appropriate, ensuring maximum flexibility
                      while maintaining a clean API. Every component is fully
                      typed and supports Tailwind's arbitrary values.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeCategory === "buttons" && (
              <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <SectionHeader
                  title="Buttons & Navigation"
                  description="Interactive elements to trigger actions and navigate through the app."
                />

                <div className="space-y-12">
                  <div className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-primary">
                      Standard Buttons
                    </h3>
                    <Card className="p-8 space-y-8 bg-accent/5 border-dashed">
                      <div className="flex flex-wrap gap-4 items-center">
                        <Button variant="primary">Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="destructive">Destructive</Button>
                      </div>
                      <div className="flex flex-wrap gap-4 items-center">
                        <Button variant="primary" size="sm">
                          Small
                        </Button>
                        <Button variant="primary" size="md">
                          Medium
                        </Button>
                        <Button variant="primary" size="lg">
                          Large
                        </Button>
                        <Button variant="primary" isLoading>
                          Loading State
                        </Button>
                      </div>
                      <CodeBlock
                        code={`// Standard Buttons
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>

// Sizes & States
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button isLoading>Loading State</Button>`}
                      />
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-primary">
                      Icon & Action Buttons
                    </h3>
                    <Card className="p-8 space-y-8 bg-accent/5 border-dashed">
                      <div className="flex flex-wrap gap-6 items-center">
                        <IconButton icon={<Bell />} variant="primary" />
                        <IconButton icon={<Settings />} variant="outline" />
                        <IconButton
                          icon={<Plus />}
                          variant="ghost"
                          className="bg-primary/10 text-primary"
                        />
                        <FAB icon={<Plus />} />
                      </div>
                      <CodeBlock
                        code={`// Icon Button
<IconButton icon={<Bell />} variant="primary" />
<IconButton icon={<Settings />} variant="outline" />

// Floating Action Button
<FAB icon={<Plus />} />`}
                      />
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-primary">
                      Dropdown Menus
                    </h3>
                    <Card className="p-8 space-y-8 bg-accent/5 border-dashed">
                      <div className="flex flex-wrap gap-4 items-center">
                        <DropdownMenu
                          trigger={<Button variant="outline">Options Menu</Button>}
                          align="start"
                        >
                          <MenuLabel>User Actions</MenuLabel>
                          <MenuItem icon={<User />} label="View Profile" rightElement="⌘P" />
                          <MenuItem icon={<Settings />} label="Settings" rightElement="⌘S" />
                          <MenuSeparator />
                          <MenuLabel>Danger Zone</MenuLabel>
                          <MenuItem icon={<Trash2 />} label="Delete Account" variant="destructive" />
                        </DropdownMenu>

                        <DropdownMenu
                          trigger={<IconButton icon={<MoreHorizontal />} variant="ghost" />}
                        >
                          <MenuItem icon={<Copy />} label="Copy Link" />
                          <MenuItem icon={<Plus />} label="Add to List" />
                          <MenuSeparator />
                          <MenuItem icon={<LogOut />} label="Sign Out" />
                        </DropdownMenu>
                      </div>
                      <CodeBlock
                        code={`// Dropdown Menu usage
<DropdownMenu 
  trigger={<Button>Options</Button>}
  align="start"
>
  <MenuLabel>Title</MenuLabel>
  <MenuItem icon={<User />} label="Profile" />
  <MenuSeparator />
  <MenuItem icon={<Trash />} label="Delete" variant="destructive" />
</DropdownMenu>`}
                      />
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-primary">
                      Breadcrumbs & Pagination
                    </h3>
                    <Card className="p-8 space-y-8 bg-accent/5 border-dashed">
                      <Breadcrumb
                        items={[
                          { label: "Home", href: "/", icon: <Home className="w-3 h-3" /> },
                          { label: "Settings", href: "/settings" },
                          { label: "Profile", active: true },
                        ]}
                      />
                      <Pagination
                        currentPage={1}
                        totalPages={10}
                        onPageChange={() => {}}
                      />
                      <CodeBlock
                        code={`// Breadcrumb with icons
<Breadcrumb 
  items={[
    { label: "Home", href: "/", icon: <Home className="w-3 h-3" /> },
    { label: "Settings", href: "/settings" },
    { label: "Profile", active: true }
  ]} 
/>

// Pagination
<Pagination 
  currentPage={1} 
  totalPages={10} 
  onPageChange={(page) => console.log(page)} 
/>`}
                      />
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {activeCategory === "disclosure" && (
              <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <SectionHeader
                  title="Disclosure & Overlays"
                  description="Components for handling additional content and user interaction layers."
                />

                <div className="space-y-12">
                  <div className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-primary">
                      Tabs & Accordion
                    </h3>
                    <Card className="p-8 space-y-8 bg-accent/5 border-dashed">
                      <Tabs
                        activeTab={activeTab}
                        onChange={setActiveTab}
                        tabs={[
                          { id: "one", label: "Profile", icon: <User /> },
                          { id: "two", label: "Security", icon: <Shield /> },
                          {
                            id: "three",
                            label: "Billing",
                            icon: <CreditCard />,
                          },
                        ]}
                      />
                      <Accordion
                        items={[
                          {
                            id: "a1",
                            title: "Can I use it for commercial projects?",
                            content:
                              "Yes, our license allows for unlimited commercial applications.",
                          },
                          {
                            id: "a2",
                            title: "Do you offer refunds?",
                            content:
                              "We offer a 30-day money back guarantee if you're not satisfied.",
                          },
                        ]}
                      />
                      <CodeBlock
                        code={`// Tabs usage
<Tabs 
  activeTab={activeTab} 
  onChange={setActiveTab}
  tabs={[
    { id: "one", label: "Profile", icon: <User /> },
    { id: "two", label: "Security", icon: <Shield /> }
  ]} 
/>

// Accordion usage
<Accordion 
  items={[
    { id: "a1", title: "Question?", content: "Answer here." }
  ]} 
/>`}
                      />
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-primary">
                      Popover & Tooltips
                    </h3>
                    <Card className="p-8 space-y-8 bg-accent/5 border-dashed">
                      <div className="flex gap-6 items-center">
                        <Popover
                          trigger={
                            <Button variant="outline">Options Popover</Button>
                          }
                          side="top"
                          align="center"
                        >
                          <div className="p-2 space-y-2 min-w-40">
                            <button className="w-full text-left px-3 py-2 rounded-xl hover:bg-accent text-sm font-bold flex items-center gap-2">
                              <Eye className="w-4 h-4 text-primary" /> View
                              Details
                            </button>
                            <button className="w-full text-left px-3 py-2 rounded-xl hover:bg-accent text-sm font-bold flex items-center gap-2">
                              <Trash2 className="w-4 h-4 text-destructive" />{" "}
                              Delete Item
                            </button>
                          </div>
                        </Popover>

                        <Tooltip content="Quick actions available">
                          <IconButton
                            icon={<MoreHorizontal />}
                            variant="ghost"
                          />
                        </Tooltip>
                      </div>
                      <CodeBlock
                        code={`// Popover usage
<Popover 
  trigger={<Button variant="outline">Open Popover</Button>}
  side="top"
  align="center"
>
  <div className="p-2">Popover Content</div>
</Popover>

// Tooltip usage
<Tooltip content="Quick actions available">
  <IconButton icon={<MoreHorizontal />} variant="ghost" />
</Tooltip>`}
                      />
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-primary">
                      Modal Overlay
                    </h3>
                    <Card className="p-8 bg-accent/5 border-dashed">
                      <Button onClick={() => setIsModalOpen(true)}>
                        Launch Large Modal
                      </Button>
                      <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        title="Confirm Action"
                        description="Are you sure you want to proceed with this configuration?"
                      >
                        <div className="py-4 space-y-4">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            This action will permanently update your global
                            settings and cannot be undone without manual
                            intervention.
                          </p>
                          <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 flex gap-3 items-start">
                            <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
                            <p className="text-xs text-destructive font-bold">
                              Important: High risk operation detected.
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-4 border-t">
                          <Button
                            variant="ghost"
                            onClick={() => setIsModalOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button variant="primary">
                            Yes, Update Settings
                          </Button>
                        </div>
                      </Modal>
                      <CodeBlock
                        code={`// Modal usage
<Modal 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)}
  title="Modal Title"
>
  <div>Modal body content goes here.</div>
</Modal>`}
                      />
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {activeCategory === "data" && (
              <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <SectionHeader
                  title="Data & Visualization"
                  description="Visualize information clearly with tables, charts, and lists."
                />

                <div className="space-y-12">
                  <div className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-primary">
                      Interactive Charting
                    </h3>
                    <Card className="p-8 bg-accent/5 border-dashed overflow-hidden">
                      <Chart
                        type="area"
                        height={300}
                        series={[
                          {
                            name: "Revenue",
                            data: [31, 40, 28, 51, 42, 109, 100],
                          },
                          { name: "Users", data: [11, 32, 45, 32, 34, 52, 41] },
                        ]}
                        options={{
                          xaxis: {
                            categories: [
                              "Mon",
                              "Tue",
                              "Wed",
                              "Thu",
                              "Fri",
                              "Sat",
                              "Sun",
                            ],
                          },
                        }}
                      />
                      <CodeBlock
                        code={`<Chart 
  type="area" 
  series={[
    { name: "Revenue", data: [31, 40, 28, 51, 42, 109, 100] },
    { name: "Users", data: [11, 32, 45, 32, 34, 52, 41] }
  ]}
  options={{
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    }
  }}
/>`}
                      />
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-primary">
                      Data Tables
                    </h3>
                    <Card className="overflow-hidden bg-accent/5 border-dashed">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Activity</TableHead>
                            <TableHead className="text-right">Score</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[
                            {
                              name: "Alex Rivera",
                              status: "Active",
                              score: 98,
                              role: "Admin",
                            },
                            {
                              name: "Sarah Chen",
                              status: "Busy",
                              score: 84,
                              role: "Dev",
                            },
                            {
                              name: "Tom Hardy",
                              status: "Idle",
                              score: 72,
                              role: "User",
                            },
                          ].map((user, i) => (
                            <TableRow key={i}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar
                                    fallback={user.name[0]}
                                    src={`https://i.pravatar.cc/100?u=${i}`}
                                  />
                                  <div>
                                    <div className="font-bold">{user.name}</div>
                                    <div className="text-[10px] text-muted-foreground">
                                      {user.role}
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={user.status}
                                  color={
                                    i === 0
                                      ? "success"
                                      : i === 1
                                        ? "warning"
                                        : "primary"
                                  }
                                  variant="soft"
                                />
                              </TableCell>
                              <TableCell>
                                <ProgressBar value={user.score} />
                              </TableCell>
                              <TableCell className="text-right font-mono font-bold">
                                {user.score}%
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-primary">
                      Timeline & Status
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="p-8 bg-accent/5 border-dashed">
                        <Timeline
                          items={[
                            {
                              title: "Project Initiated",
                              time: "Jan 12",
                              description: "Team Kickoff Meeting",
                              icon: <CheckCircle2 />,
                            },
                            {
                              title: "Design Phase",
                              time: "Jan 18",
                              description: "UI/UX Mockups Ready",
                              icon: <Clock />,
                            },
                            {
                              title: "Development",
                              time: "Present",
                              description: "Building core logic",
                              icon: <Activity />,
                            },
                          ]}
                        />
                      </Card>
                      <Card className="p-8 flex flex-col justify-center gap-6 bg-accent/5 border-dashed">
                        <div className="flex flex-wrap gap-4">
                          <Badge variant="primary" count={12}>
                            Notifications
                          </Badge>
                          <Badge variant="destructive" count={99}>
                            Alerts
                          </Badge>
                          <Badge variant="dot" color="success">
                            System Live
                          </Badge>
                        </div>
                        <div className="space-y-4">
                          <Skeleton className="h-4 w-[80%] rounded-full" />
                          <Skeleton className="h-4 w-[60%] rounded-full opacity-60" />
                          <Skeleton className="h-20 w-full rounded-3xl opacity-40" />
                        </div>
                      </Card>
                    </div>
                    <CodeBlock
                      code={`// Timeline usage
<Timeline 
  items={[
    { title: "Step 1", time: "Jan 12", description: "Details..." }
  ]} 
/>

// Badge variants
<Badge variant="primary" count={12}>Text</Badge>
<Badge variant="dot" color="success">System Live</Badge>`}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeCategory === "forms" && (
              <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <SectionHeader
                  title="Forms & Inputs"
                  description="Comprehensive input system for capturing user data with validation."
                />

                <div className="space-y-12">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-sm font-black uppercase tracking-widest text-primary">
                        Input Types
                      </h3>
                      <Card className="p-8 space-y-6 bg-accent/5 border-dashed">
                        <Input
                          label="Full Name"
                          placeholder="John Doe"
                          leftIcon={<User />}
                        />
                        <Input
                          label="Email Address"
                          type="email"
                          placeholder="john@example.com"
                          leftIcon={<Mail />}
                        />
                        <Select
                          label="Preferred Framework"
                          value={selectValue}
                          onChange={setSelectValue}
                          options={[
                            { label: "Next.js", value: "next" },
                            { label: "React", value: "react" },
                            { label: "Vue.js", value: "vue" },
                          ]}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            label="Date"
                            type="date"
                            rightIcon={<Calendar />}
                          />
                          <Input label="Time" type="time" />
                        </div>
                      </Card>
                      <CodeBlock
                        code={`// Input with icons
<Input label="Full Name" leftIcon={<User />} placeholder="Placeholder" />

// Select usage
<Select 
  label="Framework"
  options={[
    { label: "Next.js", value: "next" },
    { label: "React", value: "react" }
  ]}
/>`}
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-sm font-black uppercase tracking-widest text-primary">
                        Selections & Switches
                      </h3>
                      <Card className="p-8 space-y-8 bg-accent/5 border-dashed">
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-background border">
                          <div className="space-y-0.5">
                            <div className="text-sm font-bold">
                              Email Notifications
                            </div>
                            <div className="text-[10px] text-muted-foreground font-medium">
                              Receive updates via email.
                            </div>
                          </div>
                          <Switch
                            checked={switchState}
                            onChange={(e) => setSwitchState(e.target.checked)}
                          />
                        </div>

                        <div className="space-y-3">
                          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                            Privacy Mode
                          </label>
                          <RadioGroup
                            value={radioValue}
                            onChange={setRadioValue}
                            className="space-y-2"
                          >
                            <Radio
                              id="r1"
                              value="option1"
                              label="Public Access"
                            />
                            <Radio
                              id="r2"
                              value="option2"
                              label="Private (Restricted)"
                            />
                          </RadioGroup>
                        </div>

                        <div className="flex flex-col gap-3">
                          <Checkbox
                            id="c1"
                            label="I agree to the terms and conditions"
                            checked={true}
                          />
                          <Checkbox
                            id="c2"
                            label="Sign me up for the newsletter"
                          />
                        </div>
                      </Card>
                      <CodeBlock
                        code={`// Switch usage
<Switch checked={checked} onChange={(e) => setChecked(e.target.checked)} />

// Radio Group usage
<RadioGroup value={value} onChange={setValue}>
  <Radio value="opt1" label="Option 1" />
  <Radio value="opt2" label="Option 2" />
</RadioGroup>

// Checkbox usage
<Checkbox label="Remember me" checked={true} />`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeCategory === "feedback" && (
              <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <SectionHeader
                  title="Feedback & Status"
                  description="Inform users about system state and background operations."
                />

                <div className="space-y-12">
                  <div className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-primary">
                      Alerts & Messages
                    </h3>
                    <Card className="p-8 space-y-6 bg-accent/5 border-dashed">
                      <Alert
                        variant="info"
                        title="Scheduled Maintenance"
                        description="System will be down for 2 hours on Sunday."
                      />
                      <Alert
                        variant="destructive"
                        title="Critical Error"
                        description="Failed to synchronize data with the cloud."
                      />
                      <Alert
                        variant="success"
                        title="Project Completed"
                        description="All deliverables have been approved."
                      />
                      <CodeBlock
                        code={`// Alert usage
<Alert 
  variant="info" 
  title="Update" 
  description="System is updated." 
/>`}
                      />
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-primary">
                      Interactive Toasts & Loaders
                    </h3>
                    <Card className="p-8 space-y-8 bg-accent/5 border-dashed">
                      <div className="flex flex-wrap gap-4">
                        <Button
                          variant="primary"
                          onClick={() =>
                            success("New profile saved successfully", "Success")
                          }
                        >
                          Launch Success
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() =>
                            error("Unable to process request", "Error")
                          }
                        >
                          Launch Error
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() =>
                            info("New version available", "Information")
                          }
                        >
                          Launch Info
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-12 items-center justify-center p-8 rounded-3xl bg-background border">
                        <div className="flex flex-col items-center gap-3">
                          <Loading size="lg" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            Spinner
                          </span>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                          <Loading size="lg" variant="ring" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            Ring
                          </span>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                          <Loading size="lg" variant="dots" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            Dots
                          </span>
                        </div>
                      </div>
                      <CodeBlock
                        code={`// Toast usage (from useToast hook)
const { success, error } = useToast();
success("Operation successful!");

// Loading variants
<Loading variant="spinner" />
<Loading variant="dots" />`}
                      />
                    </Card>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[1.25rem] bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <LayoutDashboard className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="text-left">
                <span className="block font-black text-2xl leading-none tracking-tight mb-1">
                  NextDash
                </span>
                <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">
                  Enterprise Template
                </span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-10 text-xs font-black uppercase tracking-widest text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                Components
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Layouts
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Guides
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Support
              </a>
            </div>

            <div className="text-center md:text-right">
              <p className="text-sm font-bold text-foreground">
                NextDash Framework
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                &copy; 2024 All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
