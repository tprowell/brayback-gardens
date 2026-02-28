"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { createDefaultGardens } from "@/actions/gardens";
import { Trees } from "lucide-react";

export function FirstRunDialog() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const router = useRouter();

  async function handleSetup() {
    setLoading(true);
    const result = await createDefaultGardens();
    if (result?.error) {
      setLoading(false);
      return;
    }
    setOpen(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <Trees className="h-6 w-6 text-green-600" />
          </div>
          <DialogTitle className="text-center">
            Welcome to Brayback Gardens!
          </DialogTitle>
          <DialogDescription className="text-center">
            Let&apos;s set up your two garden spaces to get started.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <div className="rounded-lg border p-3">
            <p className="font-medium">Upper Garden</p>
            <p className="text-sm text-muted-foreground">
              ~40 x 15 ft — Raised beds, mini-orchard, berry plot
            </p>
          </div>
          <div className="rounded-lg border p-3">
            <p className="font-medium">Lower Garden</p>
            <p className="text-sm text-muted-foreground">
              ~60 x 40 ft — Behind the barn, best sun, greenhouse
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button onClick={handleSetup} disabled={loading}>
            {loading ? "Setting up..." : "Create Both Gardens"}
          </Button>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Skip for now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
