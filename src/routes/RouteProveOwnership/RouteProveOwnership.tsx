import { Fragment, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { createRoute } from 'modules/router/utils/createRoute'
import { noop } from 'shared/utils/noop'
import { useLocalStorage } from 'shared/hooks/useLocalStorage'
import { Text } from 'shared/ui/common/Text'
import { Tab, Tabs } from 'shared/ui/common/Tabs'
import { Input } from 'shared/ui/controls/Input'
import { Button } from 'shared/ui/controls/Button'
import {
  Asset,
  UserData,
  Chains,
  getChainName,
  defaultUserData,
} from 'types/core'

import WarningMarkSVG from 'assets/warningMark.svg'

import s from './RouteProveOwnership.module.scss'

const ourAddresses = [
  {
    address: '2be001babd4b7071e2b8cce99',
    amount: 0.00034,
    asset: Asset.BTC,
    chain: Chains.BTC,
  },
  {
    address: '0xefb2b3ce9304fe5dcfab546f8fc4a6c9da11dd70',
    amount: 0.0041,
    asset: Asset.ETH,
    chain: Chains.EVM,
  },
  {
    address: 'So47eadab2789735a2ebc6c0daa48b565912b88a384d',
    amount: 0.0021,
    asset: Asset.SOL,
    chain: Chains.Solana,
  },
]

function RouteProveOwnership() {
  const { hash } = useLocation()
  const navigate = useNavigate()
  const [user] = useLocalStorage<UserData>('mando-user', defaultUserData)
  const [currentTab, setCurrentTab] = useState(0)
  const [verificationStep, setVerificationStep] = useState(0)
  const [messageInput, setMessageInput] = useState<string>('')

  useEffect(() => {
    if (hash) {
      setCurrentTab(1)
    }
  }, [])

  const renderVerified = () => {
    if (!user || !user.verifiedAddresses?.length) {
      return <Text size={20}>Nothing has been verified yet</Text>
    }
    return (
      <>
        <Text size={20}>
          You successfully verified ownership of the following addresses:
        </Text>
        <div className={s.list}>
          {user.verifiedAddresses.map(address => (
            <Text key={address}>{address}</Text>
          ))}
        </div>
      </>
    )
  }

  return (
    <>
      <div className={s.header}>
        <Text size={24} weight={600}>
          Here you can prove ownership of your addresses and claim your
          bounties!
        </Text>
      </div>
      <Tabs currentTab={currentTab} onChange={setCurrentTab}>
        <Tab title="Verified" />
        <Tab title="Not verified" />
      </Tabs>
      <div className={s.content}>
        {currentTab === 0 && renderVerified()}
        {currentTab === 1 && (
          <>
            <Text color="inherit" className={s.warningNote}>
              <WarningMarkSVG />
              Requirement: address should have a bounty on it or equity of 10000
              USD or more.
            </Text>
            <div className={s.options}>
              <div className={s.option}>
                <Text>
                  <b>Option 1:</b> Connect your web wallet, sign a message
                </Text>
                {verificationStep === 0 && (
                  <Button
                    className={s.button}
                    onClick={() => {
                      setVerificationStep(1) // TODO: add wallet connect
                    }}
                    size={40}
                  >
                    CONNECT
                  </Button>
                )}
              </div>
              {verificationStep >= 1 && (
                <div className={s.option}>
                  <Text>
                    <b>Option 2:</b> Sign message offline, paste it here
                  </Text>
                  <Input
                    className={s.input}
                    placeholder="Message"
                    value={messageInput}
                    onChange={e => setMessageInput(e.target.value)}
                  />
                  {verificationStep === 1 && (
                    <Button
                      className={s.button}
                      onClick={() => {
                        setVerificationStep(2)
                      }}
                      isDisabled={!messageInput}
                      size={40}
                    >
                      SEE INSTRUCTIONS
                    </Button>
                  )}
                </div>
              )}
              {verificationStep >= 2 && (
                <div className={s.option}>
                  <Text>
                    <b>Option 3:</b> Send tokens to our address (will be refund)
                  </Text>
                  {ourAddresses.map((address, index) => (
                    <Fragment key={address.address}>
                      {index !== 0 && <Text>Or</Text>}
                      <div>
                        <Text isInLine>Send </Text>
                        <Text color="secondary80" isInLine>
                          {address.amount} {address.asset}
                        </Text>
                        <Text isInLine> to this </Text>
                        <Text color="secondary80" isInLine>
                          {getChainName(address.chain)}
                        </Text>
                        <Text isInLine> address: </Text>
                        <Text color="secondary80" isInLine>
                          {address.address}
                        </Text>
                      </div>
                    </Fragment>
                  ))}
                  {verificationStep === 2 && (
                    <Button className={s.button} onClick={noop} size={40}>
                      RE-GENERATE AMOUNTS
                    </Button>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export const routeProveOwnership = createRoute({
  component: RouteProveOwnership,
  withBackButton: false,
})
