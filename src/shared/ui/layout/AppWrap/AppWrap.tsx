import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cns from 'classnames'
import { useMediaBreakpoints } from 'shared/hooks/useMediaBreakpoints'
import { Button } from 'shared/ui/controls/Button'
import { Title } from 'shared/ui/common/Title'
import { Text } from 'shared/ui/common/Text'

import LogoSmall from 'assets/logo-small.svg'
import ArrowIcon from 'assets/forward.svg'
import CloseSVG from 'assets/close.svg'
import planet from 'assets/planet.png'

import s from './AppWrap.module.scss'

type Props = {
  className?: string
  children?: React.ReactNode
  isMobileAvailable?: boolean
}

export function AppWrap({ className, children, isMobileAvailable }: Props) {
  const navigate = useNavigate()
  const { isMobile } = useMediaBreakpoints()
  const [isContentAvailable, setIsContentAvailable] = useState(false)

  if (!isMobileAvailable && isMobile && !isContentAvailable) {
    return (
      <div className={s.mobilePlaceholder}>
        <img src={planet} alt="" />
        <div className={s.roundGradient} />
        <div className={s.header}>
          <LogoSmall />
          <Button
            onClick={() => navigate(-1)}
            size={40}
            isSquare
            fashion="secondary"
            className={s.close}
            testId="app-wrap-close-button"
          >
            <CloseSVG />
          </Button>
        </div>
        <Title className={s.title} isCentered>
          RociFi <br />
          experience is better <br />
          on Desktop
        </Title>
        <div className={s.showContent}>
          <Text weight={500} className={s.description}>
            Continue using desktop
            <br />
            experience on mobile
          </Text>
          <Button
            size={40}
            isSquare
            fashion="secondary"
            onClick={() => setIsContentAvailable(true)}
          >
            <ArrowIcon />
          </Button>
        </div>
      </div>
    )
  }

  return <div className={cns(s.wrap, className)}>{children}</div>
}
