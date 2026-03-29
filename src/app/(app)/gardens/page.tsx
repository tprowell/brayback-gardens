import { getGardens } from "@/actions/gardens";
import { GardenCard } from "@/components/gardens/garden-card";
import { GardenActions } from "@/components/gardens/garden-actions";

export default async function GardensPage() {
  const gardens = await getGardens();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Gardens</h1>
        <GardenActions />
      </div>

      {gardens.length === 0 ? (
        <p className="py-8 text-center text-muted-foreground">
          No gardens yet. Create one or load the Barn Garden spec to get
          started.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {gardens.map((garden) => (
            <GardenCard key={garden.id} garden={garden} />
          ))}
        </div>
      )}
    </div>
  );
}
