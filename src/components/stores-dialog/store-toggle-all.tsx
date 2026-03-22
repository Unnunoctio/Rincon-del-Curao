'use client'

import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface Props {
    allSelected: boolean
    someSelected: boolean
    onToggle: () => void
}

export function ToggleAll({ allSelected, someSelected, onToggle }: Props) {
    return (
        <label className="flex items-center gap-2.5 w-fit cursor-pointer select-none group py-1.5" onClick={onToggle}>
            <div
                className={cn(
                    'flex size-4 shrink-0 items-center justify-center rounded-md border transition-colors',
                    allSelected
                        ? 'bg-primary border-primary text-primary-foreground'
                        : someSelected
                          ? 'bg-primary/30 border-primary text-primary-foreground'
                          : 'border-border bg-transparent group-hover:border-primary/60'
                )}
            >
                {allSelected ? (
                    <Check className="size-2.5 stroke-3" />
                ) : someSelected ? (
                    <span className="block w-2 h-0.5 bg-primary rounded-full" />
                ) : null}
            </div>
            <span className="text-sm text-muted-foreground">{allSelected ? 'Deseleccionar todas' : 'Seleccionar todas'}</span>
        </label>
    )
}
