'use client'
import { createContext, useContext, useState } from "react";

interface UIContextType {
  sidebarSection: string | undefined;
  toggleSidebarSection: (section: string) => void;

  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;

  isNavbarOpen: boolean;
  toogleNavbar: () => void;

  isWebsModalOpen: boolean;
  openWebsModal: () => void;
  closeWebsModal: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined)

export const useUI = () => {
  const context = useContext(UIContext)
  if (!context) {
    throw new Error('useUI must be used within a UIContextProvider')
  }
  return context
}

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [sidebarSection, setSidebarSection] = useState<string | undefined>(undefined)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isNavbarOpen, setIsNavbarOpen] = useState(false)
  const [isWebsModalOpen, setIsWebsModalOpen] = useState(false)

  const toggleSidebarSection = (section: string) => {
    if (section === sidebarSection) setSidebarSection(undefined)
    else setSidebarSection(section)
  }

  const openSidebar = () => setIsSidebarOpen(true)
  const closeSidebar = () => setIsSidebarOpen(false)

  const toogleNavbar = () => setIsNavbarOpen(!isNavbarOpen)

  const openWebsModal = () => setIsWebsModalOpen(true)
  const closeWebsModal = () => setIsWebsModalOpen(false)

  const value = {
    sidebarSection,
    toggleSidebarSection,
    isSidebarOpen,
    openSidebar,
    closeSidebar,
    isNavbarOpen,
    toogleNavbar,
    isWebsModalOpen,
    openWebsModal,
    closeWebsModal
  }

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  )
}
