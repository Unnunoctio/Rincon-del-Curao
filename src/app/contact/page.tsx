import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Bug, Lightbulb, MessageCircle, Store } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Contacto',
    description: 'Contáctanos para reportar errores, sugerir mejoras o consultarnos lo que necesites.',
}

const TOPICS = [
    {
        icon: Bug,
        title: 'Reportar un error',
        description: 'Precio incorrecto, producto duplicado o algo que no funciona.',
    },
    {
        icon: Store,
        title: 'Agregar una tienda',
        description: '¿Conoces una tienda que deberíamos incluir en las comparaciones?',
    },
    {
        icon: Lightbulb,
        title: 'Sugerir una mejora',
        description: 'Ideas para hacer el sitio más útil o fácil de usar.',
    },
    {
        icon: MessageCircle,
        title: 'Consulta general',
        description: 'Cualquier otra pregunta sobre el sitio o nuestros servicios.',
    },
]

export default function ContactPage() {
    return (
        <div className="mx-auto max-w-3xl px-1 py-1 xl:py-12">
            {/* Header */}
            <div className="mb-10 flex flex-col gap-2">
                <p className="text-sm font-medium text-primary">Contacto</p>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">¿En qué podemos ayudarte?</h1>
                <p className="mt-1 text-muted-foreground">Revisamos todos los mensajes y respondemos a la brevedad.</p>
            </div>

            {/* Topics */}
            <div className="mb-12 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {TOPICS.map((topic) => (
                    <div key={topic.title} className="flex items-start gap-4 rounded-xl border border-border bg-muted/20 px-4 py-4">
                        <div className="flex items-center h-full">
                            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                <topic.icon className="size-4 text-primary" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <p className="text-sm font-medium">{topic.title}</p>
                            <p className="text-xs text-muted-foreground">{topic.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Form */}
            <form className="flex flex-col gap-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input id="name" name="name" placeholder="Tu nombre" autoComplete="name" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input id="email" name="email" type="email" placeholder="tu@correo.com" autoComplete="email" />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="subject">Asunto</Label>
                    <Select name="subject">
                        <SelectTrigger id="subject" className="w-full max-w-46.5">
                            <SelectValue placeholder="Selecciona un asunto" />
                        </SelectTrigger>
                        <SelectContent alignItemWithTrigger={false}>
                            <SelectItem value="Reportar un error">Reportar un error</SelectItem>
                            <SelectItem value="Agregar una tienda">Agregar una tienda</SelectItem>
                            <SelectItem value="Sugerir una mejora">Sugerir una mejora</SelectItem>
                            <SelectItem value="Consulta general">Consulta general</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="message">Mensaje</Label>
                    <Textarea id="message" name="message" placeholder="Cuéntanos con el mayor detalle posible..." className="min-h-36 resize-none" />
                </div>

                <div className="flex items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground">
                        Al enviar este formulario aceptas nuestra{' '}
                        <a href="/privacy" className="underline underline-offset-4 hover:text-foreground transition-colors">
                            Política de Privacidad
                        </a>
                        .
                    </p>
                    <Button type="submit" className="shrink-0">
                        Enviar mensaje
                    </Button>
                </div>
            </form>
        </div>
    )
}
