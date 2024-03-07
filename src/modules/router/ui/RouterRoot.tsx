import { useMemo } from 'react'
import { renderMatches, useLocation, matchRoutes } from 'react-router-dom'
import { routes } from 'modules/router/routerConfig'
import { routeMetaContext } from '../providers/routeMetaContext'
import type { RouteObjectWithMeta } from '../types'

export function RouterRoot() {
  const location = useLocation()
  const matches = useMemo(() => matchRoutes(routes, location), [location])
  const routeMeta = useMemo(
    () =>
      matches?.reduce(
        (meta, match) => ({
          ...meta,
          ...(match.route as RouteObjectWithMeta).routeMeta,
        }),
        {},
      ),
    [matches],
  )
  return (
    <routeMetaContext.Provider value={routeMeta || {}}>
      {renderMatches(matches)}
    </routeMetaContext.Provider>
  )
}
