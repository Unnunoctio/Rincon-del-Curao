import { Footer } from "@/components/footer";
import "@/styles/globals.css";
import "@fontsource-variable/geist";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: 'Rincón del Curao',
    template: '%s • Rincón del Curao'
  },
  description: 'Recopilador de precios de distintas bebidas alcohólicas, vendidas en Chile',
  twitter: {
    title: {
      default: 'Rincón del Curao',
      template: '%s • Rincón del Curao'
    },
    description: 'Recopilador de precios de distintas bebidas alcohólicas, vendidas en Chile',
    card: 'summary_large_image',
    images: ['https://assets.rincondelcurao.com/image-og.png']
  },
  openGraph: {
    title: {
      default: 'Rincón del Curao',
      template: '%s • Rincón del Curao'
    },
    description: 'Recopilador de precios de distintas bebidas alcohólicas, vendidas en Chile',
    url: 'https://rincondelcurao.com',
    siteName: 'Rincón del Curao',
    images: ['https://assets.rincondelcurao.com/image-og.png'],
    locale: 'es_ES',
    type: 'website'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="flex xl:flex-row flex-col bg-c-onix-black font-geist text-c-snow-white">
        {/* TOAST */}
        {/* SIDEBAR */}
        {/* NAVBAR */}
        <main className="flex flex-col flex-1 gap-3 xl:pt-3 pr-3 pb-3 pl-3">
          <section className="bg-c-lead-gray p-4 rounded-2xl h-content-height">
            {children}
          </section>
          <Footer />
        </main>
      </body>
    </html>
  );
}
