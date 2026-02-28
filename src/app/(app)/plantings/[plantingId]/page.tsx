import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { getPlanting } from "@/actions/plantings";
import { getHarvestsForPlanting } from "@/actions/harvests";
import { PlantingStatusBadge } from "@/components/plantings/planting-status-badge";
import { PlantingStatusUpdater } from "@/components/plantings/planting-status-updater";
import { HarvestLogList } from "@/components/harvests/harvest-log-list";
import { HarvestComparison } from "@/components/harvests/harvest-comparison";
import { formatDateCompact } from "@/lib/dates";
import { DeletePlantingButton } from "./delete-button";

export default async function PlantingDetailPage({
  params,
}: {
  params: Promise<{ plantingId: string }>;
}) {
  const { plantingId } = await params;
  const planting = await getPlanting(plantingId);
  if (!planting) notFound();

  const harvests = await getHarvestsForPlanting(plantingId);

  const plant = planting.plant;
  const garden = planting.garden;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            {plant?.name ?? "Unknown Plant"}
            {plant?.variety && (
              <span className="font-normal text-muted-foreground">
                {" "}
                &lsquo;{plant.variety}&rsquo;
              </span>
            )}
          </h1>
          <div className="mt-1 flex items-center gap-3">
            <PlantingStatusBadge status={planting.status} />
            {garden && (
              <span className="text-sm text-muted-foreground">
                {garden.name}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/plantings/${planting.id}/edit`}>
            <Button variant="outline" size="sm">
              <Pencil className="mr-1 h-4 w-4" /> Edit
            </Button>
          </Link>
          <DeletePlantingButton plantingId={planting.id} />
        </div>
      </div>

      {/* Status updater */}
      <PlantingStatusUpdater
        plantingId={planting.id}
        currentStatus={planting.status}
      />

      {/* Details card */}
      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            {planting.quantity && (
              <div>
                <dt className="font-medium">Quantity</dt>
                <dd className="text-muted-foreground">{planting.quantity}</dd>
              </div>
            )}
            {planting.started_indoors_at && (
              <div>
                <dt className="font-medium">Started Indoors</dt>
                <dd className="text-muted-foreground">
                  {formatDateCompact(planting.started_indoors_at)}
                </dd>
              </div>
            )}
            {planting.transplanted_at && (
              <div>
                <dt className="font-medium">Transplanted</dt>
                <dd className="text-muted-foreground">
                  {formatDateCompact(planting.transplanted_at)}
                </dd>
              </div>
            )}
            {planting.planted_at && (
              <div>
                <dt className="font-medium">Planted / Direct Sown</dt>
                <dd className="text-muted-foreground">
                  {formatDateCompact(planting.planted_at)}
                </dd>
              </div>
            )}
            {planting.expected_harvest_at && (
              <div>
                <dt className="font-medium">Expected Harvest</dt>
                <dd className="text-muted-foreground">
                  {formatDateCompact(planting.expected_harvest_at)}
                </dd>
              </div>
            )}
            {planting.first_harvest_at && (
              <div>
                <dt className="font-medium">First Harvest</dt>
                <dd className="text-muted-foreground">
                  {formatDateCompact(planting.first_harvest_at)}
                </dd>
              </div>
            )}
            {planting.finished_at && (
              <div>
                <dt className="font-medium">Finished</dt>
                <dd className="text-muted-foreground">
                  {formatDateCompact(planting.finished_at)}
                </dd>
              </div>
            )}
          </dl>
          {planting.notes && (
            <>
              <Separator className="my-4" />
              <div>
                <p className="text-sm font-medium">Notes</p>
                <p className="mt-1 text-sm text-muted-foreground whitespace-pre-wrap">
                  {planting.notes}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Harvest comparison */}
      {planting.expected_harvest_at && (
        <HarvestComparison planting={planting} harvests={harvests} />
      )}

      {/* Harvest history */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Harvest Log</CardTitle>
            <Link href={`/harvests/new?planting=${planting.id}`}>
              <Button variant="outline" size="sm">
                <Plus className="mr-1 h-4 w-4" /> Log Harvest
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <HarvestLogList harvests={harvests} />
        </CardContent>
      </Card>
    </div>
  );
}
