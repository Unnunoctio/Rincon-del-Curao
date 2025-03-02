'use client'

import { useProducts } from "@/providers/products-provider";
import { useEffect, useState } from "react";
import { ProductCard } from "./product-card";

export const ProductList = () => {
  const { productsInView } = useProducts()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 100)
  }, [])

  if (isLoading) {
    return (
      <p>Cargando...</p>
    )
  }

  return (
    <ul className="justify-items-center gap-8 grid grid-cols-(--my-grid-cols)">
      {productsInView.map((product, index) => (
        <li key={index} className="">
          <ProductCard {...product} />
        </li>
      ))}
    </ul>
  )
}
