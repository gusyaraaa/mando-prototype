export const sortArrayByKey = <R extends Record<string, unknown>>(
  results: R[] | null | undefined,
  sortKey: string | null | undefined,
  order: 'asc' | 'desc' = 'asc',
) => {
  const newResults = [...(results ?? [])]
  if (!newResults.length || !sortKey) return newResults

  return newResults.sort((a, b) => {
    const valueA = a[sortKey]
    const valueB = b[sortKey]
    if (!valueA && !valueB) {
      return 0
    } else if (!valueA) {
      return order == 'asc' ? -1 : 1
    } else if (!valueB) {
      return order == 'asc' ? 1 : -1
    }

    if (valueA < valueB) {
      return order == 'asc' ? -1 : 1
    } else if (valueA > valueB) {
      return order == 'asc' ? 1 : -1
    }
    return 0
  })
}
