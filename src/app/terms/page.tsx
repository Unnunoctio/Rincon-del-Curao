import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Términos y Condiciones de Uso"
}

export default function TermsPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-page-width">
      <h1 className="font-medium text-3xl">Términos y Condiciones de Uso</h1>

      <section className="flex flex-col gap-2">
        <h2 className="font-medium text-2xl">1. Aceptación de los Términos</h2>
        <p className="text-pretty">Al acceder y utilizar el sitio web de Rincón del Curao (en adelante, <Link href="/" className="text-c-silver-gray hover:text-c-old-gold underline">https://rincondelcurao.com</Link>), usted acepta quedar vinculado por estos Términos y Condiciones de Uso, nuestra Política de Privacidad y todas las leyes y regulaciones aplicables. Si no está de acuerdo con alguno de estos términos, queda prohibido usar o acceder a este sitio.</p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-medium text-2xl">2. Uso del Sitio</h2>
        <p className="text-pretty">Para utilizar nuestros servicios, usted debe ser mayor de edad según las leyes de su jurisdicción o contar con la autorización de sus padres o tutores legales.</p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-medium text-2xl">3. Productos y Servicios</h2>
        <ul className="flex flex-col gap-1 list-disc list-inside">
          <li>Los precios, disponibilidad y características de los productos mostrados son referenciales, y deben verificarse con los proveedores correspondientes.</li>
          <li>Nos reservamos el derecho de modificar precios sin previo aviso.</li>
          <li>Las imágenes son ilustrativas y pueden no representar exactamente el producto.</li>
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-medium text-2xl">4. Propiedad Intelectual</h2>
        <section className="flex flex-col gap-2">
          <h3 className="font-medium text-xl">4.1 Contenido del Sitio</h3>
          <p className="text-pretty">Todo el contenido presente en el Sitio, incluyendo pero no limitado a textos, gráficos, logos, imágenes y compilaciones de datos, es propiedad de Rincón del Curao o sus proveedores de contenido y está protegido por las leyes de propiedad intelectual.</p>
        </section>
        <section className="flex flex-col gap-2">
          <h3 className="font-medium text-xl">4.2 Uso Permitido</h3>
          <p className="text-pretty">Se prohíbe:</p>
          <ul className="flex flex-col gap-1 list-disc list-inside">
            <li>La reproducción, distribución o modificación del contenido sin autorización expresa.</li>
            <li>El uso del contenido con fines comerciales.</li>
            <li>La extracción sistemática de datos o contenido del Sitio.</li>
          </ul>
        </section>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-medium text-2xl">5. Privacidad y Cookies</h2>
        <section className="flex flex-col gap-2">
          <h3 className="font-medium text-xl">5.1 Política de Privacidad</h3>
          <p className="text-pretty">La recolección y uso de información personal se rige por nuestra Política de Privacidad, que forma parte integral de estos términos.</p>
        </section>
        <section className="flex flex-col gap-2">
          <h3 className="font-medium text-xl">5.2 Cookies</h3>
          <p className="text-pretty">El Sitio utiliza cookies para:</p>
          <ul className="flex flex-col gap-1 list-disc list-inside">
            <li>Mejorar la experiencia del usuario.</li>
            <li>Personaliza el contenido.</li>
          </ul>
        </section>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-medium text-2xl">6. Limitación de Responsabilidad</h2>
        <section className="flex flex-col gap-2">
          <h3 className="font-medium text-xl">6.1 Precisión de la Información</h3>
          <p className="text-pretty">Si bien nos esforzamos por mantener la información actualizada y precisa, no garantizamos:</p>
          <ul className="flex flex-col gap-1 list-disc list-inside">
            <li>La exactitud o integridad del contenido.</li>
            <li>La disponibilidad ininterrumpida del Sitio.</li>
            <li>La ausencia de errores o defectos en el servicio.</li>
          </ul>
        </section>
        <section className="flex flex-col gap-2">
          <h3 className="font-medium text-xl">6.2 Exención de Responsabilidad</h3>
          <p className="text-pretty">No seremos responsables por:</p>
          <ul className="flex flex-col gap-1 list-disc list-inside">
            <li>Daños directos, indirectos, incidentales o consecuentes.</li>
            <li>Pérdidas de beneficios o datos.</li>
            <li>Interrupciones del servicio.</li>
            <li>Virus o código malicioso transmitido a través del Sitio.</li>
          </ul>
        </section>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-medium text-2xl">7. Modificaciones</h2>
        <section className="flex flex-col gap-2">
          <h3 className="font-medium text-xl">7.1 Cambios en los Términos</h3>
          <p className="text-pretty">Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el Sitio.</p>
        </section>
        <section className="flex flex-col gap-2">
          <h3 className="font-medium text-xl">7.2 Notificaciones</h3>
          <ul className="flex flex-col gap-1 list-disc list-inside">
            <li>Los cambios significativos serán notificados a través del Sitio.</li>
            <li>El uso continuado del Sitio después de cualquier modificación constituye la aceptación de los nuevos términos.</li>
          </ul>
        </section>
      </section>
    </div>
  )
}
