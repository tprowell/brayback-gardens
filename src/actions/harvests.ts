"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Harvest, Planting } from "@/types/database";

const HARVEST_SELECT = `
  *,
  planting:plantings(
    *,
    plant:plants(*),
    garden:gardens(*)
  )
`;

export async function getHarvests(): Promise<Harvest[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("harvests")
    .select(HARVEST_SELECT)
    .order("harvested_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Harvest[];
}

export async function getHarvestsForPlanting(
  plantingId: string
): Promise<Harvest[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("harvests")
    .select("*")
    .eq("planting_id", plantingId)
    .order("harvested_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Harvest[];
}

export async function getUpcomingHarvests(): Promise<Planting[]> {
  const supabase = await createClient();

  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("plantings")
    .select(`
      *,
      plant:plants(*),
      garden:gardens(*)
    `)
    .not("expected_harvest_at", "is", null)
    .not("status", "eq", "done")
    .gte("expected_harvest_at", today)
    .order("expected_harvest_at", { ascending: true });

  if (error) throw new Error(error.message);
  return data as Planting[];
}

export async function createHarvest(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const plantingId = formData.get("planting_id") as string;

  const harvest = {
    planting_id: plantingId,
    harvested_at: formData.get("harvested_at") as string,
    quantity: (formData.get("quantity") as string) || null,
    weight_oz: formData.get("weight_oz")
      ? Number(formData.get("weight_oz"))
      : null,
    notes: (formData.get("notes") as string) || null,
    created_by: user.id,
  };

  const { data, error } = await supabase
    .from("harvests")
    .insert(harvest)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/harvests");
  revalidatePath(`/plantings/${plantingId}`);
  revalidatePath("/dashboard");
  return { data: data as Harvest };
}

export async function deleteHarvest(id: string, plantingId: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("harvests").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/harvests");
  revalidatePath(`/plantings/${plantingId}`);
  revalidatePath("/dashboard");
  return { success: true };
}
