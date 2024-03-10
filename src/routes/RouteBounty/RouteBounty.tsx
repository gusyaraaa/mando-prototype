import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { createRoute } from 'modules/router/utils/createRoute'
import { detectChain } from 'shared/utils/detectChain'
import { Text } from 'shared/ui/common/Text'
import { Input } from 'shared/ui/controls/Input'
import { Button } from 'shared/ui/controls/Button'
import { Select } from 'shared/ui/controls/Select'
import { useLocalStorage } from 'shared/hooks/useLocalStorage'
import * as links from 'modules/router/links'
import {
  Asset,
  Bounty,
  BountyStatus,
  Chains,
  ExpirationDate,
  UserData,
  defaultBountiesData,
  defaultUserData,
  getChainName,
  parseChainId,
} from 'types/core'

import s from './RouteBounty.module.scss'

function RouteBounty() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user] = useLocalStorage<UserData>('mando-bounties', defaultUserData)
  const [bounties, setBounties] = useLocalStorage<Bounty[]>(
    'mando-bounties',
    defaultBountiesData,
  )
  const bounty = bounties.find(b => id && b.id === +id)

  const [chainInput, setChainInput] = useState<Chains | undefined>(
    bounty?.chain,
  )
  const [addressInput, setAddressInput] = useState<string>(
    bounty?.address || '',
  )
  const [amountInput, setAmountInput] = useState<string>(
    bounty?.amount ? `${bounty.amount}` : '',
  )
  const [assetInput, setAssetInput] = useState<Asset | undefined>(bounty?.asset)
  const [expirationInput, setExpirationInput] = useState<
    ExpirationDate | undefined
  >(bounty?.expirationDate)

  useEffect(() => {
    if (!addressInput) {
      setChainInput(undefined)
      return
    }
    const chain = detectChain(addressInput)
    setChainInput(chain)
  }, [addressInput])

  const submit = () => {
    const filteredBounties = bounty?.id
      ? bounties.filter(b => b.id !== bounty.id)
      : bounties
    setBounties([
      ...filteredBounties,
      {
        id: bounty?.id || bounties.length + 1,
        from: user?.username || 'Unknown',
        chain: chainInput!,
        address: addressInput,
        amount: +amountInput,
        asset: assetInput!,
        expirationDate: expirationInput,
        isConfirmed: bounty?.isConfirmed || false,
        status: BountyStatus.INIT,
      },
    ])

    navigate(links.bounty(`${bounty?.id || bounties.length + 1}`, true), {
      state: { from: links.bounty(bounty ? `${bounty?.id}` : undefined) },
    })
  }

  return (
    <>
      <div className={s.header}>
        <Text>
          You can create a bounty for the wallet address. If they accept, you’ll
          be able to chat. If the bounty is not claimed, on expiration date it
          will be returned to you.
        </Text>
      </div>
      <div className={s.form}>
        <Select
          className={s.select}
          placeholder="Chain"
          value={chainInput !== undefined ? `${chainInput}` : ''}
          options={Object.values(Chains).map(chainId => {
            return {
              label: getChainName(chainId),
              value: `${chainId}`,
            }
          })}
          onChange={v => setChainInput(parseChainId(v))}
          concat={'bottom'}
        />
        <Input
          className={s.input}
          placeholderClassName={s.placeholder}
          placeholder="Address"
          value={addressInput}
          onChange={e => setAddressInput(e.target.value)}
          concat={['top', 'bottom']}
        />
        <Input
          className={s.input}
          placeholderClassName={s.placeholder}
          placeholder="Amount"
          value={amountInput}
          onChange={e => setAmountInput(e.target.value)}
          concat={['top', 'bottom']}
        />
        <Select
          className={s.select}
          placeholder="Currency"
          value={assetInput || ''}
          options={Object.values(Asset).map(asset => {
            return {
              label: asset,
              value: asset,
            }
          })}
          onChange={v => setAssetInput(v as Asset)}
          concat={'middle'}
        />
        <Select
          className={s.select}
          placeholder="Expiration date"
          value={expirationInput || ''}
          options={Object.values(ExpirationDate).map(date => {
            return {
              label: date,
              value: date,
            }
          })}
          onChange={v => setExpirationInput(v as ExpirationDate)}
          concat={'top'}
        />
        <Button
          type="submit"
          className={s.button}
          isDisabled={
            chainInput === undefined ||
            !addressInput ||
            !Number(amountInput) ||
            Number(amountInput) <= 0 ||
            !assetInput ||
            !expirationInput
          }
          onClick={submit}
        >
          REVIEW
        </Button>
      </div>
    </>
  )
}

export const routeBounty = createRoute({
  component: RouteBounty,
  layoutType: 'narrow',
  withBackButton: false,
})
