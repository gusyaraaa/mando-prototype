import cns from 'classnames'
import s from './Table.module.scss'

type Props = {
  children: React.ReactNode
  className?: string
}

export function Table({ children, className }: Props) {
  return <div className={cns(s.table, className)}>{children}</div>
}
