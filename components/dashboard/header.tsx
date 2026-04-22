"use client";

import * as React from "react";
import { Search, Bell, Menu, User, Settings } from "lucide-react";
import { cn } from "@/components/ui/button";
import { SettingsPanel } from "./settings-panel";
import { Badge } from "@/components/ui/badge";
import { IconButton } from "@/components/ui/icon-button";
import { Popover } from "@/components/ui/popover";

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
  { id: 1, title: "New Message", message: "You have a new message from Alex.", time: "2m ago", unread: true },
  { id: 2, title: "System Update", message: "Dashboard v1.3 is now available.", time: "1h ago", unread: true },
  { id: 3, title: "Server Alert", message: "High CPU usage detected on Node-1.", time: "5h ago", unread: false },
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

  return (
    <>
      <header className="h-16 border-b bg-card/80 backdrop-blur-xl px-4 flex items-center justify-between sticky top-0 z-40">
        {/* Left Side */}
        <div className="flex items-center gap-4 flex-1">
          <button className="md:hidden p-2 rounded-lg hover:bg-accent">
            <Menu className="w-5 h-5" />
          </button>

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
        {centerSlot && (
          <div className="flex-1 flex justify-center">{centerSlot}</div>
        )}

        {/* Right Side */}
        <div
          className={cn(
            "flex items-center gap-3",
            centerSlot ? "flex-1 justify-end" : "",
          )}
        >
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
                  <h4 className="font-black text-sm uppercase tracking-tight">Notifications</h4>
                  <Badge count={2} variant="primary" />
                </div>
                <div className="space-y-1 max-h-80 overflow-y-auto -mx-2 px-2 custom-scrollbar">
                  {notifications.map((n) => (
                    <button 
                      key={n.id}
                      className="w-full text-left p-3 rounded-2xl hover:bg-accent transition-colors group relative"
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className={cn("text-xs font-bold", n.unread ? "text-foreground" : "text-muted-foreground")}>
                            {n.title}
                          </span>
                          <span className="text-[10px] text-muted-foreground">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                          {n.message}
                        </p>
                      </div>
                      {n.unread && (
                        <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </button>
                  ))}
                </div>
                <button className="w-full py-2 text-xs font-bold text-primary hover:underline transition-all">
                  View all notifications
                </button>
              </div>
            </Popover>
          )}

          {showSettings && (
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2.5 rounded-xl hover:bg-accent text-muted-foreground hover:text-foreground transition-all"
            >
              <Settings className="w-5 h-5" />
            </button>
          )}

          {(showNotifications || showSettings) && showUser && (
            <div className="h-8 w-px bg-border mx-1" />
          )}

          {showUser && (
            <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-2xl hover:bg-accent transition-all group">
              <div className="flex-col items-end hidden lg:flex">
                <span className="text-xs font-bold leading-none">
                  Alex Rivera
                </span>
                <span className="text-[10px] text-muted-foreground mt-1">
                  Admin Account
                </span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                <div className="w-full h-full bg-linear-to-br from-primary to-primary/40 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
            </button>
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
