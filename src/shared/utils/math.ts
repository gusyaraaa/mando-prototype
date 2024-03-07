function sum(array: number[]) {
  let result = 0

  for (const value of array) {
    if (value !== undefined) {
      result = result === undefined ? value : result + value
    }
  }
  return result
}

export function mean(array: number[]) {
  const length = array == null ? 0 : array.length
  return length ? sum(array) / length : NaN
}

function getTag(value: any) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  }
  return toString.call(value)
}

function isSymbol(value: any) {
  const type = typeof value
  return (
    type == 'symbol' ||
    (type === 'object' && value != null && getTag(value) == '[object Symbol]')
  )
}

export function max(array: number[]) {
  let result: number | undefined = 0
  if (array == null) {
    return result
  }
  let computed
  for (const value of array) {
    if (
      value != null &&
      (computed === undefined
        ? value === value && !isSymbol(value)
        : value > computed)
    ) {
      computed = value
      result = value
    }
  }
  return result
}

export function min(array: number[]) {
  let result
  if (array == null) {
    return result
  }
  let computed
  for (const value of array) {
    if (
      value != null &&
      (computed === undefined
        ? value === value && !isSymbol(value)
        : value < computed)
    ) {
      computed = value
      result = value
    }
  }
  return result
}
