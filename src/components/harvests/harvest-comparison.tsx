import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateCompact, daysUntil } from "@/lib/dates";
import type { Planting, Harvest } from "@/types/database";

export function HarvestComparison({
  planting,
  harvests,
}: {
  planting: Planting;
  harvests: Harvest[];
}) {
  if (!planting.expected_harvest_at) return null;

  const totalWeight = harvests.reduce(
    (sum, h) => sum + (h.weight_oz ?? 0),
    0
  );
  const harvestCount = harvests.length;
  const firstHarvestDate = planting.first_harvest_at;

  const expectedDate = planting.expected_harvest_at;
  const daysToExpected = daysUntil(expectedDate);

  let comparisonText: string | null = null;
  if (firstHarvestDate) {
    const firstDate = new Date(firstHarvestDate);
    const expDate = new Date(expectedDate);
    const diff = Math.round(
      (firstDate.getTime() - expDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diff < 0) {
      comparisonText = `${Math.abs(diff)} days early`;
    } else if (diff > 0) {
      comparisonText = `${diff} days late`;
    } else {
      comparisonText = "Right on schedule";
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Harvest Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 text-sm sm:grid-cols-3">
          <div>
            <p className="font-medium">Expected</p>
            <p className="text-muted-foreground">
              {formatDateCompact(expectedDate)}
              {daysToExpected > 0 && (
                <span className="ml-1 text-xs">
                  ({daysToExpected}d away)
                </span>
              )}
            </p>
          </div>
          <div>
            <p className="font-medium">Actual First Harvest</p>
            <p className="text-muted-foreground">
              {firstHarvestDate
                ? formatDateCompact(firstHarvestDate)
                : "Not yet"}
              {comparisonText && (
                <span className="ml-1 text-xs">({comparisonText})</span>
              )}
            </p>
          </div>
          <div>
            <p className="font-medium">Total Harvested</p>
            <p className="text-muted-foreground">
              {harvestCount} harvest{harvestCount !== 1 ? "es" : ""}
              {totalWeight > 0 && ` — ${totalWeight} oz`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
