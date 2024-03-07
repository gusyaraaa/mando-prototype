import { Text } from 'shared/ui/common/Text'

import s from './PageError.module.scss'

type Props = {
  children?: React.ReactNode
}

export const PageError = ({ children }: Props) => {
  return (
    <div className={s.wrap}>
      <Text size={18} weight={500}>
        {children}
      </Text>
    </div>
  )
}
