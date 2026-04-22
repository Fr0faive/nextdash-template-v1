"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  HelpCircle,
  ChevronDown,
  UserCircle,
  ShieldCheck,
  CreditCard,
  Zap,
  Table as TableIcon,
  Layout,
  CheckSquare,
  Activity,
} from "lucide-react";
import { useSidebar } from "@/components/providers/sidebar-provider";
import { cn } from "@/components/ui/button";

interface NavItem {
  icon: any;
  label: string;
  href?: string;
  children?: { label: string; href: string; icon?: any }[];
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  {
    icon: Users,
    label: "Customers",
    children: [
      { label: "All Customers", href: "/customers", icon: Users },
      { label: "Verified", href: "/customers/verified", icon: ShieldCheck },
    ],
  },
  { icon: ShoppingCart, label: "Orders", href: "/orders" },
  {
    icon: Settings,
    label: "Settings",
    children: [
      { label: "Profile", href: "/settings/profile", icon: UserCircle },
      { label: "Billing", href: "/settings/billing", icon: CreditCard },
    ],
  },
  {
    icon: HelpCircle,
    label: "Components",
    children: [
      { label: "Buttons", href: "/components/buttons", icon: Zap },
      { label: "Inputs", href: "/components/inputs", icon: UserCircle },
      { label: "Forms", href: "/components/forms", icon: CheckSquare },
      {
        label: "Data Display",
        href: "/components/data-display",
        icon: BarChart3,
      },
      {
        label: "Data Tables",
        href: "/components/data-tables",
        icon: TableIcon,
      },
      { label: "Overlays", href: "/components/overlays", icon: ShieldCheck },
      { label: "Disclosure", href: "/components/disclosure", icon: Layout },
      { label: "Charts", href: "/components/charts", icon: BarChart3 },
      { label: "Feedback", href: "/components/feedback", icon: Activity },
    ],
  },
];

function SidebarItem({
  item,
  isCollapsed,
}: {
  item: NavItem;
  isCollapsed: boolean;
}) {
  const pathname = usePathname();
  const hasChildren = !!item.children;

  // Check if any child is active
  const isChildActive = item.children?.some((child) => pathname === child.href);
  const isActive = item.href ? pathname === item.href : isChildActive;

  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (isChildActive) setIsOpen(true);
  }, [isChildActive]);

  const content = (
    <div
      className={cn(
        "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer",
        isActive && !hasChildren
          ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        isActive && hasChildren && "text-primary bg-primary/5",
      )}
    >
      <item.icon
        className={cn(
          "w-5 h-5 shrink-0 transition-colors",
          isActive && !hasChildren
            ? "text-primary-foreground"
            : "group-hover:text-primary",
          isActive && hasChildren && "text-primary",
        )}
      />
      {!isCollapsed && (
        <>
          <span className="truncate flex-1 animate-in slide-in-from-left-2 duration-300">
            {item.label}
          </span>
          {hasChildren && (
            <ChevronDown
              className={cn(
                "w-4 h-4 transition-transform duration-200",
                isOpen ? "rotate-180" : "",
              )}
            />
          )}
        </>
      )}
    </div>
  );

  return (
    <div className="space-y-1">
      {item.href ? (
        <Link href={item.href}>{content}</Link>
      ) : (
        <div onClick={() => mounted && !isCollapsed && setIsOpen(!isOpen)}>
          {content}
        </div>
      )}

      <AnimatePresence>
        {isOpen && hasChildren && !isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pl-11 pr-2 space-y-1 py-1">
              {item.children?.map((child) => (
                <Link
                  key={child.label}
                  href={child.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors",
                    pathname === child.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent",
                  )}
                >
                  {child.icon && <child.icon className="w-3.5 h-3.5" />}
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Sidebar() {
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 bottom-0 z-50 hidden md:flex flex-col bg-card border-r transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64",
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex items-center gap-2 p-6 mb-2",
          isCollapsed ? "justify-center px-0" : "",
        )}
      >
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20 transition-transform hover:scale-105">
          <LayoutDashboard className="w-6 h-6 text-primary-foreground" />
        </div>
        {!isCollapsed && (
          <span className="font-bold text-xl tracking-tight animate-in fade-in duration-500">
            NextDash
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => (
          <SidebarItem key={item.label} item={item} isCollapsed={isCollapsed} />
        ))}
      </nav>

      {/* Footer Actions */}
      <div className="p-3 border-t space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all">
          <HelpCircle className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span>Help Center</span>}
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all">
          <LogOut className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 w-6 h-6 bg-card border rounded-full flex items-center justify-center hover:bg-accent shadow-sm z-50 transition-transform active:scale-90"
      >
        {isCollapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </button>
    </aside>
  );
}
