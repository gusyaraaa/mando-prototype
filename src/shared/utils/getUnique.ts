export function getUnique<T extends string | number>(arr: T[]): T[] {
  return [...new Set(arr)]
}
