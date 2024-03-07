export function mapValues<T>(
  object: Record<string, any>,
  fn: (value: any) => T,
) {
  const result: Record<string, T> = {}

  Object.keys(object).forEach(key => {
    const value = object[key]
    result[key] = fn(value)
  })
  return result
}
