import { formatDateCompact } from "@/lib/dates";
import { Separator } from "@/components/ui/separator";
import type { Harvest } from "@/types/database";

export function HarvestLogList({ harvests }: { harvests: Harvest[] }) {
  if (harvests.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No harvests logged yet.
      </p>
    );
  }

  return (
    <div className="space-y-0">
      {harvests.map((h, i) => (
        <div key={h.id}>
          {i > 0 && <Separator className="my-2" />}
          <div className="flex items-start justify-between gap-4 py-1">
            <div className="min-w-0">
              <p className="text-sm font-medium">
                {formatDateCompact(h.harvested_at)}
              </p>
              {h.notes && (
                <p className="text-sm text-muted-foreground">{h.notes}</p>
              )}
            </div>
            <div className="flex shrink-0 gap-3 text-sm text-muted-foreground">
              {h.quantity && <span>{h.quantity}</span>}
              {h.weight_oz != null && <span>{h.weight_oz} oz</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
