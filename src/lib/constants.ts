export const PLANT_CATEGORIES = [
  "vegetable",
  "fruit",
  "berry",
  "herb",
  "flower",
] as const;

export type PlantCategory = (typeof PLANT_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<PlantCategory, string> = {
  vegetable: "Vegetables",
  fruit: "Fruit",
  berry: "Berries",
  herb: "Herbs",
  flower: "Flowers",
};

export const SUN_REQUIREMENTS = [
  "full_sun",
  "partial_sun",
  "partial_shade",
  "full_shade",
] as const;

export const SUN_LABELS: Record<string, string> = {
  full_sun: "Full Sun",
  partial_sun: "Partial Sun",
  partial_shade: "Partial Shade",
  full_shade: "Full Shade",
};

export const WATER_NEEDS = ["low", "moderate", "high"] as const;

export const WATER_LABELS: Record<string, string> = {
  low: "Low",
  moderate: "Moderate",
  high: "High",
};

export const PLANTING_METHODS = [
  "direct_sow",
  "transplant",
  "both",
] as const;

export const PLANTING_STATUSES = [
  "planned",
  "started",
  "transplanted",
  "growing",
  "harvesting",
  "done",
] as const;

export const TASK_STATUSES = ["todo", "done"] as const;

// Laytonville, CA — approximate last frost date
export const LAST_FROST_DATE = "2026-05-01";
export const ZONE = "9a/9b";
