'use client'

import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { forwardRef, KeyboardEvent, useState } from 'react'

interface SearchInputProps {
    className?: string
    placeholder?: string
    autoFocus?: boolean
    pill?: boolean
    onSearch?: () => void
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
    ({ className, placeholder = 'Buscar...', autoFocus, pill = false, onSearch }, ref) => {
        const router = useRouter()
        const [query, setQuery] = useState('')

        const handleSearch = () => {
            const trimmed = query.trim()
            if (!trimmed) return
            router.push(`/search?q=${encodeURIComponent(trimmed)}`)
            onSearch?.()
        }

        const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') handleSearch()
        }

        return (
            <div className={cn('relative', className)}>
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <input
                    ref={ref}
                    type="text"
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus={autoFocus}
                    className={cn(
                        'flex h-8 w-full border border-input bg-transparent px-3 py-1 pl-9 text-sm shadow-xs outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50',
                        pill ? 'rounded-full' : 'rounded-md'
                    )}
                />
            </div>
        )
    }
)

SearchInput.displayName = 'SearchInput'
