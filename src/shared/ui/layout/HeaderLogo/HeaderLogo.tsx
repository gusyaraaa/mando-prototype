import cns from 'classnames'
import { To, Link } from 'react-router-dom'

import LogoSmall from 'assets/logo-small.svg'

import s from './HeaderLogo.module.scss'

type Props = {
  linkTo?: To
  className?: string
}

export function HeaderLogo({ linkTo, className }: Props) {
  const props = {
    className: cns(s.logo, className),
    children: <LogoSmall className={s.logoSmall} />,
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
