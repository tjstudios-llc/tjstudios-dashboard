import React from 'react';
import { Link, useLocation } from 'wouter';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboardStore } from '@/stores/dashboardStore';
import { 
  LayoutDashboard, Server, Database, HardDrive, 
  Activity, BarChart3, Users, Globe, CreditCard, 
  Settings, Search, Bell, Grid, Moon, Sun,
  Menu, X, Code2, LayoutTemplate, FolderOpen, ScrollText,
  Key, Terminal, Lock, Network, UserCircle, Wand2, AlertCircle
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Shell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const { ui, toggleSidebar } = useDashboardStore();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Deployments', path: '/deployments', icon: Server },
    { name: 'Workspaces', path: '/workspaces', icon: Code2 },
    { name: 'Wizard', path: '/wizard', icon: Wand2 },
    { name: 'Templates', path: '/templates', icon: LayoutTemplate },
    { name: 'Docker', path: '/docker', icon: Server },
    { name: 'Storage', path: '/storage', icon: HardDrive },
    { name: 'Files', path: '/files', icon: FolderOpen },
    { name: 'Databases', path: '/databases', icon: Database },
    { name: 'Monitoring', path: '/monitoring', icon: Activity },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Domains', path: '/domains', icon: Globe },
    { name: 'Nodes', path: '/nodes', icon: Network },
    { name: 'Audit', path: '/audit', icon: ScrollText },
    { name: 'Terminals', path: '/terminals', icon: Terminal },
    { name: 'API Keys', path: '/api-keys', icon: Key },
    { name: 'Env Vars', path: '/env', icon: Lock },
    { name: 'Notifications', path: '/notifications', icon: Bell },
    { name: 'Team', path: '/team', icon: Users },
    { name: 'Profile', path: '/profile', icon: UserCircle },
    { name: 'Billing', path: '/billing', icon: CreditCard },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-foreground">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: ui.sidebarCollapsed ? 64 : 240 }}
        className="hidden md:flex flex-col border-r border-border bg-card z-20"
      >
        <div className="h-14 flex items-center px-4 border-b border-border">
          {ui.sidebarCollapsed ? (
            <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary font-bold">TJ</div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary font-bold">TJ</div>
              <span className="font-bold text-lg tracking-tight">Studios</span>
            </div>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-1 px-2">
          {navItems.map((item) => {
            const isActive = location === item.path;
            const Icon = item.icon;
            
            return (
              <Link key={item.path} href={item.path}>
                <div 
                  className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-all ${
                    isActive 
                      ? 'bg-primary text-primary-foreground font-medium shadow-md shadow-primary/20' 
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                  data-testid={`nav-${item.name.toLowerCase()}`}
                  title={ui.sidebarCollapsed ? item.name : undefined}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {!ui.sidebarCollapsed && <span>{item.name}</span>}
                </div>
              </Link>
            );
          })}
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Navbar */}
        <header className="h-14 flex items-center justify-between px-4 border-b border-border bg-background/80 backdrop-blur-md z-30 sticky top-0">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hidden md:flex">
              <Menu className="w-5 h-5" />
            </Button>
            <div className="md:hidden font-bold text-lg">TJ Studios</div>
          </div>

          <div className="flex-1 max-w-md mx-4">
            <div 
              className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-md border border-border cursor-not-allowed opacity-70"
              
            >
              <Search className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground flex-1">Search is not connected</span>
              <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 rounded border border-border bg-background text-[10px] font-medium text-muted-foreground">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            
            <div className="relative">
              <Button variant="ghost" size="icon" disabled>
                <Bell className="w-5 h-5" />
              </Button>
            </div>
            
            <Button variant="ghost" size="icon" disabled>
              <Grid className="w-5 h-5" />
            </Button>
            
            <Avatar className="w-8 h-8 ml-2 cursor-pointer border border-border hover:border-primary transition-colors">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/20 text-primary text-xs">TJ</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6 relative z-10">
          <div className="mb-4 flex flex-wrap items-center gap-2 rounded-md border border-amber-500/30 bg-amber-500/5 px-3 py-2 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <Badge variant="outline">Prototype</Badge>
            <span>Live API integrations, authentication, and management actions are not connected. Operational data is intentionally blank.</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={location}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        
        {/* Mobile Bottom Dock */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border flex items-center justify-around px-2 z-40">
          {navItems.slice(0, 5).map((item) => (
            <Link key={item.path} href={item.path}>
              <div className={`flex flex-col items-center justify-center w-12 h-12 rounded-full ${location === item.path ? 'text-primary' : 'text-muted-foreground'}`}>
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] mt-1 font-medium">{item.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
