import { notFound } from "next/navigation";
import { getGarden, getGardenFeatures } from "@/actions/gardens";
import { GardenDesigner } from "@/components/gardens/designer/garden-designer";

export default async function GardenDesignPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [garden, features] = await Promise.all([
    getGarden(id),
    getGardenFeatures(id),
  ]);

  if (!garden) notFound();

  return <GardenDesigner garden={garden} features={features} />;
}
