import { RouteObject } from 'react-router-dom'

export type RouteMeta = {
  headerTitle?: JSX.Element | string
  layoutType?: 'default' | 'narrow'
  withBackButton?: boolean
  backButtonComponent?: React.ComponentType<any>
  withLogo?: boolean
  isMobileAvailable?: boolean
}

export type RouteObjectWithMeta = RouteObject & {
  routeMeta?: RouteMeta
}
