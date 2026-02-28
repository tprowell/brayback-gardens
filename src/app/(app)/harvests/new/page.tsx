import { getActivePlantings } from "@/actions/plantings";
import { HarvestForm } from "@/components/harvests/harvest-form";

export default async function NewHarvestPage({
  searchParams,
}: {
  searchParams: Promise<{ planting?: string }>;
}) {
  const params = await searchParams;
  const plantings = await getActivePlantings();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Log Harvest</h1>
        <p className="text-sm text-muted-foreground">
          Record a harvest from one of your active plantings.
        </p>
      </div>
      <HarvestForm
        plantings={plantings}
        preselectedPlantingId={params.planting}
      />
    </div>
  );
}
