'use client'

import { cn } from '@/lib/utils'
import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

const options = [
    { value: 'light', icon: Sun, label: 'Claro' },
    { value: 'system', icon: Monitor, label: 'Sistema' },
    { value: 'dark', icon: Moon, label: 'Oscuro' },
] as const

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <div className="flex items-center gap-1 rounded-full border border-border bg-muted p-1">
            {options.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    onClick={() => setTheme(value)}
                    aria-label={label}
                    className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full transition-colors',
                        theme === value ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    )}
                >
                    <Icon className="h-4 w-4" />
                </button>
            ))}
        </div>
    )
}
