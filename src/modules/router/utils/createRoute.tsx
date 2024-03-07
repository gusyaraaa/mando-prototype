import type { RouteMeta, RouteObjectWithMeta } from '../types'

type Args = RouteMeta & {
  component: React.ComponentType
  checkConnect?: boolean
}

export function createRoute({
  component,
  checkConnect,
  ...routeMeta
}: Args): RouteObjectWithMeta {
  const Component = component
  return {
    element: <Component />,
    routeMeta,
  }
}
