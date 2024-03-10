import { useMemo, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'

import { createRoute } from 'modules/router/utils/createRoute'
import * as links from 'modules/router/links'
import { useLocalStorage } from 'shared/hooks/useLocalStorage'
import { Text } from 'shared/ui/common/Text'
import { Input } from 'shared/ui/controls/Input'
import { Button } from 'shared/ui/controls/Button'
import { detectChain } from 'shared/utils/detectChain'
import {
  Bounty,
  BountyStatus,
  Chains,
  UserData,
  defaultBountiesData,
  defaultUserData,
  getChainName,
} from 'types/core'

import MarketsSVG from 'assets/markets.svg'

import s from './RouteLeaderboard.module.scss'

const renderSearchResults = (
  searchResults: Bounty[],
  verifiedAddresses: string[],
  isActionDisabled: boolean,
  navigate: NavigateFunction,
) => {
  if (!searchResults.length) {
    return <Text>Nothing found</Text>
  }
  return searchResults.map((bounty, index) => (
    <div className={s.row} key={`${bounty.address}_${index}`}>
      <div className={s.address}>
        <div className={s.label}>Address</div>
        <div className={s.value}>{bounty.address}</div>
      </div>
      <div className={s.amount}>
        <div className={s.label}>Amount</div>
        <div className={s.value}>
          {bounty.amount} {bounty.asset}
        </div>
      </div>
      <div className={s.action}>
        {bounty.status === BountyStatus.INIT && (
          <>
            {verifiedAddresses.includes(bounty.address) ? (
              <Button
                type="submit"
                className={s.button}
                size={30}
                isDisabled={isActionDisabled}
                onClick={() => navigate(links.rewards)}
              >
                CLAIM
              </Button>
            ) : (
              <Button
                type="submit"
                fashion="accent"
                className={s.button}
                size={30}
                isDisabled={isActionDisabled}
                onClick={() => navigate(`${links.proveOwnership}#verify`)}
              >
                VERIFY
              </Button>
            )}
          </>
        )}
        {bounty.status === BountyStatus.ACCEPTED && (
          <Button
            type="submit"
            fashion="branded"
            className={s.button}
            size={30}
            onClick={() => navigate(links.chat(`${bounty.id}`))}
          >
            CHAT
          </Button>
        )}
        {bounty.status === BountyStatus.REJECTED && (
          <Button className={s.button} size={30} isDisabled={true}>
            REJECTED
          </Button>
        )}
      </div>
    </div>
  ))
}

function RouteLeaderboard() {
  const navigate = useNavigate()
  const [user] = useLocalStorage<UserData>('mando-user', defaultUserData)
  const [bounties] = useLocalStorage<Bounty[]>(
    'mando-bounties',
    defaultBountiesData,
  )
  const [addressValue, setAddressValue] = useState('')
  const [detectedChain, setDetectedChain] = useState<Chains | null>(null)

  const searchResults = useMemo(() => {
    if (!addressValue) {
      setDetectedChain(null)
      return null
    }

    const chain = detectChain(addressValue)
    setDetectedChain(chain)

    const result = bounties.filter(
      bounty =>
        bounty.chain === chain &&
        new RegExp(addressValue, 'gi').test(bounty.address),
    )
    if (!result.length) {
      setDetectedChain(null)
    }
    return result
  }, [addressValue, bounties])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressValue(e.target.value)
  }

  return (
    <>
      <div className={s.total}>
        <Text size={20} weight={600}>
          Total bounties on the platform:
        </Text>
        <Text size={28} weight={600}>
          2.3M USD
        </Text>
      </div>
      <div className={s.card}>
        <div className={s.header}>
          <MarketsSVG />
          <Text size={24} className={s.title}>
            Top bounties leaderboard
          </Text>
        </div>
        <div className={s.rows}>
          {bounties.slice(0, 10).map((bounty, index) => (
            <div className={s.row} key={`${bounty.address}_${index}`}>
              <div className={s.id}>
                <div className={s.label}>#</div>
                <div className={s.value}>{index + 1}</div>
              </div>
              <div className={s.address}>
                <div className={s.label}>Address</div>
                <div className={s.value}>{bounty.address}</div>
              </div>
              <div className={s.chain}>
                <div className={s.label}>Chain</div>
                <div className={s.value}>{getChainName(bounty.chain)}</div>
              </div>
              <div className={s.amount}>
                <div className={s.label}>Amount</div>
                <div className={s.value}>
                  {bounty.amount} {bounty.asset}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={s.search}>
        <Text size={20}>Search bounties by address:</Text>
        <div className={s.form}>
          <Input
            className={s.input}
            placeholderClassName={s.placeholder}
            placeholder="Address"
            value={addressValue}
            onChange={handleChange}
          />
          {detectedChain !== null && (
            <Text color="secondary80" className={s.detect}>
              {getChainName(detectedChain)} address detected
            </Text>
          )}
        </div>
        {searchResults !== null && (
          <>
            <Text size={20}>Search results:</Text>
            <div className={s.card}>
              <div className={s.rows}>
                {renderSearchResults(
                  searchResults,
                  user.verifiedAddresses || [],
                  !addressValue || detectedChain === null,
                  navigate,
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export const routeLeaderboard = createRoute({
  component: RouteLeaderboard,
  withBackButton: false,
})
