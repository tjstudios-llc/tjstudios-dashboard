import { create } from 'zustand';

interface DashboardState {
  metrics: {
    cpu: number;
    ram: number;
    storage: number;
    bots: number;
    apiReqs: number;
  };
  ui: {
    sidebarCollapsed: boolean;
    commandPaletteOpen: boolean;
    appLauncherOpen: boolean;
    notificationsOpen: boolean;
  };
  setMetrics: (metrics: Partial<DashboardState['metrics']>) => void;
  toggleSidebar: () => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setAppLauncherOpen: (open: boolean) => void;
  setNotificationsOpen: (open: boolean) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  metrics: {
    cpu: 42,
    ram: 68,
    storage: 47,
    bots: 12,
    apiReqs: 14205,
  },
  ui: {
    sidebarCollapsed: false,
    commandPaletteOpen: false,
    appLauncherOpen: false,
    notificationsOpen: false,
  },
  setMetrics: (metrics) => set((state) => ({ metrics: { ...state.metrics, ...metrics } })),
  toggleSidebar: () => set((state) => ({ ui: { ...state.ui, sidebarCollapsed: !state.ui.sidebarCollapsed } })),
  setCommandPaletteOpen: (open) => set((state) => ({ ui: { ...state.ui, commandPaletteOpen: open } })),
  setAppLauncherOpen: (open) => set((state) => ({ ui: { ...state.ui, appLauncherOpen: open } })),
  setNotificationsOpen: (open) => set((state) => ({ ui: { ...state.ui, notificationsOpen: open } })),
}));
