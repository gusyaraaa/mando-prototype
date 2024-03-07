import cns from 'classnames'

import s from './FieldError.module.scss'

import WarningSVG from 'assets/warningMark.svg'
import { Text } from 'shared/ui/common/Text'

type Props = {
  direction?: 'top' | 'bottom'
  children?: React.ReactNode
  className?: string
}

export function FieldError({
  className,
  children,
  direction = 'bottom',
}: Props) {
  if (!children) return null

  return (
    <div
      className={cns(s.message, className, {
        [s.toTop]: direction === 'top',
        [s.toBottom]: direction === 'bottom',
      })}
    >
      <Text
        color="error"
        isUppercased
        size={12}
        weight={500}
        className={s.label}
      >
        Error <WarningSVG />
      </Text>
      {children}
    </div>
  )
}
