import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { createRoute } from 'modules/router/utils/createRoute'
import * as links from 'modules/router/links'
import { useLocalStorage } from 'shared/hooks/useLocalStorage'
import { Text } from 'shared/ui/common/Text'
import { Button } from 'shared/ui/controls/Button'
import {
  UserData,
  Bounty,
  defaultBountiesData,
  getChainName,
  defaultUserData,
} from 'types/core'

import s from './RouteGifts.module.scss'

// TODO: click to profile page
function RouteGifts() {
  const navigate = useNavigate()
  const [bounties, setBounties] = useLocalStorage<Bounty[]>(
    'mando-bounties',
    defaultBountiesData,
  )
  const [user, setUser] = useLocalStorage<UserData>(
    'mando-user',
    defaultUserData,
  )

  const bountiesFromMe = useMemo(() => {
    return bounties.filter(bounty =>
      user?.gifts?.find(gift => gift.id === bounty.id),
    )
  }, [bounties, user])

  const handleRemove = (id: number) => {
    setBounties(bounties.filter(bounty => bounty.id !== id))
    setUser({
      ...user,
      gifts: user?.gifts?.filter(gift => gift.id !== id),
    } as UserData)
  }

  const handleEdit = (id: number) => {
    navigate(links.bounty(`${id}`))
  }

  if (!bountiesFromMe.length) {
    return (
      <div className={s.empty}>
        <Text size={20}>Nothing found yet</Text>
        <Button
          className={s.button}
          onClick={() => {
            navigate(links.bounty(`${bounties.length + 1}`))
          }}
        >
          CREATE YOUR FIRST BOUNTY!
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className={s.card}>
        <div className={s.rows}>
          {bountiesFromMe.map((bounty, index) => (
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

              <div className={s.controls}>
                <Button
                  className={s.remove}
                  fashion="secondary"
                  onClick={() => handleRemove(bounty.id)}
                >
                  REMOVE
                </Button>
                <Button
                  className={s.edit}
                  fashion="accent-light"
                  onClick={() => handleEdit(bounty.id)}
                >
                  EDIT
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export const routeGifts = createRoute({
  component: RouteGifts,
  withBackButton: false,
})
