import cns from 'classnames'
import { Text, TextSize } from 'shared/ui/common/Text'
import { Tooltip } from 'shared/ui/common/Tooltip'

import s from './LockedValue.module.scss'

export type LockedValueGenericProps = {
  label: React.ReactNode
  subvalue?: React.ReactNode
  valueSize?: TextSize
  className?: string
  tooltip?: React.ReactNode
  showTooltipUnformatted?: boolean
  getIcon?: (val: string) => React.ReactNode
  formatValue?: (val: string) => React.ReactNode
}

type Props = LockedValueGenericProps & { value: string }

export function LockedValue(props: Props) {
  const {
    label,
    subvalue,
    getIcon,
    formatValue,
    tooltip,
    showTooltipUnformatted,
    valueSize,
    value,
    className,
  } = props

  const formattedValue = formatValue ? formatValue(value) : value

  const labelEl = (
    <Text size={12} weight={500} isUppercased color="secondary">
      {label}
    </Text>
  )

  if (getIcon && value) {
    return (
      <div className={cns(s.wrap, className)}>
        <div>
          {labelEl}
          <Text size={valueSize || 16} weight={500}>
            {formattedValue}
          </Text>
        </div>
        <div className={s.icon}>{getIcon(value)}</div>
      </div>
    )
  }

  return (
    <div className={cns(s.wrap, className)}>
      {labelEl}
      <div>
        <Tooltip
          tooltip={tooltip || (showTooltipUnformatted ? value : formattedValue)}
        >
          <Text
            size={valueSize || 28}
            weight={500}
            className={s.value}
            truncateLines={1}
          >
            {formattedValue}
          </Text>
        </Tooltip>
        <Text size={12} weight={500} color="secondary" className={s.subvalue}>
          {subvalue}
        </Text>
      </div>
    </div>
  )
}
