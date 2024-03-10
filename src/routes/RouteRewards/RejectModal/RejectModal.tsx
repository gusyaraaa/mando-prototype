import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

import { Modal, ModalProps } from 'modules/modal/ui/Modal'
import * as links from 'modules/router/links'
import { useLocalStorage } from 'shared/hooks/useLocalStorage'
import { Text } from 'shared/ui/common/Text'
import { Title } from 'shared/ui/common/Title'
import { Input } from 'shared/ui/controls/Input'
import { Button } from 'shared/ui/controls/Button'
import { detectChain } from 'shared/utils/detectChain'
import {
  Bounty,
  BountyStatus,
  Chains,
  defaultBountiesData,
  getChainName,
} from 'types/core'

import WarningMarkSVG from 'assets/warningMark.svg'

import s from './RejectModal.module.scss'

type Props = {
  id: number
} & ModalProps

export const RejectModal = (props: Props) => {
  const { id, ...rest } = props

  const [bounties, setBounties] = useLocalStorage<Bounty[]>(
    'mando-bounties',
    defaultBountiesData,
  )
  const bounty = bounties.find(b => b.id === id)

  if (!bounty) return <Navigate to={links.rewards} />

  const submit = () => {
    const filteredBounties = bounties.filter(b => b.id !== id)
    setBounties([
      ...filteredBounties,
      {
        ...bounty,
        status: BountyStatus.REJECTED,
      },
    ])
    rest.onClose()
  }

  return (
    <Modal {...rest} width={600}>
      <Title className={s.title} isUppercased isCentered>
        Reject bounty
      </Title>
      <div className={s.content}>
        <div className={s.cell}>
          <Text isUppercased>Are you sure you want to reject it?</Text>
        </div>
        <div className={s.controls}>
          <Button
            type="submit"
            fashion="secondary"
            className={s.yes}
            onClick={submit}
          >
            Yes
          </Button>
          <Button
            type="submit"
            fashion="error"
            className={s.no}
            onClick={() => rest.onClose()}
          >
            No
          </Button>
        </div>
      </div>
    </Modal>
  )
}
