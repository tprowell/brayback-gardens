"use client";

import { useState, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Loader2, Leaf } from "lucide-react";
import type { PlantSearchResult, PlantDefaults } from "@/types/plant-search";

interface ApiPlantSearchProps {
  searchFn: (query: string) => Promise<{ data: PlantSearchResult[]; error?: string }>;
  fetchFn: (id: number | string) => Promise<{ data: PlantDefaults | null; error?: string }>;
  onSelect: (defaults: PlantDefaults) => void;
  onSkip: () => void;
}

export function ApiPlantSearch({ searchFn, fetchFn, onSelect, onSkip }: ApiPlantSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlantSearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState<number | string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const doSearch = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      return;
    }
    setSearching(true);
    setError(null);
    const res = await searchFn(q);
    setSearching(false);
    if (res.error) {
      setError(res.error);
    } else {
      setResults(res.data);
    }
  }, [searchFn]);

  function handleInputChange(value: string) {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(value), 400);
  }

  async function handleSelect(result: PlantSearchResult) {
    setLoading(result.id);
    setError(null);
    const res = await fetchFn(result.id);
    setLoading(null);
    if (res.error || !res.data) {
      setError(res.error ?? "Failed to load plant details");
    } else {
      onSelect(res.data);
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search for a plant (e.g. tomato, basil, sunflower)..."
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          className="pl-9"
          autoFocus
        />
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      {searching && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Searching...
        </div>
      )}

      {results.length > 0 && (
        <Card>
          <CardContent className="divide-y p-0">
            {results.map((result) => (
              <button
                key={result.id}
                type="button"
                disabled={loading !== null}
                onClick={() => handleSelect(result)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50 disabled:opacity-50"
              >
                {result.image_url ? (
                  <img
                    src={result.image_url}
                    alt=""
                    className="h-10 w-10 rounded-md object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                    <Leaf className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">
                    {result.common_name ?? result.scientific_name}
                  </p>
                  {result.common_name && result.scientific_name && (
                    <p className="truncate text-sm text-muted-foreground italic">
                      {result.scientific_name}
                    </p>
                  )}
                </div>
                {loading === result.id ? (
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                ) : (
                  <span className="shrink-0 text-xs text-muted-foreground">
                    Use this
                  </span>
                )}
              </button>
            ))}
          </CardContent>
        </Card>
      )}

      {query.length >= 2 && !searching && results.length === 0 && !error && (
        <p className="text-sm text-muted-foreground">
          No results found. Try a different name or enter manually.
        </p>
      )}

      <div className="text-center">
        <Button type="button" variant="ghost" onClick={onSkip}>
          or enter manually
        </Button>
      </div>
    </div>
  );
}
