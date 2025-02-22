import { create } from 'zustand';

interface UIState {
  sidebarSection: string | undefined;
  toggleSidebarSection: (section: string) => void;

  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;

  isWebsModalOpen: boolean;
  openWebsModal: () => void;
  closeWebsModal: () => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  sidebarSection: undefined,
  toggleSidebarSection: (section: string) => {
    if (section === get().sidebarSection) set({ sidebarSection: undefined });
    else set({ sidebarSection: section });
  },

  isSidebarOpen: false,
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),

  isWebsModalOpen: false,
  openWebsModal: () => set({ isWebsModalOpen: true }),
  closeWebsModal: () => set({ isWebsModalOpen: false }),
}));
