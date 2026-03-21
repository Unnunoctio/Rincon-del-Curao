'use client'

import { cn } from '@/lib/utils'
import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

const options = [
    { value: 'light', icon: Sun },
    { value: 'system', icon: Monitor },
    { value: 'dark', icon: Moon },
] as const

const emptySubscribe = () => () => {}

function useIsMounted() {
    return useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false,
    )
}

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const mounted = useIsMounted()

    return (
        <div className="flex items-center gap-0.5 rounded-full border bg-muted/40 p-0.5">
            {options.map(({ value, icon: Icon }) => (
                <button
                    key={value}
                    onClick={() => setTheme(value)}
                    aria-label={value}
                    className={cn(
                        'flex items-center justify-center rounded-full p-1.5 transition-colors cursor-pointer',
                        mounted && theme === value
                            ? 'bg-background text-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground',
                    )}
                >
                    <Icon className="h-4 w-4" />
                </button>
            ))}
        </div>
    )
}
