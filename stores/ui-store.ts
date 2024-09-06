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

  // FILTER SIDEBAR
  isFilterSidebarOpen: boolean
  openFilterSidebar: () => void
  closeFilterSidebar: () => void

  // WEB MODAL
}

export const useUIStore = create<UIState>()((set) => ({
  // Navbar State
  isNavbarOpen: false,
  openNavbar: () => set({ isNavbarOpen: true }),
  closeNavbar: () => set({ isNavbarOpen: false }),

  // Sidebar State
  isSidebarOpen: false,
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),

  // Filter Sidebar State
  isFilterSidebarOpen: false,
  openFilterSidebar: () => set({ isFilterSidebarOpen: true }),
  closeFilterSidebar: () => set({ isFilterSidebarOpen: false })
}))
