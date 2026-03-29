"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Garden, GardenFeature } from "@/types/database";

export async function getGardens(): Promise<Garden[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("gardens")
    .select("*")
    .order("name");

  if (error) throw new Error(error.message);
  return data as Garden[];
}

export async function getGarden(id: string): Promise<Garden | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("gardens")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as Garden;
}

export async function getGardenFeatures(
  gardenId: string
): Promise<GardenFeature[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("garden_features")
    .select("*")
    .eq("garden_id", gardenId)
    .order("created_at");

  if (error) throw new Error(error.message);
  return data as GardenFeature[];
}

export async function createGarden(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const garden = {
    name: formData.get("name") as string,
    description: (formData.get("description") as string) || null,
    width_ft: formData.get("width_ft") ? Number(formData.get("width_ft")) : null,
    length_ft: formData.get("length_ft")
      ? Number(formData.get("length_ft"))
      : null,
    grid_size_ft: formData.get("grid_size_ft")
      ? Number(formData.get("grid_size_ft"))
      : 2,
    created_by: user.id,
  };

  const { data, error } = await supabase
    .from("gardens")
    .insert(garden)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/gardens");
  return { data: data as Garden };
}

export async function deleteGarden(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("gardens").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/gardens");
  return { success: true };
}

export async function seedBarnGarden() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Check if barn garden already exists for this user
  const { data: existing } = await supabase
    .from("gardens")
    .select("id")
    .eq("name", "Barn Garden")
    .eq("created_by", user.id)
    .maybeSingle();

  if (existing) {
    return { data: existing as { id: string } };
  }

  // Create garden
  const { data: garden, error: gardenError } = await supabase
    .from("gardens")
    .insert({
      name: "Barn Garden",
      description:
        "45ft x 80ft 1in. Outer fence along the south edge with 5 water spigots. Greenhouse in the upper-right area.",
      width_ft: 45,
      length_ft: 80.083,
      grid_size_ft: 2,
      created_by: user.id,
    })
    .select()
    .single();

  if (gardenError) return { error: gardenError.message };

  // Create fixtures from barn-garden-spec
  const fixtures = [
    {
      garden_id: garden.id,
      name: "Greenhouse",
      feature_type: "greenhouse",
      x: 57,
      y: 28.4,
      width: 10,
      height: 8,
      is_fixture: true,
      properties: { step_depth_ft: 2.667 },
    },
    {
      garden_id: garden.id,
      name: "Fence Gate",
      feature_type: "gate",
      x: 35.958,
      y: 0,
      width: 4.083,
      height: 0,
      is_fixture: true,
      properties: { edge: "bottom" },
    },
    {
      garden_id: garden.id,
      name: "Main Entry Gate",
      feature_type: "gate",
      x: 80.083,
      y: 7.75,
      width: 0,
      height: 4.25,
      is_fixture: true,
      properties: { edge: "right" },
    },
    ...[12, 26, 42, 55, 68].map((xPos, i) => ({
      garden_id: garden.id,
      name: `Spigot ${i + 1}`,
      feature_type: "water",
      x: xPos,
      y: 0,
      width: 0.5,
      height: 0.5,
      is_fixture: true,
      properties: {},
    })),
  ];

  const { error: featuresError } = await supabase
    .from("garden_features")
    .insert(fixtures);

  if (featuresError) return { error: featuresError.message };

  revalidatePath("/gardens");
  return { data: garden as Garden };
}

export async function createDefaultGardens() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const gardens = [
    {
      name: "Upper Garden",
      description:
        "~40x15 ft. Older slightly raised beds. Transitioning to mini-orchard and berry plot. Has Granny Smith apple, unknown sweet apple, new Fuji apple, peach, and persimmon trees. More shaded than lower garden.",
      width_ft: 15,
      length_ft: 40,
      created_by: user.id,
    },
    {
      name: "Lower Garden",
      description:
        "~60x40 ft. New space behind the barn, above the creek. Best sun exposure with a shaded area on the creek side (oak tree canopy). Small Costco greenhouse on-site. Metal trough raised beds from last year, otherwise open for design.",
      width_ft: 40,
      length_ft: 60,
      created_by: user.id,
    },
  ];

  const { error } = await supabase.from("gardens").insert(gardens);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { success: true };
}
