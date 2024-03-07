import { Link as LinkRouter } from 'react-router-dom'

type Props = {
  to: string
  state?: any
  className?: string
  children?: React.ReactNode
  testId?: string
  onClick?: () => void
}

export function Link({
  to,
  state,
  className,
  children,
  testId,
  onClick,
}: Props) {
  return (
    <LinkRouter
      to={to}
      state={state}
      className={className}
      children={children}
      onClick={onClick}
      data-test-id={testId}
    />
  )
}
