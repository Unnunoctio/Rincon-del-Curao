
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

export const GET_IS_SLUG_EXIST = `
  query IsSlugExist($slug: ID!) {
    isSlugExist(slug: $slug) {
      isExist
      title
    }
  }
`

export const GET_PRODUCT_DETAIL = `
  query ProductDetail($slug: ID!) {
    productDetail(slug: $slug) {
      title
      brand
      quantity
      abv
      volume
      packaging
      category
      subCategory
      origin
      image
      variety
      ibu
      servingTemp
      strain
      vineyard
    }
  }
`
