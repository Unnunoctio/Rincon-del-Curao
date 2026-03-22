'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import type { ProductView } from '@/types'
import { cn } from '@/lib/utils'
import { Flame, ShoppingBag, TrendingDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

/* ─── helpers ─────────────────────────────────────────────── */

function clp(value: number) {
    return value.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 })
}

/* ─── ProductCard ─────────────────────────────────────────── */

export function ProductCard({ product }: { product: ProductView }) {
    const saved = product.average - product.bestPrice
    const isHot = product.discount >= 30

    return (
        <Link
            href={`/product/${product.slug}`}
            className={cn(
                'group relative w-full max-w-62.5 flex flex-col rounded-lg overflow-hidden border transition-all duration-200',
                isHot
                    ? 'border-primary/60 shadow-[0_0_0_1px_hsl(var(--primary)/0.15)] hover:border-primary hover:shadow-[0_0_0_3px_hsl(var(--primary)/0.12)]'
                    : 'border-border hover:border-primary/40 hover:shadow-md'
            )}
        >
            {/* Imagen cuadrada full-bleed */}
            <div className="relative aspect-square w-full bg-muted/40">
                {product.image ? (
                    <Image src={product.image} alt={product.title} fill className="object-cover" sizes="220px" />
                ) : (
                    <ShoppingBag className="absolute inset-0 m-auto size-14 text-muted-foreground/15" />
                )}

                {product.image && (
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/14 to-transparent" />
                )}

                {/* badge descuento — top left */}
                {product.discount > 0 && (
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md bg-primary text-primary-foreground">
                        {isHot && <Flame className="size-3 shrink-0" />}-{product.discount}%
                    </div>
                )}

                {/* precio + ahorro — bottom */}
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-1.5 px-2.5 py-2.5">
                    <span className={cn('text-base font-bold leading-none tabular-nums drop-shadow-md', isHot ? 'text-primary' : 'text-white')}>
                        {clp(product.bestPrice)}
                    </span>

                    {saved > 0 && (
                        <span className="flex items-center gap-1 bg-emerald-500/25 backdrop-blur-sm border border-emerald-500/30 text-emerald-400 text-[11px] font-bold px-2 py-1 rounded-md tabular-nums shrink-0">
                            <TrendingDown className="size-3 shrink-0" />
                            {clp(-saved)}
                        </span>
                    )}
                </div>
            </div>

            {/* Nombre con tooltip al hover (1s delay) */}
            <div className={cn('px-3 py-2', isHot ? 'bg-primary/6' : 'bg-card')}>
                <TooltipProvider delay={1000}>
                    <Tooltip>
                        <TooltipTrigger render={<p className="m-0 line-clamp-2 text-[15px] font-medium leading-snug cursor-pointer" />}>
                            {product.title}
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="max-w-62.5 text-center">
                            {product.title}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </Link>
    )
}
