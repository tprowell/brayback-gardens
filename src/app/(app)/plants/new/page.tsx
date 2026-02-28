import { PlantForm } from "@/components/plants/plant-form";

export default function NewPlantPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">Add Custom Plant</h1>
      <PlantForm />
    </div>
  );
}
