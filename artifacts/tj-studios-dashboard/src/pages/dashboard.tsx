import React from "react";
import { Activity, Box, Database, HardDrive, Server, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const integrations = [
  { title: "Host metrics", description: "CPU, memory, disk, and uptime from an authenticated host agent.", icon: Activity },
  { title: "Containers", description: "Live Docker inventory, status, logs, and resource usage.", icon: Box },
  { title: "Deployments", description: "Build status, deployment history, and release details.", icon: Server },
  { title: "Databases", description: "Provisioned database instances, health, and backups.", icon: Database },
  { title: "Storage", description: "Real files, volumes, and storage usage from connected services.", icon: HardDrive },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-muted-foreground">TJ Studios platform status and connected resources.</p>
        </div>
        <Badge variant="outline">Not connected</Badge>
      </div>

      <Card className="border-dashed">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-amber-500/10 p-3">
              <ShieldAlert className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="space-y-1">
              <CardTitle>No live platform connection</CardTitle>
              <CardDescription>
                The current API exposes a health endpoint only. It does not provide operational resource data yet.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6 text-muted-foreground">
            No CPU, memory, uptime, deployment, container, database, or activity values are being fabricated.
            This overview will populate when authenticated API endpoints and host integrations are implemented.
          </p>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold">Planned integrations</h2>
          <p className="text-sm text-muted-foreground">
            These resource panels are not active until connected to real services.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {integrations.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title}>
                <CardHeader className="flex flex-row items-start gap-3 space-y-0">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-base">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
