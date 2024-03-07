import dayjs from 'dayjs'
import { useMemo } from 'react'

import s from './FormattedDate.module.scss'

type Props = {
  date: number
  format: string
}

export function FormattedDate({ date, format }: Props) {
  const [formattedDay, formattedTime] = useMemo(
    () => dayjs.unix(date).format(format).split(' '),
    [date, format],
  )

  return (
    <span>
      {formattedDay} <span className={s.time}>{formattedTime}</span>
    </span>
  )
}
