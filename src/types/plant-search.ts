import type { PlantCategory, SunRequirement, WaterNeed } from "./database";

export interface PlantSearchResult {
  id: number | string;
  common_name: string | null;
  scientific_name: string | null;
  image_url: string | null;
  family: string | null;
}

export interface PlantDefaults {
  name?: string;
  variety?: string;
  category?: PlantCategory;
  description?: string;
  days_to_maturity_min?: number;
  spacing_inches?: number;
  sun_requirement?: SunRequirement;
  water_need?: WaterNeed;
  notes?: string;
}

export const PLANT_SOURCES = ["perenual", "trefle"] as const;
export type PlantSource = (typeof PLANT_SOURCES)[number];

export const PLANT_SOURCE_LABELS: Record<PlantSource, string> = {
  perenual: "Perenual",
  trefle: "Trefle",
};
