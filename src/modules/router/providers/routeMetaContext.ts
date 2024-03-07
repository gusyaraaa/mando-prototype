import { createContext } from 'react'
import type { RouteMeta } from '../types'

export const routeMetaContext = createContext<RouteMeta>({})
