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
import { createPlanting, updatePlanting } from "@/actions/plantings";
import {
  PLANTING_STATUSES,
  PLANTING_STATUS_LABELS,
} from "@/lib/constants";
import type { Plant, Garden, Planting } from "@/types/database";

interface PlantingFormProps {
  plants: Plant[];
  gardens: Garden[];
  planting?: Planting;
}

export function PlantingForm({ plants, gardens, planting }: PlantingFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isEditing = !!planting;

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    const result = isEditing
      ? await updatePlanting(planting!.id, formData)
      : await createPlanting(formData);

    if ("error" in result && result.error) {
      setError(result.error);
      setLoading(false);
    } else if ("data" in result && result.data) {
      router.push(`/plantings/${result.data.id}`);
    } else if ("success" in result) {
      router.push(`/plantings/${planting!.id}`);
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
          <CardTitle>Planting Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="plant_id">Plant *</Label>
              <Select
                name="plant_id"
                required
                defaultValue={planting?.plant_id}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a plant" />
                </SelectTrigger>
                <SelectContent>
                  {plants.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                      {p.variety ? ` — ${p.variety}` : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="garden_id">Garden</Label>
              <Select
                name="garden_id"
                defaultValue={planting?.garden_id ?? undefined}
              >
                <SelectTrigger>
                  <SelectValue placeholder="No garden selected" />
                </SelectTrigger>
                <SelectContent>
                  {gardens.map((g) => (
                    <SelectItem key={g.id} value={g.id}>
                      {g.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                name="status"
                defaultValue={planting?.status ?? "planned"}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PLANTING_STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {PLANTING_STATUS_LABELS[s]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min={1}
                defaultValue={planting?.quantity ?? ""}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="started_indoors_at">Started Indoors</Label>
              <Input
                id="started_indoors_at"
                name="started_indoors_at"
                type="date"
                defaultValue={planting?.started_indoors_at ?? ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="transplanted_at">Transplanted</Label>
              <Input
                id="transplanted_at"
                name="transplanted_at"
                type="date"
                defaultValue={planting?.transplanted_at ?? ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="planted_at">
                Planted / Direct Sown
              </Label>
              <Input
                id="planted_at"
                name="planted_at"
                type="date"
                defaultValue={planting?.planted_at ?? ""}
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
            placeholder="Seed source, placement notes, etc."
            defaultValue={planting?.notes ?? ""}
          />
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : isEditing
              ? "Save Changes"
              : "Create Planting"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
