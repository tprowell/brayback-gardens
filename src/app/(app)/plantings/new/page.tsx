import { getPlants } from "@/actions/plants";
import { getGardens } from "@/actions/gardens";
import { PlantingForm } from "@/components/plantings/planting-form";

export default async function NewPlantingPage() {
  const [plants, gardens] = await Promise.all([getPlants(), getGardens()]);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">New Planting</h1>
        <p className="text-sm text-muted-foreground">
          Record a new planting in your garden.
        </p>
      </div>
      <PlantingForm plants={plants} gardens={gardens} />
    </div>
  );
}
