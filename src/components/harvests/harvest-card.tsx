import { Card, CardContent } from "@/components/ui/card";
import { formatDateCompact } from "@/lib/dates";
import type { Harvest } from "@/types/database";

export function HarvestCard({ harvest }: { harvest: Harvest }) {
  const plantName = harvest.planting?.plant?.name ?? "Unknown";

  return (
    <Card>
      <CardContent className="flex items-center justify-between gap-4 py-3">
        <div className="min-w-0">
          <p className="truncate font-medium">{plantName}</p>
          <p className="text-sm text-muted-foreground">
            {formatDateCompact(harvest.harvested_at)}
          </p>
        </div>
        <div className="flex shrink-0 gap-4 text-sm text-muted-foreground">
          {harvest.quantity && <span>{harvest.quantity}</span>}
          {harvest.weight_oz != null && (
            <span>{harvest.weight_oz} oz</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
