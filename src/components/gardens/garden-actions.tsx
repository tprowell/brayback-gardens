"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, Download, Loader2 } from "lucide-react";
import { seedBarnGarden } from "@/actions/gardens";

export function GardenActions() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSeedBarnGarden() {
    setLoading(true);
    const result = await seedBarnGarden();
    setLoading(false);
    if (result.data) {
      router.push(`/gardens/${result.data.id}/design`);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleSeedBarnGarden}
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="mr-1 h-4 w-4 animate-spin" />
        ) : (
          <Download className="mr-1 h-4 w-4" />
        )}
        Load Barn Garden
      </Button>
      <Button asChild size="sm">
        <Link href="/gardens/new">
          <Plus className="mr-1 h-4 w-4" />
          New Garden
        </Link>
      </Button>
    </div>
  );
}
