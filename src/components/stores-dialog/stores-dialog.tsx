'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { getCookie, setCookie } from '@/helpers/cookies'
import type { StoreInfo } from '@/types'
import { useState } from 'react'
import { StoreCheckbox } from './store-checkbox'
import { ToggleAll } from './store-toggle-all'

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    stores: StoreInfo[]
}

export function StoresDialog({ open, onOpenChange, stores }: Props) {
    const [selected, setSelected] = useState<string[]>(() => {
        const saved = getCookie('selectedStores')?.split(',').filter(Boolean) ?? []
        return saved.length > 0 ? saved : stores.map((s) => s.code)
    })
    const [error, setError] = useState(false)

    function toggle(code: string, checked: boolean) {
        setSelected((prev) => (checked ? [...prev, code] : prev.filter((c) => c !== code)))
        setError(false)
    }

    const allSelected = selected.length === stores.length
    const someSelected = selected.length > 0 && !allSelected

    function toggleAll() {
        setSelected(allSelected ? [] : stores.map((s) => s.code))
        setError(false)
    }

    function handleSave() {
        if (selected.length === 0) {
            setError(true)
            return
        }
        setCookie('selectedStores', selected.join(','))
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent showCloseButton className="sm:max-w-xl gap-2">
                <DialogHeader className="px-1 pt-1">
                    <DialogTitle>Tiendas</DialogTitle>
                    <DialogDescription>Selecciona las tiendas que quieres incluir en la comparación de precios.</DialogDescription>
                </DialogHeader>

                <ToggleAll allSelected={allSelected} someSelected={someSelected} onToggle={toggleAll} />

                <Separator />

                {/* Lista scrollable — patrón shadcn sticky footer */}
                <div className="-mx-4 no-scrollbar max-h-[50vh] min-h-50 overflow-y-auto px-4">
                    <div className="grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-4">
                        {stores.map((store) => (
                            <StoreCheckbox
                                key={store.code}
                                store={store}
                                checked={selected.includes(store.code)}
                                onChange={(checked) => toggle(store.code, checked)}
                            />
                        ))}
                    </div>
                </div>

                {error && <p className="text-xs text-destructive">Debes seleccionar al menos una tienda.</p>}

                <DialogFooter className="flex-row justify-end px-3 py-3">
                    <Button variant="ghost" size="default" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button size="default" onClick={handleSave}>
                        Guardar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
