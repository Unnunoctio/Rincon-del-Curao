'use client'

import { StoresDialog } from '@/components/stores-dialog'
import type { StoreInfo } from '@/types'
import { createContext, useContext, useState } from 'react'

interface StoresContextValue {
    stores: StoreInfo[]
    open: () => void
}

const StoresContext = createContext<StoresContextValue | null>(null)

export function useStores() {
    const ctx = useContext(StoresContext)
    if (!ctx) throw new Error('useStores must be used within StoresProvider')
    return ctx
}

export function StoresProvider({ children, stores }: { children: React.ReactNode; stores: StoreInfo[] }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <StoresContext.Provider value={{ stores, open: () => setIsOpen(true) }}>
            {children}
            <StoresDialog key={isOpen ? 'open' : 'closed'} open={isOpen} onOpenChange={setIsOpen} stores={stores} />
        </StoresContext.Provider>
    )
}
