import { BigNumber } from 'ethers'

export function summOrNull(...args: (BigNumber | null)[]) {
  return args.reduce<BigNumber | null>((res, arg) => {
    if (arg === null && res === null) return null
    if (arg === null) return res
    if (res === null) return arg
    return arg.add(res)
  }, null)
}
