import React from "react";
import { GitBranch, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Deployments() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-bold tracking-tight">Deployments</h1>
        <Badge variant="outline">Integration pending</Badge>
      </div>
      <p className="text-muted-foreground">Build and release history for connected applications.</p>

      <Card className="border-dashed">
        <CardHeader className="flex flex-row items-center gap-3 space-y-0">
          <GitBranch className="h-6 w-6 text-muted-foreground" />
          <div className="space-y-1">
            <CardTitle>No deployment provider connected</CardTitle>
            <CardDescription>
              Deployment records will appear here after the build and deployment API is implemented.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex items-start gap-2 text-sm text-muted-foreground">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
          No sample projects, fake build statuses, or placeholder deployment actions are displayed.
        </CardContent>
      </Card>
    </div>
  );
}
