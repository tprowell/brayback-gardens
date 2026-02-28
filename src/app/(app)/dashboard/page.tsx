import { createClient } from "@/lib/supabase/server";
import { getGardens } from "@/actions/gardens";
import { FirstRunDialog } from "@/components/layout/first-run-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Leaf, Sprout, StickyNote, CheckSquare } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const gardens = await getGardens();
  const showFirstRun = gardens.length === 0;

  const displayName =
    user?.user_metadata?.display_name || user?.email || "there";
  const firstName = displayName.split(" ")[0];

  return (
    <div className="space-y-6">
      {showFirstRun && <FirstRunDialog />}

      <div>
        <h1 className="text-2xl font-bold">Hey, {firstName}!</h1>
        <p className="text-muted-foreground">
          Here&apos;s what&apos;s happening in your gardens.
        </p>
      </div>

      {/* Quick actions */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/plants">
          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="flex items-center gap-3 pt-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <Leaf className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Plant Library</p>
                <p className="text-xs text-muted-foreground">
                  Browse & add plants
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/plantings">
          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="flex items-center gap-3 pt-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                <Sprout className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="font-medium">Plantings</p>
                <p className="text-xs text-muted-foreground">
                  Log what you&apos;ve planted
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/tasks">
          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="flex items-center gap-3 pt-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <CheckSquare className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Tasks</p>
                <p className="text-xs text-muted-foreground">
                  What to do this week
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/notes">
          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="flex items-center gap-3 pt-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                <StickyNote className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium">Notes</p>
                <p className="text-xs text-muted-foreground">
                  Garden observations
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Gardens */}
      {gardens.length > 0 && (
        <div>
          <h2 className="mb-3 text-lg font-semibold">Your Gardens</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {gardens.map((garden) => (
              <Card key={garden.id}>
                <CardHeader>
                  <CardTitle>{garden.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  {garden.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {garden.description}
                    </p>
                  )}
                  {garden.width_ft && garden.length_ft && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      {garden.length_ft} x {garden.width_ft} ft
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Season info */}
      <Card>
        <CardHeader>
          <CardTitle>Season Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 text-sm sm:grid-cols-3">
            <div>
              <p className="font-medium">Zone</p>
              <p className="text-muted-foreground">9a/9b — Laytonville, CA</p>
            </div>
            <div>
              <p className="font-medium">Last Frost</p>
              <p className="text-muted-foreground">~May 1, 2026</p>
            </div>
            <div>
              <p className="font-medium">Season</p>
              <p className="text-muted-foreground">
                Seeds can go in the greenhouse now!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
