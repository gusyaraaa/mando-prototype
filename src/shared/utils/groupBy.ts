export function groupBy<T extends Record<string, any>>(
  arr: T[],
  key: string,
): { [key: string]: T[] } {
  return arr.reduce((result, currentItem) => {
    ;(result[currentItem[key]] = result[currentItem[key]] || []).push(
      currentItem,
    )
    return result
  }, {} as { [key: string]: T[] })
}
