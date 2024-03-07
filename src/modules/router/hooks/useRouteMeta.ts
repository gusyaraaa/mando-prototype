import { useContext } from 'react'
import { routeMetaContext } from '../providers/routeMetaContext'

export function useRouteMeta() {
  return useContext(routeMetaContext)
}
