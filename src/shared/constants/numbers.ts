import { BigNumber } from 'ethers'

export const ONE_MINUTE = 60

export const TEN_MINUTES = ONE_MINUTE * 10

export const ONE_HOUR = ONE_MINUTE * 60

export const ONE_DAY = ONE_HOUR * 24

export const ONE_MONTH = ONE_DAY * 30

export const ONE_YEAR = ONE_DAY * 365

export const ZERO_BIG_NUMBER = BigNumber.from(0)

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const MAX_UINT_256 = BigNumber.from(
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
)
