import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Shell from "./components/layout/Shell";
import Dashboard from "./pages/dashboard";
import Deployments from "./pages/deployments";
import Docker from "./pages/docker";
import IntegrationPending from "./components/shared/IntegrationPending";
import NotFound from "./pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Shell>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/deployments" component={Deployments} />
        <Route path="/docker" component={Docker} />
        <Route path="/workspaces">
          <IntegrationPending title="Workspaces" description="Repository-backed workspaces, editor sessions, and collaboration are not connected yet." />
        </Route>
        <Route path="/wizard">
          <IntegrationPending title="Project wizard" description="Project creation will be enabled after the project and provisioning APIs are available." />
        </Route>
        <Route path="/templates">
          <IntegrationPending title="Templates" description="The template catalog and project generation actions are not connected to a real catalog yet." />
        </Route>
        <Route path="/containers/:id">
          <IntegrationPending title="Container details" description="Container details require a connected and authenticated Docker host." />
        </Route>
        <Route path="/storage">
          <IntegrationPending title="Storage" description="Storage usage, volumes, and object storage records are not connected yet." />
        </Route>
        <Route path="/files">
          <IntegrationPending title="Files" description="File browsing and file operations require an authenticated storage API." />
        </Route>
        <Route path="/databases">
          <IntegrationPending title="Databases" description="Database provisioning, connection details, and backup status are not connected yet." />
        </Route>
        <Route path="/monitoring">
          <IntegrationPending title="Monitoring" description="Live host metrics, service health, and alerting are not connected yet." />
        </Route>
        <Route path="/analytics">
          <IntegrationPending title="Analytics" description="Usage and billing analytics will appear after event collection is implemented." />
        </Route>
        <Route path="/team">
          <IntegrationPending title="Team" description="Team membership and role management require the platform identity and permissions APIs." />
        </Route>
        <Route path="/domains">
          <IntegrationPending title="Domains" description="Domain provisioning and DNS status are not connected yet." />
        </Route>
        <Route path="/billing">
          <IntegrationPending title="Billing" description="Plans, invoices, and usage charges are not connected to a billing provider." />
        </Route>
        <Route path="/settings">
          <IntegrationPending title="Settings" description="Account and platform settings will be enabled after the identity and configuration APIs are available." />
        </Route>
        <Route path="/audit">
          <IntegrationPending title="Audit logs" description="Audit events will appear after authenticated event collection and persistence are implemented." />
        </Route>
        <Route path="/api-keys">
          <IntegrationPending title="API keys" description="API key issuance, storage, revocation, and usage tracking are not implemented yet." />
        </Route>
        <Route path="/terminals">
          <IntegrationPending title="Terminals" description="Secure terminal sessions require an authenticated host agent and isolated execution environment." />
        </Route>
        <Route path="/env">
          <IntegrationPending title="Environment variables" description="Secret and environment variable management is not connected to a secure backend." />
        </Route>
        <Route path="/nodes">
          <IntegrationPending title="Nodes" description="Node registration, health, and scheduling are not connected to the server agent." />
        </Route>
        <Route path="/notifications">
          <IntegrationPending title="Notifications" description="Notifications and alert delivery require persisted events and delivery integrations." />
        </Route>
        <Route path="/profile">
          <IntegrationPending title="Profile" description="Profile details require an authenticated account session." />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Shell>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
