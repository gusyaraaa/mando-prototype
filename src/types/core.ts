import { constants } from 'starknet'

export const Asset = {
  USDC: 'USDC',
  USDT: 'USDT',
  SOL: 'SOL',
  STRK: 'STRK',
  BTC: 'BTC',
  ETH: 'ETH',
} as const
// intentionally
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Asset = (typeof Asset)[keyof typeof Asset]

export const Chains = {
  EVM: 1,
  Solana: 101, // TODO: change to actual value
  Starknet: Number(constants.StarknetChainId.SN_MAIN),
  BTC: 2203,
} as const
// intentionally
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Chains = (typeof Chains)[keyof typeof Chains]

export const ChainNames: Record<Chains, string | undefined> = {
  [Chains.EVM]: 'EVM',
  [Chains.Solana]: 'Solana',
  [Chains.Starknet]: 'Starknet',
  [Chains.BTC]: 'BTC',
} as const

export const parseChainId = (chainId: number | string) => {
  return Number(chainId) as Chains
}

export const getChainName = (chainId: number) =>
  ChainNames[parseChainId(chainId)] || 'Unknown'

export type UserData = {
  username?: string
  email?: string
  password?: string
  isAuth: boolean
  verifiedAddresses?: string[]
  gifts?: Bounty[]
}
export const defaultUserData = {
  isAuth: false,
  verifiedAddresses: [
    '2be001babd4b7071e2b8cce99',
    'So47eadab2789735a2ebc6c0daa48b565912b88a384d',
    '0xefb2b3ce9304fe5dcfab546f8fc4a6c9da11dd70',
  ],
}

export const ExpirationDate = {
  week: '1 Week',
  month: '1 Month',
  months3: '3 Months',
  months6: '6 Months',
  year: '1 Year',
} as const
// intentionally
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ExpirationDate =
  (typeof ExpirationDate)[keyof typeof ExpirationDate]

export enum BountyStatus {
  INIT = 1,
  ACCEPTED = 2,
  REJECTED = 3,
}
export type Message = {
  id: number
  from?: string
  text: string
  createdAt: string
}
export type Bounty = {
  id: number
  from: string
  address: string
  chain: Chains
  amount: number
  asset: Asset
  expirationDate?: ExpirationDate
  isConfirmed: boolean
  status: BountyStatus
  messages?: Message[]
}
export const defaultBountiesData: Bounty[] = [
  {
    id: 1,
    from: 'BlackWealManta',
    address: 'So23956582adb6dde8bbf713e380db658f00f5c81eb4',
    chain: Chains.Solana,
    amount: 500,
    asset: Asset.SOL,
    isConfirmed: true,
    status: BountyStatus.INIT,
  },
  {
    id: 2,
    from: 'BlackWealManta',
    address: '0x36028ac9e38bea061e16b8c88e43515e392ce1c8',
    chain: Chains.EVM,
    amount: 1000,
    asset: Asset.USDC,
    isConfirmed: true,
    status: BountyStatus.INIT,
  },
  {
    id: 3,
    from: 'Gazetterb',
    address:
      '0x036870112f94fc941a5ae0aa851f47fb3e8be2989edb643e6802df6a6557755d',
    chain: Chains.Starknet,
    amount: 10000,
    asset: Asset.STRK,
    isConfirmed: true,
    status: BountyStatus.INIT,
  },
  {
    id: 4,
    from: 'IslandGurl',
    address: 'So47eadab2789735a2ebc6c0daa48b565912b88a384d',
    chain: Chains.Solana,
    amount: 300,
    asset: Asset.SOL,
    isConfirmed: true,
    status: BountyStatus.ACCEPTED,
    messages: [
      {
        id: 1,
        from: 'IslandGurl',
        text: "Hey sir! I saw your posts and see you're active in LRT farming. I wanna personally introduce you to ABC Protocol, which offers the highest LTVs and lowest rates across all EVM DeFi. We also have your address whitelisted so you'll receive 20% rewards for the next 3 months for depositing and/or borrowing. Please let me know if you have any questions",
        createdAt: '2024-03-10T09:47:00Z',
      },
      {
        id: 2,
        from: 'gusyaraaa',
        text: "Very interesting...is this audited? If so, l'll check it out.",
        createdAt: '2024-03-10T09:51:00Z',
      },
      {
        id: 3,
        from: 'IslandGurl',
        text: 'It is indeed. You can check it out via our site -- abc.xyz',
        createdAt: '2024-03-10T09:55:00Z',
      },
    ],
  },
  {
    id: 5,
    from: 'Byparapa',
    address: '0xefb2b3ce9304fe5dcfab546f8fc4a6c9da11dd70',
    chain: Chains.EVM,
    amount: 3500,
    asset: Asset.USDC,
    isConfirmed: true,
    status: BountyStatus.INIT,
  },
  {
    id: 6,
    from: 'Byparapa',
    address: '0xb3dbd984b40401a44c1b8950f8174e8909f7a182',
    chain: Chains.EVM,
    amount: 10000,
    asset: Asset.USDC,
    isConfirmed: true,
    status: BountyStatus.INIT,
  },
  {
    id: 7,
    from: 'BlackWealManta',
    address: '0x64280d5407cfcba8c3f05f591b03a50875aabcec',
    chain: Chains.EVM,
    amount: 1000,
    asset: Asset.USDC,
    isConfirmed: true,
    status: BountyStatus.INIT,
  },
  {
    id: 8,
    from: 'GottaRock',
    address: '1ce001babd4b7071e2b8cce73',
    chain: Chains.BTC,
    amount: 0.01,
    asset: Asset.BTC,
    isConfirmed: true,
    status: BountyStatus.INIT,
  },
  {
    id: 9,
    from: 'GottaRock',
    address: '0x700a359db4d179aeddde61fa660c9a306c2f7641',
    chain: Chains.EVM,
    amount: 10000,
    asset: Asset.USDC,
    isConfirmed: true,
    status: BountyStatus.INIT,
  },
  {
    id: 10,
    from: 'Icyriumuurn',
    address: '0x1298e86d3cab8db0cdf27f5a8701c99d2373f8a1',
    chain: Chains.EVM,
    amount: 1000,
    asset: Asset.USDT,
    isConfirmed: true,
    status: BountyStatus.INIT,
  },
  {
    id: 11,
    from: 'Icyriumuurn',
    address: '0x9e59A5e67014318741b914F9011f04e851e739F1',
    chain: Chains.EVM,
    amount: 100,
    asset: Asset.USDC,
    isConfirmed: true,
    status: BountyStatus.INIT,
  },
  {
    id: 12,
    from: 'BlackWealManta',
    address: 'So47eadab2789735a2ebc6c0daa48b565912b88a384d',
    chain: Chains.Solana,
    amount: 300,
    asset: Asset.SOL,
    isConfirmed: true,
    status: BountyStatus.INIT,
  },
  {
    id: 13,
    from: 'IslandGurl',
    address: '0x1298123d3cab8db0cdf27f5a8701c99d2373f8a1',
    chain: Chains.EVM,
    amount: 100,
    asset: Asset.USDC,
    isConfirmed: true,
    status: BountyStatus.INIT,
  },
]
