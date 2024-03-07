import cns from 'classnames'

import s from './InputDisplay.module.scss'

type Props = {
  placeholder: string
  value: string
  icon?: React.ReactNode
  concat?: 'top' | 'middle' | 'bottom'
  className?: string
}

export function InputDisplay(props: Props) {
  const { value, icon, concat, className, placeholder } = props

  return (
    <div
      className={cns(s.wrap, className, {
        [s.isConcatTop]: concat === 'top',
        [s.isConcatMiddle]: concat === 'middle',
        [s.isConcatBottom]: concat === 'bottom',
      })}
    >
      <div className={s.box}>
        <span className={s.placeholder}>{placeholder}</span>
        {value}
        {icon && <div className={s.icon}>{icon}</div>}
      </div>
    </div>
  )
}
