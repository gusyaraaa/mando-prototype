import cns from 'classnames'
import { Outlet, useLocation } from 'react-router-dom'
import { useRouteMeta } from 'modules/router/hooks/useRouteMeta'

import { AppWrap } from '../AppWrap'
import { AppInner } from '../AppInner'
import { Header } from '../Header'
import { useMediaBreakpoints } from 'shared/hooks/useMediaBreakpoints'
import { PageBackButton } from '../PageBackButton'
import { NarrowWrapper } from '../NarrowWrapper'
// import { ZkWarningBanner } from '../ZkWarningBanner'

// eslint-disable-next-line css-modules/no-undef-class
import s from './AppLayout.module.scss'

export function AppLayout() {
  const routeMeta = useRouteMeta()
  const location = useLocation()
  const { isTablet } = useMediaBreakpoints()
  const isNarrow = routeMeta.layoutType === 'narrow'
  const withBackButton = routeMeta.withBackButton ?? true
  const isTitleHidden =
    !routeMeta.headerTitle ||
    (!isTablet &&
      (location.hash === '#confirmed' ||
        location.pathname.includes('borrow-sent')))
  const isMobileAvailable = routeMeta.isMobileAvailable ?? true

  return (
    <>
      {/* <ZkWarningBanner /> */}
      <AppWrap
        isMobileAvailable={isMobileAvailable}
        className={cns(s.wrap, {
          [s.isNarrow]: isNarrow,
        })}
      >
        <AppInner className={s.appInner}>
          <Header />
          <div className={s.content}>
            <div className={s.titleHeader}>
              {withBackButton && <PageBackButton className={s.backButton} />}
              {!isTitleHidden && (
                <div className={s.title}>{routeMeta.headerTitle}</div>
              )}
            </div>
            {isNarrow ? (
              <NarrowWrapper>
                <Outlet />
              </NarrowWrapper>
            ) : (
              <Outlet />
            )}
          </div>
        </AppInner>
      </AppWrap>
    </>
  )
}
