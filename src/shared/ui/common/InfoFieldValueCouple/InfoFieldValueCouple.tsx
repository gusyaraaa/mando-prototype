import cns from 'classnames'
import s from './InfoFieldValueCouple.module.scss'

type Props = {
  withLine?: boolean
  className?: string
  children?: React.ReactNode
}

export function InfoFieldValueCouple({ withLine, className, children }: Props) {
  return (
    <div className={cns(s.wrap, className, { [s.withLine]: withLine })}>
      {children}
    </div>
  )
}
