import cns from 'classnames'
import { useFormContext } from 'react-hook-form'
import { LockedValue, LockedValueGenericProps } from 'shared/ui/LockedValue'

import s from './FormLockedValue.module.scss'

type Props = LockedValueGenericProps & { name: string }

export function FormLockedValue({ name, ...rest }: Props) {
  const { watch } = useFormContext()
  const value = watch(name)

  return <LockedValue {...rest} value={value} />
}

type ListProps = {
  className?: string
  children?: React.ReactNode
}

export function FormLockedValuesList({ className, children }: ListProps) {
  return <div className={cns(s.list, className)}>{children}</div>
}
