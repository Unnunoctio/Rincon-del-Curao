import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Términos y Condiciones',
    description: 'Términos y condiciones de uso de Rincón del Curao.',
}

const SECTIONS = [
    {
        title: 'Aceptación de los términos',
        content:
            'Al acceder y utilizar Rincón del Curao, aceptas quedar vinculado por estos Términos y Condiciones, nuestra Política de Privacidad y toda la legislación aplicable. Si no estás de acuerdo con alguno de estos términos, te pedimos que no utilices el sitio.',
    },
    {
        title: 'Uso del sitio',
        content:
            'Rincón del Curao es un comparador de precios de bebidas alcohólicas. Para utilizar el sitio debes ser mayor de 18 años o contar con la autorización expresa de tu padre, madre o tutor legal. El uso del sitio con fines comerciales, de scraping automatizado o de redistribución masiva de datos no está permitido sin autorización previa por escrito.',
    },
    {
        title: 'Exactitud de la información',
        content:
            'Los precios, la disponibilidad y las características de los productos mostrados en el sitio tienen carácter referencial y son obtenidos desde fuentes de terceros. Rincón del Curao no garantiza que dicha información esté actualizada, sea exacta ni completa. Te recomendamos verificar los datos directamente con el proveedor antes de tomar cualquier decisión de compra.',
    },
    {
        title: 'Propiedad intelectual',
        content:
            'Todo el contenido del sitio —incluyendo textos, diseño, logotipos, íconos, imágenes y compilaciones de datos— es propiedad de Rincón del Curao o de sus proveedores de contenido y está protegido por la legislación chilena e internacional sobre propiedad intelectual. Queda prohibida su reproducción, distribución, modificación o explotación comercial sin autorización expresa.',
    },
    {
        title: 'Redirección a sitios de terceros',
        content:
            'El servicio principal de Rincón del Curao consiste en dirigir al usuario a sitios de comercio electrónico de terceros donde puede concretar su compra. Una vez que abandonas nuestro sitio, las políticas de privacidad y los términos de uso del proveedor externo son los que aplican. No somos responsables del contenido, las prácticas ni las transacciones realizadas en sitios de terceros.',
    },
    {
        title: 'Limitación de responsabilidad',
        content:
            'Rincón del Curao no será responsable por daños directos, indirectos, incidentales o consecuentes que surjan del uso o la imposibilidad de uso del sitio, incluyendo pérdida de datos, interrupciones del servicio o inexactitud en los precios publicados. El sitio se ofrece "tal como está" y sin garantías de ningún tipo.',
    },
    {
        title: 'Modificaciones',
        content:
            'Nos reservamos el derecho de actualizar estos Términos en cualquier momento. Los cambios entrarán en vigor de forma inmediata tras su publicación en el sitio. El uso continuado de Rincón del Curao después de la publicación de cualquier modificación implica la aceptación de los nuevos términos.',
    },
    {
        title: 'Ley aplicable',
        content:
            'Estos Términos se rigen por las leyes de la República de Chile. Cualquier controversia derivada de su interpretación o cumplimiento será sometida a los tribunales ordinarios de justicia de la ciudad de Santiago.',
    },
]

export default function TermsPage() {
    return (
        <div className="mx-auto max-w-3xl px-1 py-1 xl:py-12">
            {/* Header */}
            <div className="mb-10 flex flex-col gap-2">
                <p className="text-sm font-medium text-primary">Legal</p>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Términos y Condiciones</h1>
                <p className="mt-1 text-muted-foreground">
                    Última actualización: <time dateTime="2025-01-01">1 de enero de 2025</time>
                </p>
            </div>

            {/* Intro */}
            <p className="mb-10 text-base leading-relaxed text-muted-foreground">
                Estos Términos y Condiciones regulan el acceso y uso de <span className="font-medium text-foreground">Rincón del Curao</span> (en
                adelante, &quot;el sitio&quot;), un comparador de precios de bebidas alcohólicas disponible en{' '}
                <span className="font-medium text-foreground">rincondelcurao.cl</span>. Lee este documento con atención antes de utilizar nuestros
                servicios.
            </p>

            {/* Sections */}
            <div className="flex flex-col divide-y divide-border">
                {SECTIONS.map((section, index) => (
                    <div key={section.title} className="flex gap-6 py-8">
                        <span className="mt-0.5 shrink-0 text-sm font-mono text-muted-foreground/50 w-5">{String(index + 1).padStart(2, '0')}</span>
                        <div className="flex flex-col gap-3">
                            <h2 className="text-base font-semibold">{section.title}</h2>
                            <p className="text-sm leading-relaxed text-muted-foreground">{section.content}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer note */}
            <div className="mt-10 rounded-xl border border-border bg-muted/30 px-6 py-5">
                <p className="text-sm text-muted-foreground">
                    Si tienes preguntas sobre estos Términos y Condiciones, puedes contactarnos a través de la sección{' '}
                    <a href="/contact" className="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors">
                        Contacto
                    </a>
                    .
                </p>
            </div>
        </div>
    )
}
