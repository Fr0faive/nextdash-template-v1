"use client";

import * as React from "react";
import { Search, Bell, Menu, User, Settings } from "lucide-react";
import { cn } from "@/components/ui/button";
import { SettingsPanel } from "./settings-panel";
import { Badge } from "@/components/ui/badge";
import { IconButton } from "@/components/ui/icon-button";
import { Popover } from "@/components/ui/popover";
import { useSidebar } from "@/components/providers/sidebar-provider";

interface HeaderProps {
  // Toggles for built-in components
  showSearch?: boolean;
  showNotifications?: boolean;
  showSettings?: boolean;
  showUser?: boolean;

  // Slots for custom content
  leftSlot?: React.ReactNode;
  centerSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

const notifications = [
  {
    id: 1,
    title: "New Message",
    message: "You have a new message from Alex.",
    time: "2m ago",
    unread: true,
  },
  {
    id: 2,
    title: "System Update",
    message: "Dashboard v1.3 is now available.",
    time: "1h ago",
    unread: true,
  },
  {
    id: 3,
    title: "Server Alert",
    message: "High CPU usage detected on Node-1.",
    time: "5h ago",
    unread: false,
  },
];

export function Header({
  showSearch = true,
  showNotifications = true,
  showSettings = true,
  showUser = true,
  leftSlot,
  centerSlot,
  rightSlot,
}: HeaderProps) {
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const { toggleMobileSidebar } = useSidebar();

  return (
    <>
      <header className="h-16 border-b bg-card/80 backdrop-blur-xl px-4 flex items-center justify-between sticky top-0 z-40">
        {/* Left Side */}
        <div className="flex items-center gap-4 flex-1">
          <div className="md:hidden">
            <IconButton 
              icon={<Menu className="w-5 h-5" />} 
              variant="ghost" 
              onClick={toggleMobileSidebar}
              className="text-muted-foreground hover:text-foreground"
            />
          </div>

          {leftSlot}

          {showSearch && (
            <div className="relative group hidden sm:block max-w-md w-full ml-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <input
                type="text"
                placeholder="Search dashboard..."
                className="w-full bg-accent/40 border-transparent focus:border-primary/20 focus:bg-background rounded-2xl py-2 pl-10 pr-4 text-sm focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded border bg-background text-[10px] font-medium text-muted-foreground pointer-events-none hidden md:block">
                ⌘K
              </kbd>
            </div>
          )}
        </div>

        {/* Center Slot */}
        <div className="flex-1 flex justify-center">{centerSlot}</div>

        {/* Right Side */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          {rightSlot}

          {showNotifications && (
            <Popover
              side="bottom"
              align="end"
              width="w-80"
              trigger={
                <Badge variant="dot" color="primary">
                  <IconButton
                    icon={<Bell className="w-5 h-5" />}
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground"
                  />
                </Badge>
              }
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-sm uppercase tracking-tight">
                    Notifications
                  </h4>
                  <Badge count={2} variant="primary" />
                </div>
                <div className="space-y-1 max-h-80 overflow-y-auto -mx-2 px-2 custom-scrollbar">
                  {notifications.map((n) => (
                    <button
                      key={n.id}
                      className="w-full text-left p-3 rounded-2xl hover:bg-accent transition-colors group relative"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span
                            className={cn(
                              "text-xs font-bold",
                              n.unread
                                ? "text-foreground"
                                : "text-muted-foreground",
                            )}
                          >
                            {n.title}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            {n.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                          {n.message}
                        </p>
                      </div>
                      {n.unread && (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                      )}
                    </button>
                  ))}
                </div>
                <button className="w-full py-2 text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary/80 transition-colors border-t">
                  View All Notifications
                </button>
              </div>
            </Popover>
          )}

          {showSettings && (
            <IconButton
              icon={<Settings className="w-5 h-5" />}
              variant="ghost"
              onClick={() => setIsSettingsOpen(true)}
              className="text-muted-foreground hover:text-foreground"
            />
          )}

          {showUser && (
            <div className="flex items-center gap-3 pl-2 border-l ml-2">
              <div className="hidden lg:block text-right">
                <div className="text-xs font-bold">John Doe</div>
                <div className="text-[10px] text-muted-foreground">
                  Administrator
                </div>
              </div>
              <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center border-2 border-background shadow-sm hover:ring-2 hover:ring-primary/20 transition-all cursor-pointer">
                <User className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          )}
        </div>
      </header>

      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
}
