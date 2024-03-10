import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { createRoute } from 'modules/router/utils/createRoute'
import * as links from 'modules/router/links'
import { useLocalStorage } from 'shared/hooks/useLocalStorage'
import { Text } from 'shared/ui/common/Text'
import { Input } from 'shared/ui/controls/Input'
import { Button } from 'shared/ui/controls/Button'
import { Checkbox } from 'shared/ui/controls/Checkbox'
import { UserData, defaultUserData } from 'types/core'

import s from './RouteRegistration.module.scss'

function RouteRegistration() {
  const navigate = useNavigate()
  const [user, setUser] = useLocalStorage<UserData | undefined>(
    'mando-user',
    undefined,
  )
  const [usernameInput, setUsernameInput] = useState<string>('')
  const [emailInput, setEmailInput] = useState<string>('')
  const [passwordInput, setPasswordInput] = useState<string>('')
  const [passwordConfirmationInput, setPasswordConfirmationInput] =
    useState<string>('')
  const [isRecieveChecked, setIsRecieveChecked] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>()
  const usernameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordConfirmationRef = useRef<HTMLInputElement>(null)

  const submit = () => {
    if (user) {
      if (user.username === usernameInput) {
        setErrorMessage('User with this username already exists')
        usernameRef.current?.focus()
        return
      }
      if (user.email === emailInput) {
        setErrorMessage('User with this email already exists')
        emailRef.current?.focus()
        return
      }
    }
    if (passwordInput !== passwordConfirmationInput) {
      setErrorMessage("Passwords don't match")
      passwordConfirmationRef.current?.focus()
      return
    }
    setUser({
      username: usernameInput,
      email: emailInput,
      password: passwordInput,
      isAuth: true,
      verifiedAddresses: defaultUserData.verifiedAddresses,
    })
    navigate(links.leaderboard)
  }

  return (
    <>
      <div className={s.header}>
        <Text size={24} weight={600} isUppercased isInLine>
          Sign Up{' '}
        </Text>
        <Text size={24} weight={600} color="secondary" isUppercased isInLine>
          To start <br /> using mando
        </Text>
      </div>
      <div className={s.form}>
        <Input
          ref={usernameRef}
          className={s.input}
          placeholderClassName={s.placeholder}
          placeholder="Username"
          value={usernameInput}
          onChange={e => setUsernameInput(e.target.value)}
        />
        <Input
          ref={emailRef}
          className={s.input}
          placeholderClassName={s.placeholder}
          placeholder="Email"
          value={emailInput}
          onChange={e => setEmailInput(e.target.value)}
        />
        <Input
          className={s.input}
          placeholderClassName={s.placeholder}
          placeholder="Password"
          value={passwordInput}
          onChange={e => setPasswordInput(e.target.value)}
          type="password"
        />
        <Input
          ref={passwordConfirmationRef}
          className={s.input}
          placeholderClassName={s.placeholder}
          placeholder="Confirm password"
          value={passwordConfirmationInput}
          onChange={e => setPasswordConfirmationInput(e.target.value)}
          type="password"
        />
        <div className={s.checkbox}>
          <Checkbox
            checked={isRecieveChecked}
            onChange={() => setIsRecieveChecked(!isRecieveChecked)}
          />
          <Text color="secondary80" isUppercased>
            Subscribe to receive emails from RA
          </Text>
        </div>
        <Button
          type="submit"
          className={s.button}
          isDisabled={
            !usernameInput ||
            !emailInput ||
            !passwordInput ||
            !passwordConfirmationInput
          }
          onClick={submit}
        >
          JOIN
        </Button>
        {errorMessage ? <span className={s.error}>{errorMessage}</span> : <></>}
      </div>
      <div className={s.toRegister} onClick={() => navigate(links.login)}>
        <Text color="secondary80" isInLine isUppercased>
          Already have an account?{' '}
        </Text>
        <Text color="greenapple" isInLine isUppercased>
          Sign In
        </Text>
      </div>
    </>
  )
}

export const routeRegistration = createRoute({
  component: RouteRegistration,
  withBackButton: false,
})
