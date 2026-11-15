import { create } from 'zustand';

interface DashboardState {
  ui: {
    sidebarCollapsed: boolean;
    commandPaletteOpen: boolean;
    appLauncherOpen: boolean;
    notificationsOpen: boolean;
  };
  toggleSidebar: () => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setAppLauncherOpen: (open: boolean) => void;
  setNotificationsOpen: (open: boolean) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  ui: {
    sidebarCollapsed: false,
    commandPaletteOpen: false,
    appLauncherOpen: false,
    notificationsOpen: false,
  },
  toggleSidebar: () => set((state) => ({ ui: { ...state.ui, sidebarCollapsed: !state.ui.sidebarCollapsed } })),
  setCommandPaletteOpen: (open) => set((state) => ({ ui: { ...state.ui, commandPaletteOpen: open } })),
  setAppLauncherOpen: (open) => set((state) => ({ ui: { ...state.ui, appLauncherOpen: open } })),
  setNotificationsOpen: (open) => set((state) => ({ ui: { ...state.ui, notificationsOpen: open } })),
}));
