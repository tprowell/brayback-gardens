import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getHarvests, getUpcomingHarvests } from "@/actions/harvests";
import { HarvestTimeline } from "@/components/harvests/harvest-timeline";
import { HarvestCard } from "@/components/harvests/harvest-card";

export default async function HarvestsPage() {
  const [upcomingPlantings, recentHarvests] = await Promise.all([
    getUpcomingHarvests(),
    getHarvests(),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Harvests</h1>
          <p className="text-sm text-muted-foreground">
            Track upcoming and past harvests.
          </p>
        </div>
        <Link href="/harvests/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Log Harvest
          </Button>
        </Link>
      </div>

      {/* Upcoming harvests */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">Upcoming Harvests</h2>
        <HarvestTimeline plantings={upcomingPlantings} />
      </section>

      {/* Recent harvest log */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">Recent Harvest Log</h2>
        {recentHarvests.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            No harvests logged yet.
          </p>
        ) : (
          <div className="space-y-2">
            {recentHarvests.map((h) => (
              <HarvestCard key={h.id} harvest={h} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
