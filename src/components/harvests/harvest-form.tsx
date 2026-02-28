"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createHarvest } from "@/actions/harvests";
import type { Planting } from "@/types/database";

interface HarvestFormProps {
  plantings: Planting[];
  preselectedPlantingId?: string;
}

export function HarvestForm({
  plantings,
  preselectedPlantingId,
}: HarvestFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const today = new Date().toISOString().split("T")[0];

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    const result = await createHarvest(formData);

    if ("error" in result && result.error) {
      setError(result.error);
      setLoading(false);
    } else if ("data" in result && result.data) {
      const plantingId = formData.get("planting_id") as string;
      router.push(`/plantings/${plantingId}`);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Harvest Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="planting_id">Planting *</Label>
            <Select
              name="planting_id"
              required
              defaultValue={preselectedPlantingId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a planting" />
              </SelectTrigger>
              <SelectContent>
                {plantings.map((p) => {
                  const name = p.plant?.name ?? "Unknown";
                  const variety = p.plant?.variety
                    ? ` — ${p.plant.variety}`
                    : "";
                  const garden = p.garden?.name
                    ? ` (${p.garden.name})`
                    : "";
                  return (
                    <SelectItem key={p.id} value={p.id}>
                      {name}
                      {variety}
                      {garden}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="harvested_at">Date *</Label>
              <Input
                id="harvested_at"
                name="harvested_at"
                type="date"
                required
                defaultValue={today}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                placeholder='e.g. "12 tomatoes"'
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight_oz">Weight (oz)</Label>
              <Input
                id="weight_oz"
                name="weight_oz"
                type="number"
                step="0.1"
                min="0"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder="Quality, ripeness, etc."
          />
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Log Harvest"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
