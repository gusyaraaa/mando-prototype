import { Outlet } from 'react-router-dom'
import cns from 'classnames'

import { AppWrap } from '../AppWrap'
import { AppInner } from '../AppInner'

import s from './AuthLayout.module.scss'

export function AuthLayout() {
  return (
    <AppWrap className={cns(s.wrap)}>
      <AppInner className={s.appInner}>
        <div className={s.content}>
          <Outlet />
        </div>
      </AppInner>
    </AppWrap>
  )
}
