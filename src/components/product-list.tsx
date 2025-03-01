'use client'

import { useProducts } from "@/providers/products-provider";
import { ProductCard } from "./product-card";

export const ProductList = () => {
  const { productsInView, isLoading } = useProducts()

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
