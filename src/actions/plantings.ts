"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Planting, PlantingStatus } from "@/types/database";

const PLANTING_SELECT = `
  *,
  plant:plants(*),
  garden:gardens(*)
`;

export async function getPlantings(opts?: {
  status?: PlantingStatus;
  year?: number;
}): Promise<Planting[]> {
  const supabase = await createClient();

  let query = supabase
    .from("plantings")
    .select(PLANTING_SELECT)
    .order("created_at", { ascending: false });

  if (opts?.status) {
    query = query.eq("status", opts.status);
  }

  if (opts?.year) {
    query = query
      .gte("created_at", `${opts.year}-01-01`)
      .lt("created_at", `${opts.year + 1}-01-01`);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data as Planting[];
}

export async function getPlanting(id: string): Promise<Planting | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("plantings")
    .select(PLANTING_SELECT)
    .eq("id", id)
    .single();

  if (error) return null;
  return data as Planting;
}

export async function getActivePlantings(): Promise<Planting[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("plantings")
    .select(PLANTING_SELECT)
    .not("status", "eq", "done")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Planting[];
}

export async function createPlanting(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const status = (formData.get("status") as PlantingStatus) || "planned";

  const planting = {
    plant_id: formData.get("plant_id") as string,
    garden_id: (formData.get("garden_id") as string) || null,
    status,
    quantity: formData.get("quantity")
      ? Number(formData.get("quantity"))
      : null,
    planted_at: (formData.get("planted_at") as string) || null,
    started_indoors_at:
      (formData.get("started_indoors_at") as string) || null,
    transplanted_at: (formData.get("transplanted_at") as string) || null,
    notes: (formData.get("notes") as string) || null,
    created_by: user.id,
  };

  const { data, error } = await supabase
    .from("plantings")
    .insert(planting)
    .select(PLANTING_SELECT)
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/plantings");
  revalidatePath("/dashboard");
  return { data: data as Planting };
}

export async function updatePlanting(id: string, formData: FormData) {
  const supabase = await createClient();

  const updates = {
    plant_id: formData.get("plant_id") as string,
    garden_id: (formData.get("garden_id") as string) || null,
    status: formData.get("status") as PlantingStatus,
    quantity: formData.get("quantity")
      ? Number(formData.get("quantity"))
      : null,
    planted_at: (formData.get("planted_at") as string) || null,
    started_indoors_at:
      (formData.get("started_indoors_at") as string) || null,
    transplanted_at: (formData.get("transplanted_at") as string) || null,
    notes: (formData.get("notes") as string) || null,
  };

  const { error } = await supabase
    .from("plantings")
    .update(updates)
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/plantings");
  revalidatePath(`/plantings/${id}`);
  revalidatePath("/dashboard");
  return { success: true };
}

export async function updatePlantingStatus(
  id: string,
  status: PlantingStatus
) {
  const supabase = await createClient();

  const now = new Date().toISOString().split("T")[0];

  // Auto-fill date fields on status advancement
  const dateUpdates: Record<string, string> = {};
  if (status === "started") dateUpdates.started_indoors_at = now;
  if (status === "transplanted") dateUpdates.transplanted_at = now;
  if (status === "growing") dateUpdates.planted_at = now;
  if (status === "done") dateUpdates.finished_at = now;

  const { error } = await supabase
    .from("plantings")
    .update({ status, ...dateUpdates })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/plantings");
  revalidatePath(`/plantings/${id}`);
  revalidatePath("/dashboard");
  return { success: true };
}

export async function deletePlanting(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("plantings").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/plantings");
  revalidatePath("/dashboard");
  return { success: true };
}
