import { addWeeks, format, parseISO } from "date-fns";
import { LAST_FROST_DATE } from "./constants";

/**
 * Convert weeks-relative-to-frost into an actual date.
 * Negative = before frost, positive = after frost.
 */
export function frostRelativeToDate(weeksFromFrost: number): Date {
  return addWeeks(parseISO(LAST_FROST_DATE), weeksFromFrost);
}

export function formatPlantingWindow(
  startWeeks: number | null,
  endWeeks: number | null
): string {
  if (startWeeks === null || endWeeks === null) return "N/A";
  const start = frostRelativeToDate(startWeeks);
  const end = frostRelativeToDate(endWeeks);
  return `${format(start, "MMM d")} – ${format(end, "MMM d")}`;
}

export function weeksLabel(weeks: number): string {
  const abs = Math.abs(weeks);
  if (weeks < 0) return `${abs}w before last frost`;
  if (weeks > 0) return `${abs}w after last frost`;
  return "at last frost";
}
