'use client'

import { ProductPreview } from "@/graphql/types";
import { ProductView } from "@/types";
import { useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface ProductsContextType {
  products: ProductPreview[];
  productsInView: ProductView[];
  totalPages: number;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

export const useProducts = () => {
  const context = useContext(ProductsContext)
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }
  return context
}

export const ProductsProvider = ({ children, products, prefersWebs }: { children: React.ReactNode, products: ProductPreview[], prefersWebs: string[] }) => {
  const searchParams = useSearchParams()

  const [productsInView, setProductsInView] = useState<ProductView[]>([])
  const [totalPages, setTotalPages] = useState(0)

  const generateProductsInView = () => {
    let fp: any[] = []

    // APLICAR WEBSITES ACTIVOS
    if (prefersWebs.length > 0) {
      fp = products.map(p => {
        return {
          ...p,
          websites: p.websites.filter(w => prefersWebs.includes(w.code))
        }
      })
      fp = fp.filter(p => p.websites.length > 0)
    } else {
      fp = products
    }

    // APLICAR ORDENAMENTO

    // SIMPLIFICAR LOS WEBS

    // APLICAR FILTROS
    if (searchParams.get('q')) fp = fp.filter(p => p.title.toLowerCase().includes(searchParams.get('q')?.toLowerCase() ?? ''))
    if (searchParams.get('sub_category')) fp = fp.filter(p => p.subCategory === searchParams.get('sub_category'))

    // APLICAR PAGINACION
    const PRODUCTS_PER_PAGE = 24
    const total = Math.ceil(fp.length / PRODUCTS_PER_PAGE)
    setTotalPages(total)

    let page = parseInt(searchParams.get('page') ?? '1')
    if (page < 1) page = 1
    if (page > total) page = total

    fp = fp.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE)

    // GENERAR EL PRODUCT VIEW
    fp = fp.map(p => {
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

    setProductsInView(fp)
  }


  useEffect(() => {
    generateProductsInView()
  }, [searchParams, prefersWebs])

  const value = {
    products,
    productsInView,
    totalPages
  }

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}

