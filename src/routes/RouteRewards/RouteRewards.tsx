import { useMemo } from 'react'

import { createRoute } from 'modules/router/utils/createRoute'
import { useLocalStorage } from 'shared/hooks/useLocalStorage'
import { Text } from 'shared/ui/common/Text'
import { Button } from 'shared/ui/controls/Button'
import {
  UserData,
  Bounty,
  defaultBountiesData,
  getChainName,
  defaultUserData,
  BountyStatus,
} from 'types/core'
import { useAcceptModal } from './AcceptModal'
import { useRejectModal } from './RejectModal'

import s from './RouteRewards.module.scss'
import classNames from 'classnames'

function RouteRewards() {
  const [bounties] = useLocalStorage<Bounty[]>(
    'mando-bounties',
    defaultBountiesData,
  )
  const [user] = useLocalStorage<UserData>('mando-user', defaultUserData)
  const acceptModal = useAcceptModal()
  const rejectModal = useRejectModal()

  const bountiesToMe = useMemo(() => {
    return bounties.filter(bounty =>
      user?.verifiedAddresses?.includes(bounty.address),
    )
  }, [bounties, user])

  if (!bountiesToMe.length) {
    return (
      <div className={s.empty}>
        <Text size={20}>Nothing found yet</Text>
      </div>
    )
  }

  return (
    <>
      <Text size={20}>
        Congratulations, someone really wants to talk to you! Here are the
        active bounties:
      </Text>
      <div className={s.card}>
        <div className={s.rows}>
          {bountiesToMe.map((bounty, index) => (
            <div className={s.row} key={`${bounty.address}_${index}`}>
              <div className={s.from}>
                <div className={s.label}>FROM</div>
                <div className={s.value}>{bounty.from}</div>
              </div>
              <div className={s.address}>
                <div className={s.label}>To</div>
                <div className={s.value}>{bounty.address}</div>
              </div>
              <div className={s.chain}>
                <div className={s.label}>Chain</div>
                <div className={s.value}>{getChainName(bounty.chain)}</div>
              </div>
              <div className={s.amount}>
                <div className={s.label}>Bounty amount</div>
                <div className={s.value}>
                  {bounty.amount} {bounty.asset}
                </div>
              </div>

              <div className={s.buttonsWrapper}>
                <a
                  href="https://etherscan.io/token/0xf1c9acdc66974dfb6decb12aa385b9cd01190e38#code"
                  target="_blank"
                >
                  <Button className={s.explorer} fashion="secondary">
                    See in explorer
                  </Button>
                </a>
                {bounty.status !== BountyStatus.INIT ? (
                  <Button
                    className={classNames({
                      [s.accept]: bounty.status === BountyStatus.ACCEPTED,
                      [s.reject]: bounty.status === BountyStatus.REJECTED,
                    })}
                    fashion={
                      bounty.status === BountyStatus.ACCEPTED
                        ? 'accent-light'
                        : 'secondary'
                    }
                    isClickable={false}
                  >
                    {bounty.status === BountyStatus.ACCEPTED
                      ? 'Accepted'
                      : 'Rejected'}
                  </Button>
                ) : (
                  <div className={s.controls}>
                    <Button
                      className={s.accept}
                      fashion="accent-light"
                      onClick={() => acceptModal.open({ id: bounty.id })}
                    >
                      Accept
                    </Button>
                    <Button
                      className={s.reject}
                      fashion="secondary"
                      onClick={() => rejectModal.open({ id: bounty.id })}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export const routeRewards = createRoute({
  component: RouteRewards,
  withBackButton: false,
})
