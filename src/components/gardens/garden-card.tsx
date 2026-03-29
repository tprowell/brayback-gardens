import Link from "next/link";
import type { Garden } from "@/types/database";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Map } from "lucide-react";

export function GardenCard({ garden }: { garden: Garden }) {
  return (
    <Link href={`/gardens/${garden.id}/design`}>
      <Card className="hover:bg-accent/50 transition-colors">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Map className="h-4 w-4 text-green-600" />
            <CardTitle className="text-base">{garden.name}</CardTitle>
          </div>
          {garden.description && (
            <CardDescription className="line-clamp-2">
              {garden.description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {garden.width_ft && garden.length_ft && (
            <p className="text-sm text-muted-foreground">
              {garden.length_ft}&prime; &times; {garden.width_ft}&prime;
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
