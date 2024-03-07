/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useLocation, useNavigate } from 'react-router-dom'
import { useCallback, useMemo } from 'react'
import cns from 'classnames'
import { Text } from 'shared/ui/common/Text'
import { Button } from 'shared/ui/controls/Button'

import BackSVG from 'assets/back.svg'

import s from './PageBackButton.module.scss'

type Props = {
  title?: string
  isDisabled?: boolean
  className?: string
  onClick?: () => void
}

export const PageBackButton = ({
  title,
  isDisabled,
  className,
  onClick,
}: Props) => {
  const navigate = useNavigate()
  const location = useLocation()

  const previousPathName = useMemo(() => {
    if (title) return title
    if (location.hash === '#confirm') return 'edit'

    const state = location.state as { from?: string } | undefined

    if (location.pathname.includes('staking') && !state?.from) return 'staking'
    if (
      location.hash === '#confirmed' ||
      location.pathname.includes('borrow-sent') ||
      !state?.from
    )
      return 'dashboard'

    const pathSplitted = state.from.split('/')

    const name = pathSplitted[2]
    if (!name.length) {
      return 'back'
    }
    return name.replaceAll('-', ' ')
  }, [title, location.hash, location.state])

  const handleButtonClick = useCallback(() => {
    if (onClick) {
      onClick()
    } else {
      navigate(-1)
    }
  }, [onClick, location.state, location.hash])

  return (
    <div className={cns(s.wrap, className)}>
      <Text className={s.previousPath} size={12} isUppercased>
        {previousPathName}
      </Text>
      <Button
        size={40}
        fashion="secondary"
        isSquare
        isDisabled={isDisabled}
        onClick={handleButtonClick}
      >
        <BackSVG />
      </Button>
    </div>
  )
}
