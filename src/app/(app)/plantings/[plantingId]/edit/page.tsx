import { notFound } from "next/navigation";
import { getPlanting } from "@/actions/plantings";
import { getPlants } from "@/actions/plants";
import { getGardens } from "@/actions/gardens";
import { PlantingForm } from "@/components/plantings/planting-form";

export default async function EditPlantingPage({
  params,
}: {
  params: Promise<{ plantingId: string }>;
}) {
  const { plantingId } = await params;
  const [planting, plants, gardens] = await Promise.all([
    getPlanting(plantingId),
    getPlants(),
    getGardens(),
  ]);

  if (!planting) notFound();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Planting</h1>
        <p className="text-sm text-muted-foreground">
          {planting.plant?.name ?? "Unknown Plant"}
        </p>
      </div>
      <PlantingForm plants={plants} gardens={gardens} planting={planting} />
    </div>
  );
}
