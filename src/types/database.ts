export type PlantCategory =
  | "vegetable"
  | "fruit"
  | "berry"
  | "herb"
  | "flower";

export type SunRequirement =
  | "full_sun"
  | "partial_sun"
  | "partial_shade"
  | "full_shade";

export type WaterNeed = "low" | "moderate" | "high";

export type PlantingMethod = "direct_sow" | "transplant" | "both";

export type PlantingStatus =
  | "planned"
  | "started"
  | "transplanted"
  | "growing"
  | "harvesting"
  | "done";

export type TaskStatus = "todo" | "done";
export type TaskSource = "auto" | "manual";

export type FeatureType =
  | "bed"
  | "tree"
  | "greenhouse"
  | "structure"
  | "path"
  | "water"
  | "seating"
  | "gate"
  | "other";

export type PreserveMethod =
  | "canning"
  | "freezing"
  | "drying"
  | "fermenting"
  | "jam"
  | "other";

export interface Profile {
  id: string;
  display_name: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Garden {
  id: string;
  name: string;
  description: string | null;
  width_ft: number | null;
  length_ft: number | null;
  grid_size_ft: number;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface GardenFeature {
  id: string;
  garden_id: string;
  name: string;
  feature_type: FeatureType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  points: { x: number; y: number }[] | null;
  properties: Record<string, unknown> | null;
  is_fixture: boolean;
  notes: string | null;
  created_at: string;
}

export interface GardenPlant {
  id: string;
  feature_id: string;
  plant_id: string;
  grid_x: number;
  grid_y: number;
  quantity: number;
  created_at: string;
  plant?: Plant;
}

export interface Plant {
  id: string;
  name: string;
  variety: string | null;
  category: PlantCategory;
  description: string | null;
  days_to_maturity_min: number | null;
  days_to_maturity_max: number | null;
  spacing_inches: number | null;
  sun_requirement: SunRequirement;
  water_need: WaterNeed;
  planting_method: PlantingMethod;
  // Weeks relative to last frost (negative = before)
  indoor_start_weeks: number | null;
  indoor_end_weeks: number | null;
  transplant_start_weeks: number | null;
  transplant_end_weeks: number | null;
  direct_sow_start_weeks: number | null;
  direct_sow_end_weeks: number | null;
  companion_plants: string | null;
  avoid_near: string | null;
  harvest_instructions: string | null;
  preserve_methods: PreserveMethod[] | null;
  preserve_notes: string | null;
  notes: string | null;
  is_default: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Planting {
  id: string;
  plant_id: string;
  garden_id: string | null;
  feature_id: string | null;
  status: PlantingStatus;
  quantity: number | null;
  planted_at: string | null;
  started_indoors_at: string | null;
  transplanted_at: string | null;
  expected_harvest_at: string | null;
  first_harvest_at: string | null;
  finished_at: string | null;
  notes: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  // Joined
  plant?: Plant;
  garden?: Garden;
}

export interface Harvest {
  id: string;
  planting_id: string;
  harvested_at: string;
  quantity: string | null;
  weight_oz: number | null;
  notes: string | null;
  created_by: string;
  created_at: string;
  // Joined
  planting?: Planting;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  source: TaskSource;
  due_date: string | null;
  completed_at: string | null;
  assigned_to: string | null;
  planting_id: string | null;
  garden_id: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: string;
  body: string;
  garden_id: string | null;
  feature_id: string | null;
  plant_id: string | null;
  planting_id: string | null;
  image_url: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}
