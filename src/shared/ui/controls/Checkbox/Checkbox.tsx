import { forwardRef, useCallback, useState } from 'react'
import cns from 'classnames'

import Icon from 'assets/check.svg'

import s from './Checkbox.module.scss'

type Props = {
  name?: string
  label?: React.ReactNode
  value?: string

  disabled?: boolean
  checked?: boolean

  className?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export function CheckboxRaw(props: Props, ref: React.Ref<HTMLInputElement>) {
  const {
    name,
    label,
    value,
    disabled: isDisabled,
    checked: isCheckedProp,
    className,
    onChange,
  } = props

  const [isCheckedState, setValueState] = useState(false)
  const isControlled = isCheckedProp !== undefined
  const isChecked = isControlled ? isCheckedProp : isCheckedState

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setValueState(e.target.checked)
      }
      onChange?.(e)
    },
    [onChange, isControlled],
  )

  return (
    <label
      className={cns(s.wrap, className, {
        [s.isChecked]: isChecked,
        [s.isDisabled]: isDisabled,
      })}
    >
      <input
        ref={ref}
        name={name}
        value={value}
        checked={isChecked}
        disabled={isDisabled}
        className={s.input}
        onChange={handleChange}
        type="checkbox"
      />
      <div className={s.iconWrap}>
        <Icon className={s.icon} />
      </div>
      {label}
    </label>
  )
}

export const Checkbox = forwardRef(CheckboxRaw)
