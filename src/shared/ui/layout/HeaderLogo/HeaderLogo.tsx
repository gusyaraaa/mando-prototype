import cns from 'classnames'
import { To, Link } from 'react-router-dom'

import { useMediaBreakpoints } from 'shared/hooks/useMediaBreakpoints'
import Logo from 'assets/logo.svg'
import LogoSmall from 'assets/logo-small.svg'

import s from './HeaderLogo.module.scss'

type Props = {
  linkTo?: To
  className?: string
}

export function HeaderLogo({ linkTo, className }: Props) {
  const { isDesktopSmall } = useMediaBreakpoints()
  const props = {
    className: cns(s.logo, className),
    children: isDesktopSmall ? <LogoSmall className={s.logoSmall} /> : <Logo />,
  }

  if (linkTo) {
    return (
      <Link to={linkTo} className={props.className}>
        {props.children}
      </Link>
    )
  }

  return <div {...props} />
}
