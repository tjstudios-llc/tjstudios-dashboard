import React from "react";
import { Box, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Docker() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-bold tracking-tight">Docker</h1>
        <Badge variant="outline">Host not connected</Badge>
      </div>
      <p className="text-muted-foreground">Container inventory and lifecycle management.</p>

      <Card className="border-dashed">
        <CardHeader className="flex flex-row items-center gap-3 space-y-0">
          <Box className="h-6 w-6 text-muted-foreground" />
          <div className="space-y-1">
            <CardTitle>No Docker host connected</CardTitle>
            <CardDescription>
              The dashboard API does not currently expose Docker endpoints.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex items-start gap-2 text-sm text-muted-foreground">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
          No container names, states, CPU values, memory values, or port mappings will be shown until a real host integration is available.
        </CardContent>
      </Card>
    </div>
  );
}
