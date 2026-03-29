"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlantForm } from "@/components/plants/plant-form";
import { ApiPlantSearch } from "@/components/plants/api-plant-search";
import { searchPerenual, getPerenualPlant } from "@/actions/perenual";
import { searchTrefle, getTreflePlant } from "@/actions/trefle";
import type { PlantDefaults, PlantSource } from "@/types/plant-search";
import { PLANT_SOURCE_LABELS } from "@/types/plant-search";

export default function NewPlantPage() {
  const [step, setStep] = useState<"search" | "form">("search");
  const [defaults, setDefaults] = useState<PlantDefaults | undefined>();
  const [source, setSource] = useState<PlantSource>("perenual");

  function handleSelect(data: PlantDefaults) {
    setDefaults(data);
    setStep("form");
  }

  function handleSkip() {
    setDefaults(undefined);
    setStep("form");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">Add New Plant</h1>

      {step === "search" ? (
        <>
          <p className="text-muted-foreground">
            Search for a plant to auto-fill growing details, or enter everything
            manually.
          </p>
          <Tabs
            value={source}
            onValueChange={(v) => setSource(v as PlantSource)}
          >
            <TabsList>
              <TabsTrigger value="perenual">
                {PLANT_SOURCE_LABELS.perenual}
              </TabsTrigger>
              <TabsTrigger value="trefle">
                {PLANT_SOURCE_LABELS.trefle}
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <ApiPlantSearch
            key={source}
            searchFn={source === "perenual" ? searchPerenual : searchTrefle}
            fetchFn={source === "perenual" ? getPerenualPlant : getTreflePlant}
            onSelect={handleSelect}
            onSkip={handleSkip}
          />
        </>
      ) : (
        <PlantForm key={JSON.stringify(defaults)} defaults={defaults} />
      )}
    </div>
  );
}
