'use client'

import { cn } from '@/lib/utils'
import type { StoreInfo } from '@/types'
import { Check } from 'lucide-react'

interface Props {
    store: StoreInfo
    checked: boolean
    onChange: (checked: boolean) => void
}

export function StoreCheckbox({ store, checked, onChange }: Props) {
    return (
        <label className="flex items-center gap-2.5 w-fit cursor-pointer select-none group py-1.5">
            <div
                className={cn(
                    'flex size-4 shrink-0 items-center justify-center rounded-md border transition-colors',
                    checked ? 'bg-primary border-primary text-primary-foreground' : 'border-border bg-transparent group-hover:border-primary/60'
                )}
            >
                {checked && <Check className="size-2.5 stroke-3" />}
            </div>
            <input type="checkbox" value={store.code} checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only" />
            <span className="text-sm">{store.name}</span>
        </label>
    )
}
