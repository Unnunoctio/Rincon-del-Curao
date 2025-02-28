export const GET_ALL_WEBS = `
  query AllWebs {
    allWebs {
      code
      name
    }
  }
`

export const GET_PRODUCTS = `
  query Products($category: CategoryEnum) {
    products(category: $category) {
      slug
      title
      brand
      category
      subCategory
      quantity
      abv
      volume
      packaging
      average
      image
      websites {
        code
        price
        bestPrice
        discount
      }
    }
  }
`
