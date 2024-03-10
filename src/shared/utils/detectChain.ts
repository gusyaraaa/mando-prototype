import { Chains } from 'types/core'

export const detectChain = (address: string) => {
  let chain: Chains = Chains.EVM
  if (address.startsWith('0x0')) {
    chain = Chains.Starknet
  } else if (address.toLowerCase().startsWith('so')) {
    chain = Chains.Solana
  } else if (!address.startsWith('0')) {
    chain = Chains.BTC
  }
  return chain
}
