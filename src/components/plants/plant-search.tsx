"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { searchPlants } from "@/actions/plants";
import type { Plant } from "@/types/database";
import { CATEGORY_LABELS } from "@/lib/constants";

export function PlantSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Plant[]>([]);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSearch = useCallback(async (value: string) => {
    setQuery(value);
    if (value.length >= 2) {
      const plants = await searchPlants(value);
      setResults(plants);
    } else {
      setResults([]);
    }
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-9 w-full items-center rounded-md border bg-background px-3 text-sm text-muted-foreground md:w-64"
      >
        Search plants...
        <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium md:inline-flex">
          <span className="text-xs">&#8984;</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search plants by name or variety..."
          value={query}
          onValueChange={handleSearch}
        />
        <CommandList>
          <CommandEmpty>No plants found.</CommandEmpty>
          {results.length > 0 && (
            <CommandGroup heading="Plants">
              {results.map((plant) => (
                <CommandItem
                  key={plant.id}
                  value={plant.name}
                  onSelect={() => {
                    router.push(`/plants/${plant.id}`);
                    setOpen(false);
                  }}
                >
                  <span>{plant.name}</span>
                  {plant.variety && (
                    <span className="text-muted-foreground ml-2">
                      {plant.variety}
                    </span>
                  )}
                  <span className="ml-auto text-xs text-muted-foreground">
                    {CATEGORY_LABELS[plant.category]}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
