import { Fragment, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import classNames from 'classnames'
import dayjs from 'dayjs'

import { useAcceptModal } from 'routes/RouteRewards/AcceptModal'
import { useRejectModal } from 'routes/RouteRewards/RejectModal'
import { createRoute } from 'modules/router/utils/createRoute'
import * as links from 'modules/router/links'
import { useLocalStorage } from 'shared/hooks/useLocalStorage'
import { Text } from 'shared/ui/common/Text'
import { Button } from 'shared/ui/controls/Button'
import { Input } from 'shared/ui/controls/Input'
import {
  UserData,
  Bounty,
  defaultBountiesData,
  defaultUserData,
  BountyStatus,
  Message,
} from 'types/core'

import SendSVG from 'assets/arrow-side.svg'
import LockSVG from 'assets/lock.svg'

import s from './RouteChat.module.scss'

function parseTimestamp(timestamp: string) {
  const dateTime = dayjs(timestamp)
  const time = dateTime.format('h:mm A')
  const date = dateTime.format(
    dateTime.year() !== dayjs().year() ? 'MMMM D, YYYY' : 'MMMM D',
  )

  return { time, date }
}

function RouteChat() {
  const [searchParams] = useSearchParams()
  const chatId = searchParams.get('id')
  const navigate = useNavigate()
  const [bounties, setBounties] = useLocalStorage<Bounty[]>(
    'mando-bounties',
    defaultBountiesData,
  )
  const [user] = useLocalStorage<UserData>('mando-user', defaultUserData)
  const chatRef = useRef<HTMLDivElement>(null)
  const [messageInput, setMessageInput] = useState<string>('')
  const [isMessageInputFocused, setIsMessageInputFocused] =
    useState<boolean>(false)
  const acceptModal = useAcceptModal()
  const rejectModal = useRejectModal()

  const bountyChats = useMemo(() => {
    return bounties.filter(
      bounty =>
        bounty.status === BountyStatus.INIT &&
        user.verifiedAddresses?.includes(bounty.address),
    )
  }, [bounties, user])

  const chats = useMemo(() => {
    const acceptedChats = bounties.filter(
      bounty => bounty.status === BountyStatus.ACCEPTED,
    )
    return [...acceptedChats, ...bountyChats]
  }, [bounties, user])

  const currentChat = useMemo(() => {
    if (!chatId) return
    return chats.find(chat => chat.id === +chatId)
  }, [chats, chatId])

  const messages = useMemo(() => {
    return currentChat?.messages || []
  }, [currentChat])

  useLayoutEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight)
  }, [chatRef, messages])

  const handleSendMessage = (message: Message) => {
    if (!chatId) return
    const newBounties = bounties.map(bounty => {
      if (bounty.id !== +chatId) {
        return bounty
      }

      return {
        ...bounty,
        messages: bounty.messages?.length
          ? [...bounty.messages, message]
          : [message],
      }
    })
    setBounties(newBounties)
    setMessageInput('')
  }

  const handleKeyDownMessageInput = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    message: Message,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (e.shiftKey) {
        return setMessageInput(messageInput + '\n')
      }
      if (messageInput) {
        handleSendMessage(message)
      }
    }
  }

  return (
    <>
      <div className={s.card}>
        <div className={s.chats}>
          <div className={s.rows}>
            {chats.map(chat => {
              const isChat = chat.status === BountyStatus.ACCEPTED
              const lastMessage = chat.messages?.at(-1)
              const today = dayjs()
              const lastMessageDate = dayjs(lastMessage?.createdAt)
              const isSameDate =
                today.isSame(lastMessageDate, 'day') &&
                today.isSame(lastMessageDate, 'month')
              const isMyMessage =
                lastMessage?.from === undefined ||
                lastMessage?.from === user.username
              const isNewChat = !lastMessage?.text

              return (
                <div
                  className={classNames(s.row, {
                    [s.isActive]: chatId && chat.id === +chatId,
                    [s.isBounty]: !isChat,
                  })}
                  onClick={() => navigate(links.chat(`${chat.id}`))}
                  key={chat.id}
                >
                  <div className={s.header}>
                    <Text className={s.username} size={14} weight={600}>
                      {chat.from}
                    </Text>
                    {lastMessage && (
                      <Text color="secondary80">
                        {!isSameDate
                          ? parseTimestamp(lastMessage.createdAt).date
                          : ''}{' '}
                        {parseTimestamp(lastMessage.createdAt).time}
                      </Text>
                    )}
                  </div>
                  {isChat ? (
                    <div className={s.messagePreview}>
                      {isMyMessage && !isNewChat && (
                        <Text
                          className={s.messagePreview}
                          color="secondary80"
                          isInLine
                        >
                          You:{' '}
                        </Text>
                      )}
                      <Text
                        color={!isNewChat ? 'default' : 'secondary80'}
                        className={s.messagePreview}
                        isInLine
                      >
                        {!isNewChat ? lastMessage?.text : 'Start chatting now!'}
                      </Text>
                    </div>
                  ) : (
                    <Text
                      color="secondary80"
                      className={s.messagePreview}
                      isInLine
                    >
                      Bounty of {chat.amount} {chat.asset}
                    </Text>
                  )}
                </div>
              )
            })}
          </div>
        </div>
        <div className={s.chat}>
          {currentChat ? (
            <>
              {currentChat?.status !== BountyStatus.ACCEPTED && (
                <div className={s.bountyConfirm}>
                  <LockSVG />
                  <Text size={24}>
                    Bounty of {currentChat.amount} {currentChat.asset}
                  </Text>
                  <div className={s.buttons}>
                    <Button
                      className={s.accept}
                      fashion="secondary"
                      onClick={() => acceptModal.open({ id: currentChat.id })}
                    >
                      ACCEPT
                    </Button>
                    <Button
                      className={s.reject}
                      fashion="error"
                      onClick={() => rejectModal.open({ id: currentChat.id })}
                    >
                      REJECT
                    </Button>
                  </div>
                </div>
              )}
              <div ref={chatRef} className={s.messages}>
                {messages?.map((message, index) => {
                  const prevMessage = messages[index - 1]
                  const prevMessageCreatedAt = dayjs(
                    prevMessage?.createdAt || '',
                  )
                  const messageCreatedAt = dayjs(message.createdAt)
                  const isSameDate =
                    messageCreatedAt.isSame(prevMessageCreatedAt, 'day') &&
                    messageCreatedAt.isSame(prevMessageCreatedAt, 'month') &&
                    messageCreatedAt.isSame(prevMessageCreatedAt, 'year')
                  const isMyMessage = message.from === user.username

                  return (
                    <Fragment key={message.id}>
                      {!isSameDate && (
                        <Text className={s.date}>
                          {parseTimestamp(message.createdAt).date}
                        </Text>
                      )}
                      <div
                        className={classNames(s.message, {
                          [s.you]: isMyMessage,
                        })}
                      >
                        <Text size={14}>
                          {message.text.split('\n').map((part, i) => (
                            <Fragment key={`${index}_${i}`}>
                              {i !== 0 ? <br /> : <></>}
                              {part}
                            </Fragment>
                          ))}
                        </Text>
                        <Text color="secondary80" className={s.time}>
                          {parseTimestamp(message.createdAt).time}
                        </Text>
                      </div>
                    </Fragment>
                  )
                })}
              </div>
              <div className={s.controls}>
                <Input
                  className={s.input}
                  placeholderClassName={classNames(s.placeholder, {
                    [s.placeholderInvisible]:
                      !!messageInput || isMessageInputFocused,
                  })}
                  placeholder="Write a message..."
                  value={messageInput}
                  type="textarea"
                  onChange={e => setMessageInput(e.target.value)}
                  onKeyDown={e =>
                    handleKeyDownMessageInput(e, {
                      id: messages?.length ? messages.length + 1 : 1,
                      from: user.username,
                      text: messageInput,
                      createdAt: new Date().toISOString(),
                    })
                  }
                  onFocus={() => setIsMessageInputFocused(true)}
                  onBlur={() => setIsMessageInputFocused(false)}
                />
                <Button
                  className={s.send}
                  fashion="secondary"
                  onClick={() => {
                    handleSendMessage({
                      id: messages?.length ? messages.length + 1 : 1,
                      from: user.username,
                      text: messageInput,
                      createdAt: new Date().toISOString(),
                    })
                  }}
                  isDisabled={!messageInput}
                >
                  <SendSVG />
                </Button>
              </div>
            </>
          ) : (
            <div className={s.empty}>
              <Text size={24}>Select a chat</Text>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export const routeChat = createRoute({
  component: RouteChat,
  withBackButton: false,
})
