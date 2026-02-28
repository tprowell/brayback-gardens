"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Garden } from "@/types/database";

export async function getGardens(): Promise<Garden[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("gardens")
    .select("*")
    .order("name");

  if (error) throw new Error(error.message);
  return data as Garden[];
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
    created_by: user.id,
  };

  const { error } = await supabase.from("gardens").insert(garden);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { success: true };
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
