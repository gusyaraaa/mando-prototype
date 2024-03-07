import bn from 'bignumber.js'
import { BigNumber } from 'ethers'
import { MAX_UINT_256 } from 'shared/constants/numbers'

bn.set({
  EXPONENTIAL_AT: 20,
  DECIMAL_PLACES: 80,
  // ROUNDING_MODE: bn.ROUND_HALF_UP,
})

export { bn }

export const BigNumberToBn = (value: BigNumber, decimals: number) =>
  new bn(value.toString()).shiftedBy(-decimals)

export const convertToBn = (
  value: BigNumber | string | number,
  decimals: number,
) => {
  if (BigNumber.isBigNumber(value)) return BigNumberToBn(value, decimals)
  return new bn(value)
}

export const formatBn = (value: bn, decimals: number) =>
  value.toFormat(value.isInteger() ? 0 : decimals, 2)

export function getMinBigNumber(...values: BigNumber[]) {
  if (values.length === 0) return BigNumber.from(0)
  if (values.length === 1) return values[0]

  return values.reduce((a, b) => (b.lte(a) ? b : a), MAX_UINT_256)
}

export function getMaxBigNumber(a: BigNumber, b: BigNumber) {
  return a.gte(b) ? a : b
}
