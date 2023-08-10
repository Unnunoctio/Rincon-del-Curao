
export const getDefaultPage = (value: string | null): number => {
  if (value === null) return 1
  const parsedValue = parseInt(value)
  if (isNaN(parsedValue)) return 1
  return parsedValue
}

export const getPage = (value: string | null): number | undefined => {
  if (value === null) return undefined
  const parsedValue = parseInt(value)
  if (isNaN(parsedValue)) return undefined
  return parsedValue
}
