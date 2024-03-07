import cns from 'classnames'
import { memo, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'shared/ui/controls/Link'

import s from './HeaderLink.module.scss'

type HeaderLinkProps = {
  link: string
  matchLinks?: string[]
  icon: React.ReactNode
  children: React.ReactNode
  testId?: string
  onClick?: () => void
  className?: string
}

function HeaderLinkRaw({
  link,
  matchLinks,
  icon,
  children,
  testId,
  onClick,
  className,
}: HeaderLinkProps) {
  const { pathname } = useLocation()

  const isActive = useMemo(
    () => pathname === link || matchLinks?.includes(pathname),
    [link, matchLinks, pathname],
  )

  return (
    <Link
      testId={testId}
      to={link}
      className={cns(s.headerLink, className, {
        [s.isActive]: isActive,
      })}
      onClick={onClick}
    >
      <div className={s.linkIcon}>{icon}</div>
      <div>{children}</div>
    </Link>
  )
}

export const HeaderLink = memo(HeaderLinkRaw)
