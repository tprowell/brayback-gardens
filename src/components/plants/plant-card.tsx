import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sun, CloudSun, Cloud, CloudOff, Droplets } from "lucide-react";
import type { Plant } from "@/types/database";
import { CATEGORY_LABELS } from "@/lib/constants";

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

export function PlantCard({ plant }: { plant: Plant }) {
  const SunIcon = sunIcons[plant.sun_requirement];
  const maturityText =
    plant.days_to_maturity_min && plant.days_to_maturity_max
      ? `${plant.days_to_maturity_min}–${plant.days_to_maturity_max} days`
      : plant.days_to_maturity_min
        ? `${plant.days_to_maturity_min} days`
        : null;

  return (
    <Link href={`/plants/${plant.id}`}>
      <Card className="transition-shadow hover:shadow-md h-full">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base leading-tight">
              {plant.name}
            </CardTitle>
            <Badge
              variant="secondary"
              className={`shrink-0 text-xs ${categoryColors[plant.category] || ""}`}
            >
              {CATEGORY_LABELS[plant.category]}
            </Badge>
          </div>
          {plant.variety && (
            <p className="text-sm text-muted-foreground">{plant.variety}</p>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {maturityText && <span>{maturityText}</span>}
            <div className="flex items-center gap-1" title={plant.sun_requirement.replace("_", " ")}>
              <SunIcon className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-1" title={`${plant.water_need} water`}>
              <Droplets
                className={`h-4 w-4 ${
                  plant.water_need === "high"
                    ? "text-blue-500"
                    : plant.water_need === "moderate"
                      ? "text-blue-400"
                      : "text-blue-300"
                }`}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
