import { Tooltip, Position } from 'shared/ui/common/Tooltip'
import { Text, TextSize, TextColor } from 'shared/ui/common/Text'
import s from './InfoFieldValue.module.scss'

type TooltipedIfNeededProps = {
  value?: React.ReactNode
  tooltip?: React.ReactNode
  sign?: React.ReactNode
  tooltipMaxWidth?: number
  tooltipPosition?: Position
}

function TooltipedIfNeeded({
  value,
  sign,
  tooltip,
  tooltipMaxWidth,
  tooltipPosition,
}: TooltipedIfNeededProps) {
  return (
    <>
      {tooltip ? (
        <Tooltip
          tooltip={tooltip}
          className={s.truncatedWrap}
          maxWidth={tooltipMaxWidth}
          position={tooltipPosition}
        >
          {value}
          {sign && (
            <>
              &nbsp;
              <span>{sign}</span>
            </>
          )}
        </Tooltip>
      ) : (
        <>
          {value}
          {sign && (
            <>
              &nbsp;
              <span>{sign}</span>
            </>
          )}
        </>
      )}
    </>
  )
}

type Props = {
  label?: React.ReactNode
  value?: React.ReactNode
  valueSize?: TextSize
  valueColor?: TextColor
  tooltip?: React.ReactNode
  sign?: React.ReactNode
  tooltipMaxWidth?: number
  tooltipPosition?: Position
  secondaryValue?: React.ReactNode
  secondaryValueSize?: TextSize
  secondaryValueColor?: TextColor
  secondaryValueTooltip?: React.ReactNode
  secondaryValueSign?: React.ReactNode
  secondaryTooltipMaxWidth?: number
  secondaryTooltipPosition?: Position
  className?: string
  testId?: string
}

export function InfoFieldValue({
  label,
  value,
  valueSize = 16,
  valueColor = 'default',
  tooltip,
  sign,
  tooltipMaxWidth,
  tooltipPosition,
  secondaryValue,
  secondaryValueColor = 'secondary',
  secondaryValueSize = 14,
  secondaryValueTooltip,
  secondaryValueSign,
  secondaryTooltipMaxWidth,
  secondaryTooltipPosition,
  className,
  testId,
}: Props) {
  return (
    <div className={className}>
      <Text
        size={12}
        weight={500}
        isUppercased
        color="secondary"
        className={s.label}
      >
        {label}
      </Text>
      <Text
        color={valueColor}
        size={valueSize}
        weight={500}
        isUppercased
        className={s.value}
        testId={testId}
      >
        <TooltipedIfNeeded
          value={value}
          tooltip={tooltip}
          sign={sign}
          tooltipMaxWidth={tooltipMaxWidth}
          tooltipPosition={tooltipPosition}
        />
      </Text>
      {/* This triple-check is here because zero-number value can be there */}
      {secondaryValue !== '' &&
        secondaryValue !== null &&
        secondaryValue !== undefined && (
          <Text
            color={secondaryValueColor}
            size={secondaryValueSize}
            isUppercased
            weight={500}
          >
            <TooltipedIfNeeded
              value={secondaryValue}
              tooltip={secondaryValueTooltip}
              sign={secondaryValueSign}
              tooltipMaxWidth={secondaryTooltipMaxWidth || tooltipMaxWidth}
              tooltipPosition={secondaryTooltipPosition || tooltipPosition}
            />
          </Text>
        )}
    </div>
  )
}
