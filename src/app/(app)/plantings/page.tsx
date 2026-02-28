import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getPlantings } from "@/actions/plantings";
import { PlantingCard } from "@/components/plantings/planting-card";
import { PlantingFilters } from "@/components/plantings/planting-filters";
import type { PlantingStatus } from "@/types/database";

export default async function PlantingsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; year?: string }>;
}) {
  const params = await searchParams;
  const status = params.status as PlantingStatus | undefined;
  const year = params.year ? Number(params.year) : undefined;

  const plantings = await getPlantings({ status, year });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Plantings</h1>
          <p className="text-sm text-muted-foreground">
            {plantings.length} planting{plantings.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/plantings/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Planting
          </Button>
        </Link>
      </div>

      <PlantingFilters />

      {plantings.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          <p>No plantings yet.</p>
          <p className="mt-1 text-sm">
            <Link href="/plantings/new" className="text-primary underline">
              Create your first planting
            </Link>{" "}
            to start tracking.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {plantings.map((p) => (
            <PlantingCard key={p.id} planting={p} />
          ))}
        </div>
      )}
    </div>
  );
}
