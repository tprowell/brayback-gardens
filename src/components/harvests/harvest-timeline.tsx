import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { PlantingStatusBadge } from "@/components/plantings/planting-status-badge";
import { formatDateShort, timeframeBucket, daysUntil } from "@/lib/dates";
import type { Planting } from "@/types/database";

const BUCKET_LABELS: Record<string, string> = {
  overdue: "Overdue",
  "this-week": "This Week",
  "this-month": "This Month",
  later: "Later",
};

const BUCKET_ORDER = ["overdue", "this-week", "this-month", "later"] as const;

export function HarvestTimeline({ plantings }: { plantings: Planting[] }) {
  if (plantings.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-muted-foreground">
        No upcoming harvests.
      </p>
    );
  }

  const grouped = new Map<string, Planting[]>();
  for (const p of plantings) {
    if (!p.expected_harvest_at) continue;
    const bucket = timeframeBucket(p.expected_harvest_at);
    if (!grouped.has(bucket)) grouped.set(bucket, []);
    grouped.get(bucket)!.push(p);
  }

  return (
    <div className="space-y-6">
      {BUCKET_ORDER.map((bucket) => {
        const items = grouped.get(bucket);
        if (!items?.length) return null;
        return (
          <div key={bucket}>
            <h3 className="mb-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {BUCKET_LABELS[bucket]}
            </h3>
            <div className="space-y-2">
              {items.map((p) => (
                <Link key={p.id} href={`/plantings/${p.id}`}>
                  <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="flex items-center justify-between gap-4 py-3">
                      <div className="min-w-0">
                        <p className="truncate font-medium">
                          {p.plant?.name ?? "Unknown"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {p.garden?.name}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <PlantingStatusBadge status={p.status} />
                        <div className="text-right text-sm">
                          <p>{formatDateShort(p.expected_harvest_at!)}</p>
                          <p className="text-xs text-muted-foreground">
                            {daysUntil(p.expected_harvest_at!)} days
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
