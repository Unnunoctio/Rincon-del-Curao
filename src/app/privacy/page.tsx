import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Política de Privacidad',
    description: 'Política de privacidad y tratamiento de datos de Rincón del Curao.',
}

const SECTIONS = [
    {
        title: 'Información que recopilamos',
        content:
            'Cuando visitas Rincón del Curao, recopilamos automáticamente cierta información técnica necesaria para el funcionamiento del sitio: dirección IP, tipo de navegador y dispositivo, sistema operativo, páginas visitadas, tiendas consultadas y patrones de navegación. No recopilamos nombre, correo electrónico ni ningún dato personal identificable a menos que tú nos lo proporciones voluntariamente.',
    },
    {
        title: 'Cookies y tecnologías similares',
        content:
            'Utilizamos cookies para mejorar tu experiencia en el sitio. Las cookies esenciales son necesarias para el funcionamiento básico. Las cookies de funcionalidad nos permiten recordar tus preferencias de búsqueda y las tiendas que has consultado. Puedes configurar tu navegador para rechazar todas las cookies, aunque esto puede afectar la funcionalidad del sitio.',
    },
    {
        title: 'Cómo usamos la información',
        content:
            'La información recopilada se utiliza exclusivamente para: facilitar la búsqueda de productos y la comparación de precios, mejorar la funcionalidad y el rendimiento del sitio, analizar tendencias de búsqueda de forma agregada y anónima, optimizar las recomendaciones de tiendas, y prevenir el uso fraudulento o el abuso del servicio. No vendemos ni cedemos tu información a terceros con fines comerciales.',
    },
    {
        title: 'Redirección a sitios de terceros',
        content:
            'Cuando haces clic en un producto, te redirigimos al sitio del proveedor externo donde puedes realizar tu compra. A partir de ese momento, la política de privacidad del proveedor es la que aplica. Rincón del Curao no tiene control ni responsabilidad sobre las prácticas de privacidad de esos sitios. Te recomendamos revisar sus políticas antes de realizar cualquier transacción.',
    },
    {
        title: 'Almacenamiento y seguridad',
        content:
            'Implementamos medidas técnicas y organizativas razonables para proteger la información recopilada contra accesos no autorizados, pérdida o alteración. Sin embargo, ningún sistema de transmisión de datos por internet es completamente seguro, por lo que no podemos garantizar una seguridad absoluta.',
    },
    {
        title: 'Retención de datos',
        content:
            'Los datos de navegación se almacenan de forma agregada y anónima durante el tiempo necesario para cumplir con los fines descritos en esta política. No conservamos información personal identificable más allá del tiempo estrictamente necesario.',
    },
    {
        title: 'Tus derechos',
        content:
            'De acuerdo con la legislación chilena vigente (Ley N° 19.628 sobre Protección de la Vida Privada), tienes derecho a conocer, rectificar, cancelar u oponerte al tratamiento de tus datos personales. Para ejercer estos derechos, contáctanos a través de la sección Contacto del sitio.',
    },
    {
        title: 'Cambios en esta política',
        content:
            'Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Los cambios significativos serán notificados mediante un aviso visible en el sitio. El uso continuado de Rincón del Curao tras la publicación de los cambios implica la aceptación de la nueva política.',
    },
]

export default function PrivacyPage() {
    return (
        <div className="mx-auto max-w-3xl px-1 py-1 xl:py-12">
            {/* Header */}
            <div className="mb-10 flex flex-col gap-2">
                <p className="text-sm font-medium text-primary">Legal</p>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Política de Privacidad</h1>
                <p className="mt-1 text-muted-foreground">
                    Última actualización: <time dateTime="2025-01-01">1 de enero de 2025</time>
                </p>
            </div>

            {/* Intro */}
            <p className="mb-10 text-base leading-relaxed text-muted-foreground">
                En <span className="font-medium text-foreground">Rincón del Curao</span> nos comprometemos a proteger tu privacidad. Esta política
                describe qué información recopilamos cuando visitas <span className="font-medium text-foreground">rincondelcurao.cl</span>, cómo la
                usamos y las opciones que tienes al respecto.
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
                    Si tienes preguntas sobre esta Política de Privacidad o el tratamiento de tus datos, puedes contactarnos a través de la sección{' '}
                    <a href="/contact" className="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors">
                        Contacto
                    </a>
                    .
                </p>
            </div>
        </div>
    )
}
