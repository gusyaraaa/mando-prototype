import { useRouteMeta } from 'modules/router/hooks/useRouteMeta'
import { Outlet } from 'react-router-dom'
import { AppWrap } from '../AppWrap'
import { HeaderLogo } from '../HeaderLogo'
import { PageBackButton } from '../PageBackButton'
import { leaderboard } from 'modules/router/links'

import s from './AppLayoutMinimal.module.scss'

export function AppLayoutMinimal() {
  const routeMeta = useRouteMeta()

  const BackButtonComponent = routeMeta.backButtonComponent
  const withLogo = routeMeta.withLogo ?? true
  const isMobileAvailable = routeMeta.isMobileAvailable ?? true

  return (
    <AppWrap isMobileAvailable={isMobileAvailable}>
      <div className={s.wrap}>
        {BackButtonComponent ? (
          <BackButtonComponent className={s.backButton} />
        ) : (
          routeMeta.withBackButton && (
            <PageBackButton className={s.backButton} />
          )
        )}
        {withLogo && <HeaderLogo linkTo={leaderboard} className={s.logo} />}
        <Outlet />
      </div>
    </AppWrap>
  )
}
