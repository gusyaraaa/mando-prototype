import { useMemo } from 'react'
import cns from 'classnames'
import { getThemeColors, useTheme } from 'modules/themes'
import { QuestionTooltip } from '../../QuestionTooltip'

import Order from 'assets/order.svg'

import s from './TableCellHead.module.scss'

export type TableCellHeadData = {
  title: React.ReactNode
  titleTooltip?: React.ReactNode
  sortField?: string
  color?: keyof ReturnType<typeof getThemeColors>
}

type Props = {
  cellData: TableCellHeadData
  isActive?: boolean
  isDesc?: boolean
  onClickSort?: () => void
}

export function TableCellHead(props: Props) {
  const { cellData, isActive, isDesc, onClickSort } = props
  const { sortField, color, title, titleTooltip } = cellData

  const { colors } = useTheme()

  const style = useMemo(
    () => ({ color: color ? colors[color] : undefined }),
    [color, colors],
  )

  if (!sortField) {
    return (
      <div style={style} className={s.headCell}>
        {title}
      </div>
    )
  }

  return (
    <div
      style={style}
      className={cns(s.sortHeadCell, s.headCell, {
        [s.isActive]: isActive,
        [s.isDesc]: isDesc,
      })}
      onClick={onClickSort}
    >
      <div className={s.sortHeadCellInner}>
        <div className={s.sortHeadCellLabel}>
          {title}{' '}
          {titleTooltip ? (
            <QuestionTooltip
              tooltip={titleTooltip}
              className={s.tooltip}
              position="bottom"
            />
          ) : null}
        </div>
        <div className={s.sortHeadControl}>
          <Order />
        </div>
      </div>
    </div>
  )
}
