import { memo } from 'react'

import { useMediaBreakpoints } from 'shared/hooks/useMediaBreakpoints'
import { Link } from 'shared/ui/controls/Link'
import * as links from 'modules/router/links'
import { HeaderLogo } from '../HeaderLogo'
import { HeaderLink } from '../HeaderLink'

import Leaderboard from 'assets/dashboard.svg'

import s from './Header.module.scss'

function HeaderRaw() {
  const { isTablet } = useMediaBreakpoints()

  return (
    <div className={s.header}>
      <div className={s.logos}>
        <Link to={links.leaderboard}>
          <HeaderLogo />
        </Link>
      </div>
      {!isTablet && (
        <div className={s.pageLinks}>
          <HeaderLink
            link={links.leaderboard}
            icon={<Leaderboard />}
            children="Leaderboard"
            testId="header-leaderboard-link"
          />
        </div>
      )}
    </div>
  )
}

export const Header = memo(HeaderRaw)
