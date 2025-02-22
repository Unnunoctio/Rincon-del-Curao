import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { SidebarMobile } from "@/components/sidebar-mobile";
import { WebsModal } from "@/components/webs-modal";
import { getAllWebs } from "@/graphql/requests";
import { UIProvider } from "@/providers/ui-provider";
import { WebsProvider } from "@/providers/webs-provider";
import "@/styles/globals.css";
import "@fontsource-variable/geist";
import HolyLoader from "holy-loader";
import type { Metadata } from "next";
import { CookiesProvider } from "next-client-cookies/server";
import { ToastContainer } from "react-toastify";

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

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const allWebs = await getAllWebs()

  return (
    <html lang="es">
      <body className="flex xl:flex-row flex-col bg-c-onix-black font-geist text-c-snow-white">
        <HolyLoader color="#d69e2e" height={2} />
        <CookiesProvider>
          <ToastContainer containerId='notification' position='top-right' autoClose={2000} />
          <UIProvider>
            <SidebarMobile />
            <Sidebar />
            <Navbar />
            <WebsProvider webs={allWebs}>
              <WebsModal />
            </WebsProvider>
          </UIProvider>
          <main className="flex flex-col flex-1 gap-3 xl:pt-3 pr-3 pb-3 pl-3">
            <section className="bg-c-lead-gray p-4 rounded-2xl h-content-height">
              {children}
            </section>
            <Footer />
          </main>
        </CookiesProvider>
      </body>
    </html>
  );
}
