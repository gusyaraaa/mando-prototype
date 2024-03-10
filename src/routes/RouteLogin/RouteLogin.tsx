import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { createRoute } from 'modules/router/utils/createRoute'
import * as links from 'modules/router/links'
import { useLocalStorage } from 'shared/hooks/useLocalStorage'
import { Text } from 'shared/ui/common/Text'
import { Input } from 'shared/ui/controls/Input'
import { Button } from 'shared/ui/controls/Button'
import { UserData } from 'types/core'

import s from './RouteLogin.module.scss'

function RouteLogin() {
  const navigate = useNavigate()
  const [user, setUser] = useLocalStorage<UserData | undefined>(
    'mando-user',
    undefined,
  )
  const [emailInput, setEmailInput] = useState<string>(
    user?.email ? user.email : '',
  )
  const [passwordInput, setPasswordInput] = useState<string>(
    user?.password ? user.password : '',
  )
  const [errorMessage, setErrorMessage] = useState<string | null>()
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const submit = () => {
    if (!user?.email || !user?.password) {
      setErrorMessage('Account was not found')
      return
    }
    if (emailInput !== user.email) {
      setErrorMessage('Invalid email')
      emailRef.current?.focus()
      return
    }
    if (passwordInput !== user.password) {
      setErrorMessage('Invalid password')
      passwordRef.current?.focus()
      return
    }
    setUser({ ...user, isAuth: true })
    navigate(links.leaderboard)
  }

  return (
    <>
      <div className={s.header}>
        <Text size={24} weight={600} isUppercased>
          Sign In
        </Text>
        <Text size={24} weight={600} color="secondary" isUppercased>
          Welcome back
        </Text>
      </div>
      <div className={s.form}>
        <Input
          ref={emailRef}
          className={s.input}
          placeholderClassName={s.placeholder}
          placeholder="Email"
          value={emailInput}
          onChange={e => setEmailInput(e.target.value)}
        />
        <Input
          ref={passwordRef}
          className={s.input}
          placeholderClassName={s.placeholder}
          placeholder="Password"
          value={passwordInput}
          onChange={e => setPasswordInput(e.target.value)}
          type="password"
        />
        <Button
          type="submit"
          className={s.button}
          isDisabled={!emailInput || !passwordInput}
          onClick={submit}
        >
          SIGN IN
        </Button>
        {errorMessage ? <span className={s.error}>{errorMessage}</span> : <></>}
      </div>
      <div
        className={s.toRegister}
        onClick={() => navigate(links.registration)}
      >
        <Text color="secondary80" isUppercased>
          Let's register a new account!
        </Text>
      </div>
    </>
  )
}

export const routeLogin = createRoute({
  component: RouteLogin,
  withBackButton: false,
})
