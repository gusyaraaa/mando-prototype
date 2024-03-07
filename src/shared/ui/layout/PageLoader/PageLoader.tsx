import cns from 'classnames'

import LoaderSVG from 'assets/logo-loader.svg'

import s from './PageLoader.module.scss'

type Props = {
  className?: string
  isFullHeight?: boolean
}

export function PageLoader({ className, isFullHeight }: Props) {
  return (
    <div
      className={cns(s.pageLoaderWrap, className, {
        [s.isFullHeight]: isFullHeight,
      })}
    >
      <LoaderSVG />
    </div>
  )
}
