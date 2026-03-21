import { ThemeToggle } from '@/components/theme-toggle'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-6">
            <h1 className="text-3xl font-bold tracking-tight">Rincón del Curao</h1>
            <ThemeToggle />
        </main>
    )
}
