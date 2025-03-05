'use client'

import { ROUTES } from "@/config/router-paths";
import { ProductPreview } from "@/graphql/types";
import { useCookies } from "@/providers/cookies-provider";
import { ProductView } from "@/types";
import { useParams, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface ProductsContextType {
  products: ProductPreview[];
  productsInView: ProductView[];
  totalProducts: number;
  totalPages: number;
  currentPage: number;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

export const useProducts = () => {
  const context = useContext(ProductsContext)
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }
  return context
}

export const ProductsProvider = ({ children, products }: { children: React.ReactNode, products: ProductPreview[] }) => {
  const params = useParams()
  const searchParams = useSearchParams()
  const { selectedWebs } = useCookies()

  const [productsInView, setProductsInView] = useState<ProductView[]>([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)

  const generateProductsInView = () => {
    let fp = products

    // APLICAR CATEGORIA
    if (params.category !== undefined) {
      const route = ROUTES.find(r => r.route === params.category)
      if (route !== undefined) {
        fp = fp.filter(p => p.category === route.name)
      }
    }

    // APLICAR WEBSITES ACTIVOS
    if (selectedWebs.length > 0) {
      fp = fp.map(p => {
        return {
          ...p,
          websites: p.websites.filter(w => selectedWebs.includes(w.code))
        }
      })
      fp = fp.filter(p => p.websites.length > 0)
    }

    // APLICAR ORDENAMENTO

    // SIMPLIFICAR LOS WEBS

    // APLICAR FILTROS
    if (searchParams.get('q')) fp = fp.filter(p => p.title.toLowerCase().includes(searchParams.get('q')?.toLowerCase() ?? ''))
    if (searchParams.get('sub_category')) fp = fp.filter(p => p.subCategory === searchParams.get('sub_category'))

    // SET TOTAL PRODUCTS
    setTotalProducts(fp.length)

    // APLICAR PAGINACION
    const PRODUCTS_PER_PAGE = 24
    const total = Math.ceil(fp.length / PRODUCTS_PER_PAGE)
    setTotalPages(total)

    let page = parseInt(searchParams.get('page') ?? '1')
    if (page < 1) page = 1
    if (page > total) page = total

    fp = fp.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE)
    setCurrentPage(page)

    // GENERAR EL PRODUCT VIEW
    const sp = fp.map(p => {
      return {
        slug: p.slug,
        title: p.title,
        image: p.image,
        average: p.average,
        price: p.websites[0].price,
        bestPrice: p.websites[0].bestPrice,
        discount: p.websites[0].discount
      }
    })

    setProductsInView(sp)
  }

  useEffect(() => {
    generateProductsInView()
  }, [searchParams, selectedWebs])

  const value = {
    products,
    productsInView,
    totalProducts,
    totalPages,
    currentPage
  }

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}

