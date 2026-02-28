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
import { Separator } from "@/components/ui/separator";
import { createPlant } from "@/actions/plants";
import {
  PLANT_CATEGORIES,
  CATEGORY_LABELS,
  SUN_REQUIREMENTS,
  SUN_LABELS,
  WATER_NEEDS,
  WATER_LABELS,
  PLANTING_METHODS,
} from "@/lib/constants";

export function PlantForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await createPlant(formData);
    if ("error" in result && result.error) {
      setError(result.error);
      setLoading(false);
    } else if ("data" in result && result.data) {
      router.push(`/plants/${result.data.id}`);
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
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Plant Name *</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="variety">Variety</Label>
              <Input id="variety" name="variety" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select name="category" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {PLANT_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {CATEGORY_LABELS[cat]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sun_requirement">Sun</Label>
              <Select name="sun_requirement" defaultValue="full_sun">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SUN_REQUIREMENTS.map((sun) => (
                    <SelectItem key={sun} value={sun}>
                      {SUN_LABELS[sun]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="water_need">Water</Label>
              <Select name="water_need" defaultValue="moderate">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {WATER_NEEDS.map((w) => (
                    <SelectItem key={w} value={w}>
                      {WATER_LABELS[w]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" rows={2} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Growing Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="days_to_maturity_min">Days to Maturity (min)</Label>
              <Input
                id="days_to_maturity_min"
                name="days_to_maturity_min"
                type="number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="days_to_maturity_max">Days to Maturity (max)</Label>
              <Input
                id="days_to_maturity_max"
                name="days_to_maturity_max"
                type="number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="spacing_inches">Spacing (inches)</Label>
              <Input id="spacing_inches" name="spacing_inches" type="number" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="planting_method">Planting Method</Label>
            <Select name="planting_method" defaultValue="both">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PLANTING_METHODS.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <p className="text-sm font-medium">
            Planting Windows (weeks relative to last frost — negative = before)
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="indoor_start_weeks">Indoor Start</Label>
              <Input
                id="indoor_start_weeks"
                name="indoor_start_weeks"
                type="number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="indoor_end_weeks">Indoor End</Label>
              <Input
                id="indoor_end_weeks"
                name="indoor_end_weeks"
                type="number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="transplant_start_weeks">Transplant Start</Label>
              <Input
                id="transplant_start_weeks"
                name="transplant_start_weeks"
                type="number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="transplant_end_weeks">Transplant End</Label>
              <Input
                id="transplant_end_weeks"
                name="transplant_end_weeks"
                type="number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="direct_sow_start_weeks">Direct Sow Start</Label>
              <Input
                id="direct_sow_start_weeks"
                name="direct_sow_start_weeks"
                type="number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="direct_sow_end_weeks">Direct Sow End</Label>
              <Input
                id="direct_sow_end_weeks"
                name="direct_sow_end_weeks"
                type="number"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Companion Planting & Harvest</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companion_plants">Good Companions</Label>
            <Input
              id="companion_plants"
              name="companion_plants"
              placeholder="e.g. Basil, Marigold"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="avoid_near">Avoid Near</Label>
            <Input
              id="avoid_near"
              name="avoid_near"
              placeholder="e.g. Fennel, Dill"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="harvest_instructions">Harvest Instructions</Label>
            <Textarea
              id="harvest_instructions"
              name="harvest_instructions"
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="preserve_notes">Preserve Notes</Label>
            <Textarea id="preserve_notes" name="preserve_notes" rows={2} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea id="notes" name="notes" rows={2} />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add Plant"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
