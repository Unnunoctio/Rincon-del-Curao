'use client'

import { StoresDialog } from '@/components/stores-dialog'
import { createContext, useContext, useState } from 'react'

interface StoresContextValue {
    open: () => void
}

const StoresContext = createContext<StoresContextValue | null>(null)

export function useStores() {
    const ctx = useContext(StoresContext)
    if (!ctx) throw new Error('useStores must be used within StoresProvider')
    return ctx
}

export function StoresProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <StoresContext.Provider value={{ open: () => setIsOpen(true) }}>
            {children}
            <StoresDialog open={isOpen} onOpenChange={setIsOpen} />
        </StoresContext.Provider>
    )
}
