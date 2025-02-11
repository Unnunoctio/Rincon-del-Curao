
export const GET_ALL_WEBS = `
  query AllWebs {
    allWebs {
      code
      name
    }
  }
`

export const GET_DISCOUNT_PRODUCTS = `
  query DiscountProducts($availableWebs: [ID]!) {
    discountProducts(availableWebs: $availableWebs) {
      slug
      title
      price
      bestPrice
      discount
      average
      image
    }
  }
`

export const GET_AVERAGE_PRODUCTS = `
  query AverageProducts($availableWebs: [ID]!) {
    averageProducts(availableWebs: $availableWebs) {
      slug
      title
      price
      bestPrice
      discount
      average
      image
    }
  }
`
