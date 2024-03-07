import cns from 'classnames'
import s from './NarrowWrapper.module.scss'

type Props = {
  className?: string
  style?: React.CSSProperties
  isCentered?: boolean
  children?: React.ReactNode
}

export function NarrowWrapper({
  className,
  isCentered,
  style,
  children,
}: Props) {
  return (
    <div
      style={style}
      className={cns(s.wrap, className, { [s.isCentered]: isCentered })}
    >
      {children}
    </div>
  )
}
