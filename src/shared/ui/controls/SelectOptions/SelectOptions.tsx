import React from 'react'
import cns from 'classnames'
import { Text } from 'shared/ui/common/Text'
import s from './SelectOptions.module.scss'

type OptionsProps = {
  children?: React.ReactNode
  concat?: 'top' | 'middle' | 'bottom'
  optionsRef?: React.Ref<HTMLDivElement>
  isError?: boolean
}

export function SelectOptions({
  children,
  concat,
  optionsRef,
  isError,
}: OptionsProps) {
  return (
    <div
      className={cns(s.optionsWrapper, {
        [s.isConcatBot]: concat === 'bottom',
        [s.isError]: isError,
      })}
    >
      <div className={s.options} ref={optionsRef}>
        {children}
      </div>
    </div>
  )
}

type ItemProps = {
  hint?: React.ReactNode
  icon?: React.ReactNode
  label?: React.ReactNode
  isDisabled?: boolean
  isActive?: boolean
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>
  className?: string
  testId?: string
}

export function SelectOptionItem({
  hint,
  icon,
  label,
  isActive,
  onMouseDown,
  className,
  isDisabled,
  testId,
}: ItemProps) {
  return (
    <div
      className={cns(s.item, className, {
        [s.isActive]: isActive,
        [s.isDisabled]: isDisabled,
      })}
      onMouseDown={!isDisabled ? onMouseDown : undefined}
      data-test-id={testId}
    >
      {typeof label === 'string' ? (
        <Text size={16} weight={400} children={label} />
      ) : (
        label
      )}
      {typeof hint === 'string' ? (
        <Text size={12} weight={400} children={hint} />
      ) : (
        hint
      )}
      {icon && <div className={s.icon}>{icon}</div>}
    </div>
  )
}

type NotifyProps = {
  children?: React.ReactNode
  className?: string
}

export function SelectOptionsNotify({ children, className }: NotifyProps) {
  return <div className={cns(s.optionsNotify, className)}>{children}</div>
}
