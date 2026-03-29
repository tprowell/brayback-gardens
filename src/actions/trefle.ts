"use server";

import type {
  TrefleSearchResult,
  TrefleSpecies,
  TreflePlantDetail,
} from "@/types/trefle";
import type { PlantSearchResult, PlantDefaults } from "@/types/plant-search";
import type { PlantCategory, SunRequirement, WaterNeed } from "@/types/database";

const TREFLE_BASE = "https://trefle.io/api/v1";

function getToken(): string {
  const token = process.env.TREFLE_API_KEY;
  if (!token) throw new Error("TREFLE_API_KEY is not configured");
  return token;
}

export async function searchTrefle(
  query: string
): Promise<{ data: PlantSearchResult[]; error?: string }> {
  if (!query || query.length < 2) return { data: [] };

  try {
    const url = `${TREFLE_BASE}/plants/search?q=${encodeURIComponent(query)}&token=${getToken()}`;
    const res = await fetch(url);

    if (!res.ok) {
      return { data: [], error: `Trefle API error: ${res.status}` };
    }

    const json = await res.json();

    const results: PlantSearchResult[] = (json.data ?? [])
      .slice(0, 10)
      .map((item: Record<string, unknown>) => ({
        id: item.id as number,
        common_name: (item.common_name as string) ?? null,
        scientific_name: (item.scientific_name as string) ?? null,
        image_url: (item.image_url as string) ?? null,
        family: (item.family as string) ?? null,
      }));

    return { data: results };
  } catch {
    return { data: [], error: "Failed to search Trefle" };
  }
}

export async function getTreflePlant(
  id: number | string
): Promise<{ data: PlantDefaults | null; error?: string }> {
  try {
    // Search returns plant IDs — fetch from /plants/{id} to get main_species with growth data
    const url = `${TREFLE_BASE}/plants/${id}?token=${getToken()}`;
    const res = await fetch(url);

    if (!res.ok) {
      return { data: null, error: `Trefle API error: ${res.status}` };
    }

    const json = await res.json();
    const plant = json.data as TreflePlantDetail;

    // Growth data lives on main_species; fall back to top-level fields for name etc.
    const species: TrefleSpecies = plant.main_species ?? {
      id: plant.id,
      common_name: plant.common_name,
      scientific_name: plant.scientific_name,
      image_url: plant.image_url,
      family: null,
      vegetable: plant.vegetable ?? false,
      edible: false,
      edible_part: null,
      growth: null,
      specifications: null,
    };

    const defaults = mapTrefleToPlantDefaults(species);

    return { data: defaults };
  } catch {
    return { data: null, error: "Failed to fetch plant details from Trefle" };
  }
}

function mapSun(light: number | null | undefined): SunRequirement {
  if (light == null) return "full_sun";
  if (light >= 8) return "full_sun";
  if (light >= 6) return "partial_sun";
  if (light >= 3) return "partial_shade";
  return "full_shade";
}

function mapWater(humidity: number | null | undefined): WaterNeed {
  if (humidity == null) return "moderate";
  if (humidity >= 7) return "high";
  if (humidity >= 4) return "moderate";
  return "low";
}

function mapCategory(species: TrefleSpecies): PlantCategory {
  if (species.vegetable) return "vegetable";

  const parts = species.edible_part ?? [];
  const partsLower = parts.map((p) => p.toLowerCase());

  if (partsLower.includes("leaves") || partsLower.includes("leaf")) return "herb";
  if (
    partsLower.includes("fruit") ||
    partsLower.includes("fruits")
  )
    return "fruit";

  if (species.edible) return "vegetable";
  return "flower";
}

function mapSpacing(growth: TrefleSpecies["growth"]): number | undefined {
  if (!growth) return undefined;

  const cm =
    growth.row_spacing?.cm ?? growth.spread?.cm ?? null;
  if (cm == null) return undefined;

  return Math.round(cm / 2.54);
}

function mapTrefleToPlantDefaults(species: TrefleSpecies): PlantDefaults {
  const growth = species.growth;
  const defaults: PlantDefaults = {};

  if (species.common_name) {
    defaults.name = species.common_name
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");
  }

  if (species.scientific_name) {
    defaults.variety = species.scientific_name;
  }

  defaults.category = mapCategory(species);

  if (growth?.description) {
    defaults.description = growth.description;
  }

  if (growth?.days_to_harvest) {
    defaults.days_to_maturity_min = growth.days_to_harvest;
  }

  const spacing = mapSpacing(growth);
  if (spacing) {
    defaults.spacing_inches = spacing;
  }

  defaults.sun_requirement = mapSun(growth?.light);
  defaults.water_need = mapWater(growth?.atmospheric_humidity);

  if (growth?.sowing) {
    defaults.notes = `Sowing: ${growth.sowing}`;
  }

  return defaults;
}
