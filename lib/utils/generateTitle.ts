
export const generateTitle = (name: string, drinkPackage: string, content: number, quantity: number, alcoholicGrade: number, isUrl = false): string => {
  let title = ''
  if (quantity > 1) title += `Pack ${quantity} un. `

  title += `${name} ${drinkPackage} `
  if (!isUrl) title += `${alcoholicGrade}° `

  if (content >= 1000) {
    title += `${content / 1000}L`
  } else {
    title += `${content}cc`
  }

  return title
}
