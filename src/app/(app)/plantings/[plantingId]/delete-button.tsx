"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deletePlanting } from "@/actions/plantings";

export function DeletePlantingButton({ plantingId }: { plantingId: string }) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);
    await deletePlanting(plantingId);
    router.push("/plantings");
  }

  if (confirming) {
    return (
      <div className="flex gap-2">
        <Button
          variant="destructive"
          size="sm"
          disabled={loading}
          onClick={handleDelete}
        >
          {loading ? "Deleting..." : "Confirm"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setConfirming(false)}
        >
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setConfirming(true)}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
