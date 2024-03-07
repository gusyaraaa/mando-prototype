import cns from 'classnames'

import s from './TableRow.module.scss'

type Props = {
  isHead?: boolean
  className?: string
  gridTemplateColumns: string
  children: React.ReactNode
}

export function TableRow({
  isHead,
  className,
  gridTemplateColumns,
  children,
}: Props) {
  return (
    <div
      style={{ gridTemplateColumns }}
      className={cns(s.gridRow, className, isHead ? s.headerRow : s.bodyRow)}
    >
      {children}
    </div>
  )
}
