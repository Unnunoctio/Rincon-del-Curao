'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'

interface StoresDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function StoresDialog({ open, onOpenChange }: StoresDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tiendas activas</DialogTitle>
                    <DialogDescription>
                        Selecciona las tiendas que quieres incluir en las comparaciones de precios.
                    </DialogDescription>
                </DialogHeader>
                {/* Contenido futuro: listado de tiendas con toggles */}
            </DialogContent>
        </Dialog>
    )
}
