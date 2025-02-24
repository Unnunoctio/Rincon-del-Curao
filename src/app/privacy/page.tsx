import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Política de Privacidad"
}

export default function Privacy() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-page-width">
      <h1 className="font-medium text-3xl">Política de Privacidad</h1>

      <section className="flex flex-col gap-2">
        <h2 className="font-medium text-2xl">1. Introducción</h2>
        <p className="text-pretty">En Rincón del Curao nos comprometemos a proteger su privacidad. Esta Política de Privacidad explica cómo recopilamos, utilizamos y protegemos su información cuando utiliza nuestro sitio web <Link href="/" className="text-c-steel-gray hover:text-c-old-gold underline">https://rincondelcurao.com</Link>.</p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-medium text-2xl">2. Información que Recopilamos</h2>
        <section className="flex flex-col gap-2">
          <h3 className="font-medium text-xl">2.1 Información recopilada automáticamente</h3>
          <ul className="flex flex-col gap-1 list-disc list-inside">
            <li>Dirección IP.</li>
            <li>Tipo de navegador y dispositivo.</li>
            <li>Sistema operativo.</li>
            <li>Páginas visitadas.</li>
            <li>Tiendas consultadas para cotizaciones.</li>
            <li>Patrones de navegación.</li>
          </ul>
        </section>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-medium text-2xl">3. Uso de Cookies y Tecnologías Similares</h2>
        <section className="flex flex-col gap-2">
          <h3 className="font-medium text-xl">3.1 Tipos de cookies que utilizamos</h3>
          <ul className="flex flex-col gap-1 list-disc list-inside">
            <li>Cookies esenciales: Necesarias para el funcionamiento del sitio.</li>
            <li>Cookies de funcionalidad: Para recordar sus preferencias de búsqueda y tiendas consultadas.</li>
          </ul>
        </section>
        <section className="flex flex-col gap-2">
          <h3 className="font-medium text-xl">3.2 Control de cookies</h3>
          <p className="text-pretty">Usted puede:</p>
          <ul className="flex flex-col gap-1 list-disc list-inside">
            <li>Configurar su navegador para rechazar cookies.</li>
            <li>Eliminar las cookies existentes.</li>
          </ul>
        </section>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-medium text-2xl">4. Uso de la Información</h2>
        <p className="text-pretty">Utilizamos su información para:</p>
        <ul className="flex flex-col gap-1 list-disc list-inside">
          <li>Facilitar la búsqueda de productos y comparación de precios.</li>
          <li>Mejorar la funcionalidad del sitio.</li>
          <li>Analizar tendencias de búsqueda.</li>
          <li>Optimizar las recomendaciones de tiendas.</li>
          <li>Prevenir actividades fraudulentas.</li>
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-medium text-2xl">5. Redirección a Sitios de Terceros</h2>
        <section className="flex flex-col gap-2">
          <h3 className="font-medium text-xl">5.1 Sobre las redirecciones</h3>
          <ul className="flex flex-col gap-1 list-disc list-inside">
            <li>Nuestro servicio principal consiste en redirigir a sitios de comercio electrónico de terceros.</li>
            <li>Al ser redirigido, aplicarán las políticas de privacidad de esos sitios.</li>
            <li>No tenemos control ni nos hacemos responsables por las prácticas de privacidad de terceros.</li>
            <li>Recomendamos revisar las políticas de privacidad de los sitios a los que se redirija.</li>
          </ul>
        </section>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-medium text-2xl">6. Protección de la Información</h2>
        <p className="text-pretty">Implementamos medidas de seguridad para:</p>
        <ul className="flex flex-col gap-1 list-disc list-inside">
          <li>Proteger contra acceso no autorizado.</li>
          <li>Mantener la integridad de los datos.</li>
          <li>Prevenir pérdida de información.</li>
          <li>Garantizar el uso apropiado de los datos.</li>
        </ul>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-medium text-2xl">7. Cambios en la Política de Privacidad</h2>
        <ul className="flex flex-col gap-1 list-disc list-inside">
          <li>Nos reservamos el derecho de modificar esta política.</li>
          <li>Notificaremos cambios significativos a través del sitio.</li>
          <li>El uso continuado implica aceptación de los cambios.</li>
        </ul>
      </section>
    </div>
  )
}
