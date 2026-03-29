"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Square, RectangleHorizontal, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export type BedShape = "square" | "rectangle" | "round";

export interface BedConfig {
  shape: BedShape;
  width: number;
  depth: number;
  name: string;
}

interface Props {
  onPlace: (config: BedConfig) => void;
}

const shapes: { value: BedShape; label: string; icon: typeof Square }[] = [
  { value: "square", label: "Square", icon: Square },
  { value: "rectangle", label: "Rectangle", icon: RectangleHorizontal },
  { value: "round", label: "Round", icon: Circle },
];

export function BedConfigDialog({ onPlace }: Props) {
  const [open, setOpen] = useState(false);
  const [shape, setShape] = useState<BedShape>("rectangle");
  const [width, setWidth] = useState(4);
  const [depth, setDepth] = useState(8);
  const [roundSize, setRoundSize] = useState<"sm" | "lg">("sm");
  const [name, setName] = useState("");

  function handlePlace() {
    let w: number, d: number;
    if (shape === "round") {
      const diameter = roundSize === "sm" ? 3 : 6;
      w = diameter;
      d = diameter;
    } else if (shape === "square") {
      w = width;
      d = width;
    } else {
      w = width;
      d = depth;
    }

    onPlace({
      shape,
      width: w,
      depth: d,
      name: name || `${shape.charAt(0).toUpperCase() + shape.slice(1)} Bed`,
    });
    setOpen(false);
    setName("");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-7 text-xs">
          <Plus className="h-3.5 w-3.5 mr-1" />
          Add Bed
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Raised Bed</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          {/* Shape selector */}
          <div className="space-y-2">
            <Label>Shape</Label>
            <div className="flex gap-2">
              {shapes.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => setShape(s.value)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm transition-colors",
                    shape === s.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-input hover:bg-accent"
                  )}
                >
                  <s.icon className="h-3.5 w-3.5" />
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dimensions */}
          {shape === "round" ? (
            <div className="space-y-2">
              <Label>Size</Label>
              <div className="flex gap-2">
                {(["sm", "lg"] as const).map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setRoundSize(sz)}
                    className={cn(
                      "flex-1 rounded-md border px-3 py-1.5 text-sm transition-colors",
                      roundSize === sz
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-input hover:bg-accent"
                    )}
                  >
                    {sz === "sm" ? "Small (3\u2032)" : "Large (6\u2032)"}
                  </button>
                ))}
              </div>
            </div>
          ) : shape === "square" ? (
            <div className="space-y-2">
              <Label htmlFor="bed-side">Side Length (ft)</Label>
              <Input
                id="bed-side"
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                min={1}
                max={20}
                step={0.5}
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="bed-width">Width (ft)</Label>
                <Input
                  id="bed-width"
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  min={1}
                  max={20}
                  step={0.5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bed-depth">Depth (ft)</Label>
                <Input
                  id="bed-depth"
                  type="number"
                  value={depth}
                  onChange={(e) => setDepth(Number(e.target.value))}
                  min={1}
                  max={20}
                  step={0.5}
                />
              </div>
            </div>
          )}

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="bed-name">Name (optional)</Label>
            <Input
              id="bed-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tomato Bed"
            />
          </div>

          <Button className="w-full" onClick={handlePlace}>
            Place on Map
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
