'use client'

import { ArrowUp } from 'lucide-react'

export function ScrollTop() {
    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Ir al inicio de la página"
            className="group absolute top-0 right-0 sm:static hover:bg-muted p-2 rounded-lg w-fit h-fit cursor-pointer transition-colors"
        >
            <ArrowUp className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>
    )
}
