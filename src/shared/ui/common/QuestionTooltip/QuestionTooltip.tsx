import cns from 'classnames'
import { Tooltip } from '../Tooltip'

import QuestionMarkSVG from 'assets/question-mark.svg'

import s from './QuestionTooltip.module.scss'

type TooltipProps = React.ComponentProps<typeof Tooltip>

type Props = Omit<TooltipProps, 'children'>

export function QuestionTooltip(props: Props) {
  const { className, classNameBody, ...tooltipProps } = props
  return (
    <Tooltip
      {...tooltipProps}
      className={cns(s.wrap, className)}
      classNameBody={cns(s.body, classNameBody)}
    >
      <QuestionMarkSVG className={s.icon} />
    </Tooltip>
  )
}
