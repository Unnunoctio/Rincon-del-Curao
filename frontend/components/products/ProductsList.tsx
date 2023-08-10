import { getProducts } from '@/_mock/products'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// const fetchProducts = async (): Promise<any> => {
//   console.log('FETCHING PRODUCTS')
//   const data = await getAllProducts()

//   return data
// }

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function ProductsList ({ category }: { category: string }) {
  const products = getProducts()

  return products.map(product => (
    <Link key={product.path} href={`${category}/${product.path}`}>
      <div className='p-2 w-[250px] bg-primary rounded-md border divider-primary transition-transform hover:scale-105'>
        <Image src={product.image} alt={product.title} width={234} height={234} className='aspect-[234/200] object-cover rounded-sm' />
        <div className='flex flex-col justify-between pt-2'>
          <header>
            <span className='text-secondary'>{product.brand}</span>
            <h3 className='font-medium text-[18px] text-primary min-h-[54px]'>{product.title}</h3>
          </header>
          <div className='flex items-end justify-between'>
            <div className='text-secondary text-[14px]'>
              <span className='block'>Graduación: {product.alcoholicGrade}°</span>
              <span className='block'>Contenido: {product.content}cc</span>
            </div>
            <span className='font-medium text-[20px] text-primary'>${product.bestPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
          </div>
        </div>
      </div>
    </Link>
  ))
}
