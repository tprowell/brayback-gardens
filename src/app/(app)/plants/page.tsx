import Link from "next/link";
import { getPlants } from "@/actions/plants";
import { PlantCard } from "@/components/plants/plant-card";
import { PlantSearch } from "@/components/plants/plant-search";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { PLANT_CATEGORIES, CATEGORY_LABELS } from "@/lib/constants";
import type { PlantCategory } from "@/types/database";

export default async function PlantsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = (category as PlantCategory) || undefined;
  const plants = await getPlants(activeCategory);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Plant Library</h1>
        <div className="flex items-center gap-2">
          <PlantSearch />
          <Button asChild size="sm">
            <Link href="/plants/new">
              <Plus className="mr-1 h-4 w-4" />
              Add Plant
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue={activeCategory || "all"}>
        <TabsList className="flex-wrap">
          <TabsTrigger value="all" asChild>
            <Link href="/plants">All</Link>
          </TabsTrigger>
          {PLANT_CATEGORIES.map((cat) => (
            <TabsTrigger key={cat} value={cat} asChild>
              <Link href={`/plants?category=${cat}`}>
                {CATEGORY_LABELS[cat]}
              </Link>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory || "all"} className="mt-4">
          {plants.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No plants found. Add your first plant to get started.
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {plants.map((plant) => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
