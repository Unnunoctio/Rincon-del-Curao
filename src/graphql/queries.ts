export const GET_ALL_WEBS = `
  query AllWebs {
    allWebs {
      code
      name
    }
  }
`

export const GET_ALL_PRODUCTS = `
  query AllProducts {
    allProducts {
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
