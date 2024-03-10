import { useMemo } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { createRoute } from 'modules/router/utils/createRoute'
import * as links from 'modules/router/links'
import { useLocalStorage } from 'shared/hooks/useLocalStorage'
import { LockedValue } from 'shared/ui/LockedValue'
import { FormLockedValuesList } from 'shared/ui/common/FormLockedValue'
import { Button } from 'shared/ui/controls/Button'
import {
  Bounty,
  UserData,
  defaultBountiesData,
  defaultUserData,
  getChainName,
} from 'types/core'

import s from './RouteBounty.module.scss'

function RouteBountyConfirm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useLocalStorage<UserData>(
    'mando-user',
    defaultUserData,
  )
  const [bounties, setBounties] = useLocalStorage<Bounty[]>(
    'mando-bounties',
    defaultBountiesData,
  )

  const bounty = useMemo(() => {
    if (!id) return
    return bounties.find(b => b.id === +id)
  }, [bounties, id])

  if (!bounties || !id) return <Navigate to={links.bounty()} replace />

  if (!bounty)
    return <Navigate to={links.bounty(`${bounties.length + 1}`)} replace />

  const submit = () => {
    // TODO: should open a metamask wallet
    const filteredBounties = bounties.filter(b => b.id !== bounty.id)
    setBounties([
      ...filteredBounties,
      {
        ...bounty,
        isConfirmed: true,
      },
    ])
    setUser({
      ...user,
      gifts: user?.gifts ? [...user.gifts, bounty] : [bounty],
    } as UserData)
    navigate(links.gifts)
  }

  return (
    <>
      <FormLockedValuesList>
        <LockedValue label="Chain" value={getChainName(bounty.chain)} />
        <LockedValue label="Address" value={bounty.address} />
        <LockedValue
          label="Bounty"
          value={`${bounty.amount} ${bounty.asset}`}
        />
        <LockedValue label="Expiration date" value={bounty.expirationDate!} />
      </FormLockedValuesList>
      <Button type="submit" className={s.confirmButton} onClick={submit}>
        LOOKS GOOD, CREATE
      </Button>
    </>
  )
}

export const routeBountyConfirm = createRoute({
  component: RouteBountyConfirm,
  layoutType: 'narrow',
  withBackButton: true,
})
