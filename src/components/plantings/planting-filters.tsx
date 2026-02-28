"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PLANTING_STATUSES,
  PLANTING_STATUS_LABELS,
} from "@/lib/constants";

export function PlantingFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status") || "all";
  const currentYear = searchParams.get("year") || "all";

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/plantings?${params.toString()}`);
  }

  const currentYearNum = new Date().getFullYear();
  const years = [currentYearNum, currentYearNum - 1, currentYearNum - 2];

  return (
    <div className="flex flex-wrap gap-3">
      <Select
        value={currentStatus}
        onValueChange={(v) => updateParam("status", v)}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="All statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          {PLANTING_STATUSES.map((s) => (
            <SelectItem key={s} value={s}>
              {PLANTING_STATUS_LABELS[s]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={currentYear}
        onValueChange={(v) => updateParam("year", v)}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="All years" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Years</SelectItem>
          {years.map((y) => (
            <SelectItem key={y} value={y.toString()}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
