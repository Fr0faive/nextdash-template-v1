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
import { Popover } from "@/components/ui/popover";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href?: string;
  children?: { label: string; href: string; icon?: React.ElementType }[];
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
  onItemClick,
}: {
  item: NavItem;
  isCollapsed: boolean;
  onItemClick?: () => void;
}) {
  const pathname = usePathname();
  const hasChildren = !!item.children;
  const Icon = item.icon;

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
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        isCollapsed && "h-11 w-11 mx-auto flex items-center justify-center",
      )}
    >
      <Icon
        className={cn(
          "w-5 h-5 shrink-0 transition-colors",
          isActive ? "text-primary" : "group-hover:text-primary",
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

  const childMenu = (
    <div className={cn("space-y-1", isCollapsed ? "" : "pl-11 pr-2 py-1")}>
      {item.children?.map((child) => {
        const ChildIcon = child.icon;
        return (
          <Link
            key={child.label}
            href={child.href}
            onClick={onItemClick}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors",
              pathname === child.href
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-accent",
            )}
          >
            {ChildIcon && <ChildIcon className="w-3.5 h-3.5" />}
            {child.label}
          </Link>
        );
      })}
    </div>
  );

  if (isCollapsed && hasChildren) {
    return (
      <Popover
        side="right"
        align="start"
        width="w-fit"
        className="block"
        trigger={content}
        triggerAction="hover"
        useMobileOverlay={false}
      >
        <div className="space-y-3">
          <div className="px-3 py-1 border-b">
            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
              {item.label}
            </span>
          </div>
          {childMenu}
        </div>
      </Popover>
    );
  }

  return (
    <div className="space-y-1">
      {item.href ? (
        <Link href={item.href} onClick={onItemClick}>
          {content}
        </Link>
      ) : (
        <div onClick={() => mounted && setIsOpen(!isOpen)}>{content}</div>
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
            {childMenu}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Sidebar() {
  const { isCollapsed, toggleSidebar, isMobileOpen, setIsMobileOpen } =
    useSidebar();
  const pathname = usePathname();

  // Close mobile sidebar when route changes
  React.useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname, setIsMobileOpen]);

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 md:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          "fixed left-0 top-0 bottom-0 z-50 flex flex-col bg-card border-r transition-all duration-300 ease-in-out",
          isCollapsed ? "w-20" : "w-64",
          "md:translate-x-0",
          isMobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full",
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
            <SidebarItem
              key={item.label}
              item={item}
              isCollapsed={isCollapsed}
              onItemClick={() => setIsMobileOpen(false)}
            />
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

        {/* Toggle Button (Hidden on mobile) */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-20 w-6 h-6 bg-card border rounded-full hidden md:flex items-center justify-center hover:bg-accent shadow-sm z-50 transition-transform active:scale-90"
        >
          {isCollapsed ? (
            <ChevronRight className="w-3 h-3" />
          ) : (
            <ChevronLeft className="w-3 h-3" />
          )}
        </button>
      </aside>
    </>
  );
}
