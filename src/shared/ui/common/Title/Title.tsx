import cns from 'classnames'
import { useMediaBreakpoints } from 'shared/hooks/useMediaBreakpoints'
import { Text } from 'shared/ui/common/Text'
import s from './Title.module.scss'

type TextProps = React.ComponentProps<typeof Text>

type Props = {
  className?: string
  children?: React.ReactNode
} & Omit<TextProps, 'className'>

export function Title(props: Props) {
  const { className, children, ...textProps } = props
  const { isTablet } = useMediaBreakpoints()
  return (
    <Text
      {...textProps}
      size={isTablet ? 22 : 44}
      weight={600}
      className={cns(s.title, className)}
      isUppercased
    >
      {children}
    </Text>
  )
}
