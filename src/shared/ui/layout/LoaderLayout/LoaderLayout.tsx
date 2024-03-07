import { useScrollLock } from 'shared/hooks/useScrollLock'

import LoaderSVG from 'assets/loader.svg'

import s from './LoaderLayout.module.scss'

export function LoaderLayout() {
  useScrollLock()
  return (
    <div className={s.root}>
      <LoaderSVG />
    </div>
  )
}
