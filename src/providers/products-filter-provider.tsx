'use client'

import { findOrderBy, OrderByEnum } from "@/config/order-by";
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
  orderByProducts: OrderByEnum;
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
  const [orderByProducts, setOrderByProducts] = useState(findOrderBy(searchParams.get('order_by') as OrderByEnum || OrderByEnum.SCORE_DESC).value)

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
    const orderBy = searchParams.get('order_by')
    switch (orderBy) {
      case OrderByEnum.NAME_ASC:
        setOrderByProducts(OrderByEnum.NAME_ASC)
        fp.sort((a, b) => a.title.localeCompare(b.title))
        break
      case OrderByEnum.NAME_DESC:
        setOrderByProducts(OrderByEnum.NAME_DESC)
        fp.sort((a, b) => b.title.localeCompare(a.title))
        break
      case OrderByEnum.PRICE_ASC:
        setOrderByProducts(OrderByEnum.PRICE_ASC)
        fp = fp.map(p => {
          return {
            ...p,
            websites: p.websites.sort((a, b) => a.bestPrice - b.bestPrice)
          }
        })
        fp.sort((a, b) => {
          if (a.websites[0].bestPrice !== b.websites[0].bestPrice) return a.websites[0].bestPrice - b.websites[0].bestPrice
          if (a.websites[0].price !== b.websites[0].price) return a.websites[0].price - b.websites[0].price
          return a.title.localeCompare(b.title)
        })
        break
      case OrderByEnum.PRICE_DESC:
        setOrderByProducts(OrderByEnum.PRICE_DESC)
        fp = fp.map(p => {
          return {
            ...p,
            websites: p.websites.sort((a, b) => b.bestPrice - a.bestPrice)
          }
        })
        fp.sort((a, b) => {
          if (a.websites[0].bestPrice !== b.websites[0].bestPrice) return b.websites[0].bestPrice - a.websites[0].bestPrice
          if (a.websites[0].price !== b.websites[0].price) return b.websites[0].price - a.websites[0].price
          return a.title.localeCompare(b.title)
        })
        break
      default:
        setOrderByProducts(OrderByEnum.SCORE_DESC)
        fp = fp.map(p => {
          return {
            ...p,
            websites: p.websites.sort((a, b) => b.discount - a.discount)
          }
        })
        fp.sort((a, b) => {
          if (a.websites[0].discount !== b.websites[0].discount) return b.websites[0].discount - a.websites[0].discount
          if (a.average !== b.average) return b.average - a.average
          if (a.websites[0].price !== b.websites[0].price) return b.websites[0].price - a.websites[0].price
          return a.title.localeCompare(b.title)
        })
        break
    }

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
    currentPage,
    orderByProducts
  }

  return (
    <ProductsFilterContext.Provider value={value}>
      {children}
    </ProductsFilterContext.Provider>
  )
}
