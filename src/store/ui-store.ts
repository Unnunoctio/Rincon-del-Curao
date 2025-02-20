import { create } from 'zustand';

interface UIState {
  sidebarSection: string | null;
  toggleSidebarSection: (section: string) => void;

  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  sidebarSection: null,
  toggleSidebarSection: (section: string) => {
    if (section === get().sidebarSection) set({ sidebarSection: null });
    else set({ sidebarSection: section });
  },
  isSidebarOpen: false,
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
}));
