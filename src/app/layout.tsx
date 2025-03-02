import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { SidebarMobile } from "@/components/sidebar-mobile";
import { WebsModal } from "@/components/webs-modal";
import { getAllWebs, getProducts } from "@/graphql/requests";
import { CookiesProvider } from "@/providers/cookies-provider";
import { ProductsProvider } from "@/providers/products-provider";
import { SearchProvider } from "@/providers/search-provider";
import { UIProvider } from "@/providers/ui-provider";
import { WebsProvider } from "@/providers/webs-provider";
import "@/styles/globals.css";
import "@fontsource-variable/geist";
import HolyLoader from "holy-loader";
import type { Metadata } from "next";
import { Suspense } from "react";
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
  // LOAD DATA
  const allWebs = await getAllWebs()
  const allProducts = await getProducts(null)

  return (
    <html lang="es">
      <body className="flex xl:flex-row flex-col bg-c-onix-black font-geist text-c-snow-white">
        <HolyLoader color="#d69e2e" height={2} />
        <CookiesProvider>
          <ToastContainer containerId='notification' position='top-right' autoClose={2000} />
          <UIProvider>
            <SidebarMobile />
            <Suspense fallback={<div className="w-full xl:w-[280px] h-[68px] xl:h-0" />}>
              <SearchProvider>
                <Sidebar />
                <Navbar />
              </SearchProvider>
            </Suspense>
            <WebsProvider webs={allWebs}>
              <WebsModal />
            </WebsProvider>
          </UIProvider>
          <main className="flex flex-col flex-1 gap-3 xl:pt-3 pr-3 pb-3 pl-3">
            <section className="flex justify-center bg-c-lead-gray p-6 rounded-2xl min-h-mobile-content-height xl:min-h-content-height">
              <Suspense>
                <ProductsProvider products={allProducts}>
                  {children}
                </ProductsProvider>
              </Suspense>
            </section>
            <Footer />
          </main>
        </CookiesProvider>
      </body>
    </html>
  );
}
