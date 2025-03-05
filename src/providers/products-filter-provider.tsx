'use client'

import { ROUTES } from "@/config/router-paths";
import { useCookies } from "@/providers/cookies-provider";
import { useProducts } from "@/providers/products-provider";
import { ProductView } from "@/types";
import { useParams, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface ProductsFilterContextType {
  isLoading: boolean;
  productsInView: ProductView[];
  totalProducts: number;
  totalPages: number;
  currentPage: number;
}

const ProductsFilterContext = createContext<ProductsFilterContextType | undefined>(undefined)

export const useProductsFilter = () => {
  const context = useContext(ProductsFilterContext)
  if (!context) {
    throw new Error('useProductsFilter must be used within a ProductsFilterProvider')
  }
  return context
}

export const ProductsFilterProvider = ({ children }: { children: React.ReactNode }) => {
  const params = useParams()
  const searchParams = useSearchParams()

  const { products } = useProducts()
  const { selectedWebs } = useCookies()

  const [isLoading, setIsLoading] = useState(true)
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

    // APLICAR ORDENAMIENTO

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

    // GENERAR LOS PRODUCT VIEW
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
    setIsLoading(true)
    generateProductsInView()
    setTimeout(() => {
      setIsLoading(false)
    }, 100)
  }, [searchParams, selectedWebs])

  const value = {
    isLoading,
    productsInView,
    totalProducts,
    totalPages,
    currentPage
  }

  return (
    <ProductsFilterContext.Provider value={value}>
      {children}
    </ProductsFilterContext.Provider>
  )
}
