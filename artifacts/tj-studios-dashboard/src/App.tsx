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
