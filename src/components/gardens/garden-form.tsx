"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createGarden } from "@/actions/gardens";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function GardenForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    const result = await createGarden(formData);
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else if (result.data) {
      router.push(`/gardens/${result.data.id}/design`);
    }
  }

  return (
    <form action={handleSubmit}>
      {error && (
        <div className="mb-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Garden Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              required
              placeholder="e.g. Barn Garden"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              rows={3}
              placeholder="Optional description..."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="width_ft">Width (ft)</Label>
              <Input
                id="width_ft"
                name="width_ft"
                type="number"
                step="0.01"
                required
                placeholder="45"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="length_ft">Length (ft)</Label>
              <Input
                id="length_ft"
                name="length_ft"
                type="number"
                step="0.01"
                required
                placeholder="80"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="grid_size_ft">Grid Size (ft)</Label>
              <Input
                id="grid_size_ft"
                name="grid_size_ft"
                type="number"
                step="0.5"
                defaultValue="2"
                placeholder="2"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-4 flex gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Garden"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
