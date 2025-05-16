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

export const GET_ALL_SLUGS = `
  query AllSlugs {
    allSlugs
  }
`

export const GET_PRODUCT_TITLE = `
  query ProductTitle($slug: ID!) {
    productTitle(slug: $slug)
  }
`