import { create } from 'zustand'

interface UIState {
  // NAVBAR
  isNavbarOpen: boolean
  openNavbar: () => void
  closeNavbar: () => void

  // SIDEBAR
  isSidebarOpen: boolean
  openSidebar: () => void
  closeSidebar: () => void

  // WEB MODAL
  isWebModalOpen: boolean
  openWebModal: () => void
  closeWebModal: () => void
}

export const useUIStore = create<UIState>((set) => ({
  // NAVBAR STATE
  isNavbarOpen: false,
  openNavbar: () => set({ isNavbarOpen: true }),
  closeNavbar: () => set({ isNavbarOpen: false }),

  // SIDEBAR STATE
  isSidebarOpen: false,
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),

  // WEB MODAL STATE
  isWebModalOpen: false,
  openWebModal: () => set({ isWebModalOpen: true }),
  closeWebModal: () => set({ isWebModalOpen: false })
}))
