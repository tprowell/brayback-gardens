import { notFound } from "next/navigation";
import Link from "next/link";
import { getPlant } from "@/actions/plants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Sun,
  CloudSun,
  Cloud,
  CloudOff,
  Droplets,
} from "lucide-react";
import { formatPlantingWindow } from "@/lib/dates";
import {
  CATEGORY_LABELS,
  SUN_LABELS,
  WATER_LABELS,
} from "@/lib/constants";
import type { PlantCategory } from "@/types/database";

const sunIcons = {
  full_sun: Sun,
  partial_sun: CloudSun,
  partial_shade: Cloud,
  full_shade: CloudOff,
};

const categoryColors: Record<string, string> = {
  vegetable: "bg-green-100 text-green-800",
  fruit: "bg-orange-100 text-orange-800",
  berry: "bg-purple-100 text-purple-800",
  herb: "bg-emerald-100 text-emerald-800",
  flower: "bg-pink-100 text-pink-800",
};

export default async function PlantDetailPage({
  params,
}: {
  params: Promise<{ plantId: string }>;
}) {
  const { plantId } = await params;
  const plant = await getPlant(plantId);

  if (!plant) {
    notFound();
  }

  const SunIcon = sunIcons[plant.sun_requirement];
  const maturityText =
    plant.days_to_maturity_min && plant.days_to_maturity_max
      ? `${plant.days_to_maturity_min}–${plant.days_to_maturity_max} days`
      : plant.days_to_maturity_min
        ? `~${plant.days_to_maturity_min} days`
        : "N/A";

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/plants">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{plant.name}</h1>
          {plant.variety && (
            <p className="text-muted-foreground">{plant.variety}</p>
          )}
        </div>
        <Badge
          className={`ml-auto ${categoryColors[plant.category] || ""}`}
          variant="secondary"
        >
          {CATEGORY_LABELS[plant.category as PlantCategory]}
        </Badge>
      </div>

      {plant.description && (
        <p className="text-muted-foreground">{plant.description}</p>
      )}

      {/* Quick stats */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-1.5">
          <SunIcon className="h-4 w-4" />
          <span>{SUN_LABELS[plant.sun_requirement]}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Droplets className="h-4 w-4 text-blue-400" />
          <span>{WATER_LABELS[plant.water_need]} Water</span>
        </div>
        <div>
          <span className="font-medium">Maturity:</span> {maturityText}
        </div>
        {plant.spacing_inches && (
          <div>
            <span className="font-medium">Spacing:</span>{" "}
            {plant.spacing_inches}&quot;
          </div>
        )}
      </div>

      {/* Planting windows */}
      <Card>
        <CardHeader>
          <CardTitle>Planting Windows</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {(plant.indoor_start_weeks !== null ||
            plant.indoor_end_weeks !== null) && (
            <div className="flex justify-between text-sm">
              <span className="font-medium">Indoor Start</span>
              <span>
                {formatPlantingWindow(
                  plant.indoor_start_weeks,
                  plant.indoor_end_weeks
                )}
              </span>
            </div>
          )}
          {(plant.transplant_start_weeks !== null ||
            plant.transplant_end_weeks !== null) && (
            <div className="flex justify-between text-sm">
              <span className="font-medium">Transplant</span>
              <span>
                {formatPlantingWindow(
                  plant.transplant_start_weeks,
                  plant.transplant_end_weeks
                )}
              </span>
            </div>
          )}
          {(plant.direct_sow_start_weeks !== null ||
            plant.direct_sow_end_weeks !== null) && (
            <div className="flex justify-between text-sm">
              <span className="font-medium">Direct Sow</span>
              <span>
                {formatPlantingWindow(
                  plant.direct_sow_start_weeks,
                  plant.direct_sow_end_weeks
                )}
              </span>
            </div>
          )}
          {plant.indoor_start_weeks === null &&
            plant.transplant_start_weeks === null &&
            plant.direct_sow_start_weeks === null && (
              <p className="text-sm text-muted-foreground">
                No planting window data available.
              </p>
            )}
        </CardContent>
      </Card>

      {/* Companion planting */}
      {(plant.companion_plants || plant.avoid_near) && (
        <Card>
          <CardHeader>
            <CardTitle>Companion Planting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {plant.companion_plants && (
              <div>
                <p className="text-sm font-medium text-green-700">
                  Good companions
                </p>
                <p className="text-sm">{plant.companion_plants}</p>
              </div>
            )}
            {plant.avoid_near && (
              <div>
                <p className="text-sm font-medium text-red-700">Avoid near</p>
                <p className="text-sm">{plant.avoid_near}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Harvest & Preserve */}
      {(plant.harvest_instructions ||
        plant.preserve_methods?.length ||
        plant.preserve_notes) && (
        <Card>
          <CardHeader>
            <CardTitle>Harvest & Preserving</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {plant.harvest_instructions && (
              <div>
                <p className="text-sm font-medium">Harvest</p>
                <p className="text-sm">{plant.harvest_instructions}</p>
              </div>
            )}
            {plant.preserve_methods && plant.preserve_methods.length > 0 && (
              <div>
                <p className="text-sm font-medium">Preserve Methods</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {plant.preserve_methods.map((method) => (
                    <Badge key={method} variant="outline" className="text-xs">
                      {method}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {plant.preserve_notes && (
              <div>
                <p className="text-sm font-medium">Preserve Notes</p>
                <p className="text-sm">{plant.preserve_notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Notes */}
      {plant.notes && (
        <>
          <Separator />
          <div>
            <p className="text-sm font-medium">Notes</p>
            <p className="text-sm text-muted-foreground">{plant.notes}</p>
          </div>
        </>
      )}
    </div>
  );
}
