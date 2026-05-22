import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Shell from "./components/layout/Shell";
import Dashboard from "./pages/dashboard";
import Deployments from "./pages/deployments";
import Docker from "./pages/docker";
import Storage from "./pages/storage";
import Databases from "./pages/databases";
import Monitoring from "./pages/monitoring";
import Analytics from "./pages/analytics";
import Team from "./pages/team";
import Domains from "./pages/domains";
import Billing from "./pages/billing";
import Settings from "./pages/settings";
import Workspaces from "./pages/workspaces";
import Wizard from "./pages/wizard";
import Templates from "./pages/templates";
import ContainerDetail from "./pages/container-detail";
import Files from "./pages/files";
import AuditLogs from "./pages/audit";
import ApiKeys from "./pages/api-keys";
import Terminals from "./pages/terminals";
import EnvVars from "./pages/env";
import Nodes from "./pages/nodes";
import Notifications from "./pages/notifications";
import Profile from "./pages/profile";
import NotFound from "./pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Shell>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/deployments" component={Deployments} />
        <Route path="/docker" component={Docker} />
        <Route path="/storage" component={Storage} />
        <Route path="/databases" component={Databases} />
        <Route path="/monitoring" component={Monitoring} />
        <Route path="/analytics" component={Analytics} />
        <Route path="/team" component={Team} />
        <Route path="/domains" component={Domains} />
        <Route path="/billing" component={Billing} />
        <Route path="/settings" component={Settings} />
        
        <Route path="/workspaces" component={Workspaces} />
        <Route path="/wizard" component={Wizard} />
        <Route path="/templates" component={Templates} />
        <Route path="/containers/:id" component={ContainerDetail} />
        <Route path="/files" component={Files} />
        <Route path="/audit" component={AuditLogs} />
        <Route path="/api-keys" component={ApiKeys} />
        <Route path="/terminals" component={Terminals} />
        <Route path="/env" component={EnvVars} />
        <Route path="/nodes" component={Nodes} />
        <Route path="/notifications" component={Notifications} />
        <Route path="/profile" component={Profile} />

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
