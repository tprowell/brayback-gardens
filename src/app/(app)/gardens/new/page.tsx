import { GardenForm } from "@/components/gardens/garden-form";

export default function NewGardenPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">New Garden</h1>
      <GardenForm />
    </div>
  );
}
