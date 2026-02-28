import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlantingStatusBadge } from "./planting-status-badge";
import { formatDateShort } from "@/lib/dates";
import type { Planting } from "@/types/database";

export function PlantingCard({ planting }: { planting: Planting }) {
  const plantName = planting.plant?.name ?? "Unknown Plant";
  const variety = planting.plant?.variety;
  const gardenName = planting.garden?.name;

  return (
    <Link href={`/plantings/${planting.id}`}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base leading-tight">
              {plantName}
              {variety && (
                <span className="font-normal text-muted-foreground">
                  {" "}
                  &lsquo;{variety}&rsquo;
                </span>
              )}
            </CardTitle>
            <PlantingStatusBadge status={planting.status} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            {gardenName && <span>{gardenName}</span>}
            {planting.quantity && <span>Qty: {planting.quantity}</span>}
            {planting.planted_at && (
              <span>Planted {formatDateShort(planting.planted_at)}</span>
            )}
            {planting.expected_harvest_at && planting.status !== "done" && (
              <span>
                Harvest ~{formatDateShort(planting.expected_harvest_at)}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
