import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

import { Link } from 'shared/ui/controls/Link'
import { ThemesEnum, getLSTheme, setLSTheme } from 'modules/themes'
import * as links from 'modules/router/links'
import { HeaderLogo } from '../HeaderLogo'
import { HeaderLink } from '../HeaderLink'
import { Button } from 'shared/ui/controls/Button'
import { useLocalStorage } from 'shared/hooks/useLocalStorage'
import {
  UserData,
  Bounty,
  defaultBountiesData,
  defaultUserData,
} from 'types/core'

import Markets from 'assets/markets.svg'
import Dashboard from 'assets/dashboard.svg'
import TransactionList from 'assets/transactionList.svg'
import Borrow from 'assets/borrow.svg'
import Wallet from 'assets/wallet.svg'
import Stake from 'assets/stake.svg'
import Theme from 'assets/theme.svg'

import s from './Header.module.scss'

function HeaderRaw() {
  const navigate = useNavigate()
  const [user, setUser] = useLocalStorage<UserData>(
    'mando-user',
    defaultUserData,
  )
  const [bounties] = useLocalStorage<Bounty[]>(
    'mando-bounties',
    defaultBountiesData,
  )

  const handleChangeTheme = () => {
    const theme = getLSTheme()
    setLSTheme(theme === ThemesEnum.DARK ? ThemesEnum.LIGHT : ThemesEnum.DARK)
    location.reload()
  }

  const handleLogout = () => {
    setUser({
      ...user,
      isAuth: false,
    })
    navigate(links.login)
  }

  return (
    <div className={s.header}>
      <div className={s.logos}>
        <Link to={links.leaderboard}>
          <HeaderLogo />
        </Link>
      </div>
      <div className={s.pageLinks}>
        <HeaderLink
          link={links.leaderboard}
          icon={<Markets />}
          children="Leaderboard"
          testId="header-leaderboard-link"
        />
        <HeaderLink
          link={links.chat()}
          icon={<Dashboard />}
          children="Chat"
          testId="header-chat-link"
        />
        <HeaderLink
          link={links.proveOwnership}
          icon={<TransactionList />}
          children="Prove address ownership"
          testId="header-proveOwnership-link"
        />
        <HeaderLink
          link={links.rewards}
          icon={<Wallet />}
          children="Bounties on me"
          testId="header-rewards-link"
        />
        <HeaderLink
          link={links.gifts}
          icon={<Borrow />}
          children="Bountied from me"
          testId="header-gifts-link"
        />
        <HeaderLink
          link={links.bounty(`${bounties.length + 1}`)}
          icon={<Stake />}
          children="Create bounty"
          testId="header-bounty-link"
        />
      </div>
      <div>
        <Button
          size={40}
          fashion={'accent-light'}
          onClick={handleLogout}
          testId="header-logout-button"
        >
          Log Out
        </Button>
      </div>
    </div>
  )
}

export const Header = memo(HeaderRaw)
