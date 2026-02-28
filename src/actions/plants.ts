"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Plant, PlantCategory } from "@/types/database";

export async function getPlants(category?: PlantCategory): Promise<Plant[]> {
  const supabase = await createClient();

  let query = supabase
    .from("plants")
    .select("*")
    .order("category")
    .order("name");

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data as Plant[];
}

export async function searchPlants(query: string): Promise<Plant[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("plants")
    .select("*")
    .or(`name.ilike.%${query}%,variety.ilike.%${query}%`)
    .order("name")
    .limit(20);

  if (error) throw new Error(error.message);
  return data as Plant[];
}

export async function getPlant(id: string): Promise<Plant | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("plants")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as Plant;
}

export async function createPlant(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const preserveMethods = formData.getAll("preserve_methods") as string[];

  const plant = {
    name: formData.get("name") as string,
    variety: (formData.get("variety") as string) || null,
    category: formData.get("category") as PlantCategory,
    description: (formData.get("description") as string) || null,
    days_to_maturity_min: formData.get("days_to_maturity_min")
      ? Number(formData.get("days_to_maturity_min"))
      : null,
    days_to_maturity_max: formData.get("days_to_maturity_max")
      ? Number(formData.get("days_to_maturity_max"))
      : null,
    spacing_inches: formData.get("spacing_inches")
      ? Number(formData.get("spacing_inches"))
      : null,
    sun_requirement: (formData.get("sun_requirement") as string) || "full_sun",
    water_need: (formData.get("water_need") as string) || "moderate",
    planting_method: (formData.get("planting_method") as string) || "both",
    indoor_start_weeks: formData.get("indoor_start_weeks")
      ? Number(formData.get("indoor_start_weeks"))
      : null,
    indoor_end_weeks: formData.get("indoor_end_weeks")
      ? Number(formData.get("indoor_end_weeks"))
      : null,
    transplant_start_weeks: formData.get("transplant_start_weeks")
      ? Number(formData.get("transplant_start_weeks"))
      : null,
    transplant_end_weeks: formData.get("transplant_end_weeks")
      ? Number(formData.get("transplant_end_weeks"))
      : null,
    direct_sow_start_weeks: formData.get("direct_sow_start_weeks")
      ? Number(formData.get("direct_sow_start_weeks"))
      : null,
    direct_sow_end_weeks: formData.get("direct_sow_end_weeks")
      ? Number(formData.get("direct_sow_end_weeks"))
      : null,
    companion_plants: (formData.get("companion_plants") as string) || null,
    avoid_near: (formData.get("avoid_near") as string) || null,
    harvest_instructions:
      (formData.get("harvest_instructions") as string) || null,
    preserve_methods: preserveMethods.length > 0 ? preserveMethods : null,
    preserve_notes: (formData.get("preserve_notes") as string) || null,
    notes: (formData.get("notes") as string) || null,
    is_default: false,
    created_by: user.id,
  };

  const { data, error } = await supabase
    .from("plants")
    .insert(plant)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/plants");
  return { data: data as Plant };
}

export async function updatePlant(id: string, formData: FormData) {
  const supabase = await createClient();

  const preserveMethods = formData.getAll("preserve_methods") as string[];

  const updates = {
    name: formData.get("name") as string,
    variety: (formData.get("variety") as string) || null,
    category: formData.get("category") as PlantCategory,
    description: (formData.get("description") as string) || null,
    days_to_maturity_min: formData.get("days_to_maturity_min")
      ? Number(formData.get("days_to_maturity_min"))
      : null,
    days_to_maturity_max: formData.get("days_to_maturity_max")
      ? Number(formData.get("days_to_maturity_max"))
      : null,
    spacing_inches: formData.get("spacing_inches")
      ? Number(formData.get("spacing_inches"))
      : null,
    sun_requirement: (formData.get("sun_requirement") as string) || "full_sun",
    water_need: (formData.get("water_need") as string) || "moderate",
    planting_method: (formData.get("planting_method") as string) || "both",
    indoor_start_weeks: formData.get("indoor_start_weeks")
      ? Number(formData.get("indoor_start_weeks"))
      : null,
    indoor_end_weeks: formData.get("indoor_end_weeks")
      ? Number(formData.get("indoor_end_weeks"))
      : null,
    transplant_start_weeks: formData.get("transplant_start_weeks")
      ? Number(formData.get("transplant_start_weeks"))
      : null,
    transplant_end_weeks: formData.get("transplant_end_weeks")
      ? Number(formData.get("transplant_end_weeks"))
      : null,
    direct_sow_start_weeks: formData.get("direct_sow_start_weeks")
      ? Number(formData.get("direct_sow_start_weeks"))
      : null,
    direct_sow_end_weeks: formData.get("direct_sow_end_weeks")
      ? Number(formData.get("direct_sow_end_weeks"))
      : null,
    companion_plants: (formData.get("companion_plants") as string) || null,
    avoid_near: (formData.get("avoid_near") as string) || null,
    harvest_instructions:
      (formData.get("harvest_instructions") as string) || null,
    preserve_methods: preserveMethods.length > 0 ? preserveMethods : null,
    preserve_notes: (formData.get("preserve_notes") as string) || null,
    notes: (formData.get("notes") as string) || null,
  };

  const { error } = await supabase.from("plants").update(updates).eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/plants");
  revalidatePath(`/plants/${id}`);
  return { success: true };
}

export async function deletePlant(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("plants").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/plants");
  return { success: true };
}
