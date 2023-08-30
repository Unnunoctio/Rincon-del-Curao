import axios from 'axios'
import { ProductUnit } from '../types'

const drinksAPI = 'http://localhost:4000/api/drinks?limit=0'

export const isBrandExist = async (brand: string): Promise<boolean> => {
  try {
    const { data }: { data: ProductUnit[] } = await axios.get(`${drinksAPI}&brand=${brand}`)
    if (data.length === 0) return false
    return true
  } catch (error) {
    console.log(brand)
    console.error(error.message)
    return false
  }
}

export const getDrink = async (title: string, brand: string, content: number, packageData: string, alcoholicGrade: number): Promise<ProductUnit | null> => {
  try {
    const { data }: { data: ProductUnit[] } = await axios.get(`${drinksAPI}&brand=${brand}&content=${content}&package=${packageData}&alcoholic_grade=${alcoholicGrade}`)
    if (data.length === 0) return null

    let productCorrect: ProductUnit | null = null
    let nameCorrect: string[] = []

    const titleSplit = title.toLowerCase().split(' ')
    data.forEach(product => {
      const nameSplit = product.name.replace(`${brand} `, '').toLowerCase().split(' ')
      const isContains = nameSplit.every((word) => titleSplit.includes(word))
      if (isContains && (nameSplit.length > nameCorrect.length)) {
        nameCorrect = nameSplit
        productCorrect = product
      }
    })

    return productCorrect
  } catch (error) {
    console.error(error.message)
    return null
  }
}
