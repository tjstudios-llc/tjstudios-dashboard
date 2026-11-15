import React from "react";
import { ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface IntegrationPendingProps {
  title: string;
  description: string;
}

export default function IntegrationPending({
  title,
  description,
}: IntegrationPendingProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <Badge variant="outline">Integration pending</Badge>
      </div>
      <Card className="border-dashed">
        <CardHeader className="flex flex-row items-center gap-3 space-y-0">
          <ShieldAlert className="h-6 w-6 shrink-0 text-amber-600 dark:text-amber-400" />
          <div className="space-y-1">
            <CardTitle>{title} is not connected</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          This section will remain empty until a real, authenticated API integration is available. No sample records or simulated status values are displayed.
        </CardContent>
      </Card>
    </div>
  );
}
