"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Leaf,
  Plus,
  CheckSquare,
  StickyNote,
} from "lucide-react";
import { useState } from "react";
import { QuickActionDrawer } from "./quick-action-drawer";

const navItems = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/plants", label: "Plants", icon: Leaf },
  { href: "#add", label: "Add", icon: Plus, isAction: true },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/notes", label: "Notes", icon: StickyNote },
];

export function BottomNav() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            if (item.isAction) {
              return (
                <button
                  key={item.label}
                  onClick={() => setDrawerOpen(true)}
                  className="flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 text-primary"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <item.icon className="h-5 w-5" />
                  </div>
                </button>
              );
            }

            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      <QuickActionDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  );
}
