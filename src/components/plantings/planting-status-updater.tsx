"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronRight } from "lucide-react";
import { updatePlantingStatus } from "@/actions/plantings";
import {
  PLANTING_STATUS_ORDER,
  PLANTING_STATUS_LABELS,
} from "@/lib/constants";
import type { PlantingStatus } from "@/types/database";

export function PlantingStatusUpdater({
  plantingId,
  currentStatus,
}: {
  plantingId: string;
  currentStatus: PlantingStatus;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const currentIdx = PLANTING_STATUS_ORDER.indexOf(currentStatus);
  const nextStatus =
    currentIdx < PLANTING_STATUS_ORDER.length - 1
      ? PLANTING_STATUS_ORDER[currentIdx + 1]
      : null;

  async function handleAdvance() {
    if (!nextStatus) return;
    setLoading(true);
    await updatePlantingStatus(plantingId, nextStatus);
    router.refresh();
    setLoading(false);
  }

  async function handleSetStatus(status: PlantingStatus) {
    setLoading(true);
    await updatePlantingStatus(plantingId, status);
    router.refresh();
    setLoading(false);
  }

  if (currentStatus === "done") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" disabled={loading}>
            Change Status <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {PLANTING_STATUS_ORDER.filter((s) => s !== currentStatus).map(
            (s) => (
              <DropdownMenuItem key={s} onClick={() => handleSetStatus(s)}>
                {PLANTING_STATUS_LABELS[s]}
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        disabled={loading || !nextStatus}
        onClick={handleAdvance}
      >
        {loading ? "Updating..." : `Advance to ${nextStatus ? PLANTING_STATUS_LABELS[nextStatus] : ""}`}
        {!loading && <ChevronRight className="ml-1 h-4 w-4" />}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" disabled={loading}>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {PLANTING_STATUS_ORDER.filter((s) => s !== currentStatus).map(
            (s) => (
              <DropdownMenuItem key={s} onClick={() => handleSetStatus(s)}>
                {PLANTING_STATUS_LABELS[s]}
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
