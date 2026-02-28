import {
  addWeeks,
  differenceInDays,
  format,
  isAfter,
  isBefore,
  parseISO,
  startOfDay,
} from "date-fns";
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

/** "Mar 15" */
export function formatDateShort(dateStr: string): string {
  return format(parseISO(dateStr), "MMM d");
}

/** "Mar 15, 2026" */
export function formatDateCompact(dateStr: string): string {
  return format(parseISO(dateStr), "MMM d, yyyy");
}

/** Days from today to the given date. Positive = future, negative = past. */
export function daysUntil(dateStr: string): number {
  return differenceInDays(
    startOfDay(parseISO(dateStr)),
    startOfDay(new Date())
  );
}

/** Classify a date as "this-week", "this-month", or "later" relative to today. */
export function timeframeBucket(
  dateStr: string
): "overdue" | "this-week" | "this-month" | "later" {
  const days = daysUntil(dateStr);
  if (days < 0) return "overdue";
  if (days <= 7) return "this-week";
  if (days <= 30) return "this-month";
  return "later";
}

/** Is today between two dates (inclusive)? */
export function isWithinRange(
  startStr: string | null,
  endStr: string | null
): boolean {
  const today = startOfDay(new Date());
  if (startStr && isBefore(today, startOfDay(parseISO(startStr)))) return false;
  if (endStr && isAfter(today, startOfDay(parseISO(endStr)))) return false;
  return true;
}
