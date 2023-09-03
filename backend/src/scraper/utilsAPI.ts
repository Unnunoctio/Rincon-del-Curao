import axios from 'axios'
import { Drink, ProductUnit } from '../types'
import ProductUnitModel from '../models/ProductUnitModel.js'

const drinksAPI = 'https://drinks-api-dev.fl0.io/api/drinks?limit=0'

export const getNewProductUnits = async (): Promise<void> => {
  const pages = [`${drinksAPI}&category=Cervezas`, `${drinksAPI}&category=Destilados`, `${drinksAPI}&category=Vinos`]
  try {
    const drinks = await Promise.all(pages.map(async page => {
      const { data }: { data: Drink[] } = await axios.get(page)
      return data
    }))

    const allDrinks = drinks.flat()
    const newProducts: Array<ProductUnit | undefined> = await Promise.all(allDrinks.map(async drink => {
      const drinkExists = await ProductUnitModel.findOne({
        name: drink.name,
        brand: drink.brand,
        alcoholic_grade: drink.alcoholic_grade,
        content: drink.content,
        package: drink.package
      })

      if (drinkExists === null) {
        const { _id, ...rest } = drink
        return rest as ProductUnit
      }
    }))

    await ProductUnitModel.insertMany(newProducts.filter(product => product !== undefined))
  } catch (error) {
    console.error(error.message)
  }
}

// TODO: Modificar las funcionalidades con tal optener los productos desde Productos Unitarios en vez de hacer peticiones a DrinksAPI (Se sobrecarga la api)
export const isBrandExist = async (brand: string): Promise<boolean> => {
  try {
    const { data }: { data: Drink[] } = await axios.get(`${drinksAPI}&brand=${brand}`)
    if (data.length === 0) return false
    return true
  } catch (error) {
    console.log(brand)
    console.error(error.message)
    return false
  }
}

export const getDrink = async (title: string, brand: string, content: number, packageData: string, alcoholicGrade: number): Promise<Drink | null> => {
  try {
    const { data }: { data: Drink[] } = await axios.get(`${drinksAPI}&brand=${brand}&content=${content}&package=${packageData}&alcoholic_grade=${alcoholicGrade}`)
    if (data.length === 0) return null

    let productCorrect: Drink | null = null
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
