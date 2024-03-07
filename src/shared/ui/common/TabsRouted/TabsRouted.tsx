import { Children } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Tab, Tabs } from '../Tabs'

type TabProps = React.ComponentProps<typeof Tab> & {
  link: string
}

export const TabRouted = (p: TabProps) => <>{p.children ?? null}</>

type Props = {
  children?: React.ReactNode
}

export function TabsRouted({ children }: Props) {
  const location = useLocation()
  const navigate = useNavigate()

  const childrenArray = Children.toArray(
    children,
  ) as React.ReactElement<TabProps>[]

  const currentTab = childrenArray.findIndex(
    tab => tab.props.link === location.pathname,
  )

  return (
    <Tabs
      currentTab={currentTab}
      onChange={idx => navigate(childrenArray[idx].props.link)}
    >
      {children}
    </Tabs>
  )
}
