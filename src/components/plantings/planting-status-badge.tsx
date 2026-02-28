import { Badge } from "@/components/ui/badge";
import {
  PLANTING_STATUS_LABELS,
  PLANTING_STATUS_COLORS,
} from "@/lib/constants";
import type { PlantingStatus } from "@/types/database";

export function PlantingStatusBadge({ status }: { status: PlantingStatus }) {
  return (
    <Badge variant="secondary" className={PLANTING_STATUS_COLORS[status]}>
      {PLANTING_STATUS_LABELS[status]}
    </Badge>
  );
}
