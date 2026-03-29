"use server";

import type {
  PerenualSearchItem,
  PerenualSearchResponse,
  PerenualSpeciesDetail,
} from "@/types/perenual";
import type { PlantSearchResult, PlantDefaults } from "@/types/plant-search";
import type { PlantCategory, SunRequirement, WaterNeed } from "@/types/database";

const PERENUAL_BASE = "https://perenual.com/api";

function getKey(): string {
  const key = process.env.PERENUAL_API_KEY;
  if (!key) throw new Error("PERENUAL_API_KEY is not configured");
  return key;
}

export async function searchPerenual(
  query: string
): Promise<{ data: PlantSearchResult[]; error?: string }> {
  if (!query || query.length < 2) return { data: [] };

  try {
    const url = `${PERENUAL_BASE}/species-list?key=${getKey()}&q=${encodeURIComponent(query)}`;
    const res = await fetch(url);

    if (!res.ok) {
      return { data: [], error: `Perenual API error: ${res.status}` };
    }

    const json: PerenualSearchResponse = await res.json();

    const results: PlantSearchResult[] = (json.data ?? [])
      .slice(0, 10)
      .map((item: PerenualSearchItem) => ({
        id: item.id,
        common_name: item.common_name ?? null,
        scientific_name: item.scientific_name?.[0] ?? null,
        image_url: item.default_image?.medium_url ?? null,
        family: null,
      }));

    return { data: results };
  } catch {
    return { data: [], error: "Failed to search Perenual" };
  }
}

export async function getPerenualPlant(
  id: number | string
): Promise<{ data: PlantDefaults | null; error?: string }> {
  try {
    const url = `${PERENUAL_BASE}/species/details/${id}?key=${getKey()}`;
    const res = await fetch(url);

    if (!res.ok) {
      return { data: null, error: `Perenual API error: ${res.status}` };
    }

    const plant: PerenualSpeciesDetail = await res.json();
    const defaults = mapPerenualToDefaults(plant);

    return { data: defaults };
  } catch {
    return { data: null, error: "Failed to fetch plant details from Perenual" };
  }
}

function titleCase(str: string): string {
  return str
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function mapSun(sunlight: string[] | undefined): SunRequirement {
  const val = (sunlight?.[0] ?? "").toLowerCase();
  if (val.includes("full sun")) return "full_sun";
  if (val.includes("part shade") || val.includes("partial shade")) return "partial_shade";
  if (val.includes("part sun") || val.includes("partial sun")) return "partial_sun";
  if (val.includes("full shade")) return "full_shade";
  return "full_sun";
}

function mapWater(watering: string | null | undefined): WaterNeed {
  const val = (watering ?? "").toLowerCase();
  if (val === "frequent") return "high";
  if (val === "average") return "moderate";
  if (val === "minimum" || val === "none") return "low";
  return "moderate";
}

function mapCategory(type: string | null | undefined): PlantCategory {
  const val = (type ?? "").toLowerCase();
  if (val === "herb" || val.includes("herb")) return "herb";
  if (val === "flower" || val.includes("flower")) return "flower";
  if (val === "tree" || val === "shrub") return "fruit";
  return "vegetable";
}

function mapSpacing(
  dimensions: PerenualSpeciesDetail["dimensions"]
): number | undefined {
  if (!dimensions) return undefined;
  const avg = (dimensions.min_value + dimensions.max_value) / 2;
  if (avg <= 0) return undefined;

  let inches: number;
  const unit = (dimensions.unit ?? "").toLowerCase();
  if (unit === "cm") {
    inches = avg / 2.54;
  } else if (unit === "m") {
    inches = (avg * 100) / 2.54;
  } else if (unit === "ft" || unit === "feet") {
    inches = avg * 12;
  } else {
    // assume inches
    inches = avg;
  }

  // Halve for spacing (dimension is full spread)
  return Math.round(inches / 2);
}

function buildNotes(plant: PerenualSpeciesDetail): string | undefined {
  const lines: string[] = [];

  if (plant.cycle) lines.push(`Cycle: ${plant.cycle}`);
  if (plant.maintenance) lines.push(`Maintenance: ${plant.maintenance}`);
  if (plant.growth_rate) lines.push(`Growth rate: ${plant.growth_rate}`);
  if (plant.harvest_season) lines.push(`Harvest season: ${plant.harvest_season}`);
  if (plant.hardiness) {
    lines.push(`Hardiness: zones ${plant.hardiness.min}–${plant.hardiness.max}`);
  }

  return lines.length > 0 ? lines.join("\n") : undefined;
}

function mapPerenualToDefaults(plant: PerenualSpeciesDetail): PlantDefaults {
  const defaults: PlantDefaults = {};

  if (plant.common_name) {
    defaults.name = titleCase(plant.common_name);
  }

  if (plant.scientific_name?.[0]) {
    defaults.variety = plant.scientific_name[0];
  }

  defaults.category = mapCategory(plant.type);

  if (plant.description) {
    defaults.description = plant.description;
  }

  defaults.sun_requirement = mapSun(plant.sunlight);
  defaults.water_need = mapWater(plant.watering);

  const spacing = mapSpacing(plant.dimensions);
  if (spacing) {
    defaults.spacing_inches = spacing;
  }

  const notes = buildNotes(plant);
  if (notes) {
    defaults.notes = notes;
  }

  return defaults;
}
