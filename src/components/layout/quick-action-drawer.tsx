"use client";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Sprout, Apple, StickyNote, CheckSquare } from "lucide-react";

interface QuickActionDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const actions = [
  {
    href: "/plantings/new",
    label: "Log Planting",
    description: "Record a new planting",
    icon: Sprout,
  },
  {
    href: "/harvests/new",
    label: "Log Harvest",
    description: "Record a harvest",
    icon: Apple,
  },
  {
    href: "/notes",
    label: "Add Note",
    description: "Quick garden observation",
    icon: StickyNote,
  },
  {
    href: "/tasks",
    label: "Create Task",
    description: "Add a to-do item",
    icon: CheckSquare,
  },
];

export function QuickActionDrawer({
  open,
  onOpenChange,
}: QuickActionDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-xl">
        <SheetHeader>
          <SheetTitle>Quick Actions</SheetTitle>
        </SheetHeader>
        <div className="grid gap-2 py-4">
          {actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-muted"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <action.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{action.label}</p>
                <p className="text-sm text-muted-foreground">
                  {action.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
