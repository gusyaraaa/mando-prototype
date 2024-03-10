import { useEffect, useRef, useState } from 'react'
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
  UserData,
  defaultBountiesData,
  defaultUserData,
  getChainName,
} from 'types/core'

import WarningMarkSVG from 'assets/warningMark.svg'

import s from './AcceptModal.module.scss'

type Props = {
  id: number
} & ModalProps

export const AcceptModal = (props: Props) => {
  const { id, ...rest } = props

  const [user] = useLocalStorage<UserData>('mando-user', defaultUserData)
  const [bounties, setBounties] = useLocalStorage<Bounty[]>(
    'mando-bounties',
    defaultBountiesData,
  )
  const bounty = bounties.find(b => b.id === id)
  const [addressInput, setAddressInput] = useState<string>(
    bounty?.address || '',
  )
  const [chainInput, setChainInput] = useState<Chains | undefined>(
    bounty?.chain,
  )
  const [errorMessage, setErrorMessage] = useState<string | null>()
  const addressRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!addressInput) {
      setChainInput(undefined)
      return
    }
    const chain = detectChain(addressInput)
    setChainInput(chain)
  }, [addressInput])

  if (!bounty) return <Navigate to={links.rewards} />

  const submit = () => {
    if (!user.verifiedAddresses?.includes(addressInput)) {
      setErrorMessage('This is not one of your verified addresses')
      addressRef.current?.focus()
      return
    }
    const filteredBounties = bounties.filter(b => b.id !== id)
    setBounties([
      ...filteredBounties,
      {
        ...bounty,
        address: addressInput,
        chain: chainInput!,
        status: BountyStatus.ACCEPTED,
      },
    ])
    rest.onClose()
  }

  return (
    <Modal {...rest} width={600}>
      <Title className={s.title} isUppercased isCentered>
        Accept bounty
      </Title>
      <div className={s.content}>
        <div className={s.cell}>
          <Text isUppercased>Receive bounty to the wallet</Text>
          <Input
            ref={addressRef}
            className={s.input}
            placeholderClassName={s.placeholder}
            placeholder="Address"
            value={addressInput}
            onChange={e => setAddressInput(e.target.value)}
          />
        </div>
        <div className={s.cell}>
          <div>
            <Text isUppercased isInLine>
              On chain{' '}
            </Text>
            <Text color="secondary80" isUppercased isInLine>
              {getChainName(chainInput!)}
            </Text>
          </div>
        </div>
        <Button
          type="submit"
          className={s.button}
          isDisabled={chainInput === undefined || !addressInput}
          onClick={submit}
        >
          ACCEPT
        </Button>
        {errorMessage ? <span className={s.error}>{errorMessage}</span> : <></>}
        <Text color="inherit" className={s.warningNote}>
          <WarningMarkSVG />
          <div>
            <Text color="warning" isInLine>
              Attention! If you accept the bounty, encrypted chat will be opened
              with the user{' '}
            </Text>
            <Text color="secondary80" isInLine>
              {bounty.from}
            </Text>
            <Text color="warning" isInLine>
              . If you don't reply within 3 days, the bounty will be returned.
              After you reply, the bounty will be sent to you from the escrow.
            </Text>
          </div>
        </Text>
      </div>
    </Modal>
  )
}
