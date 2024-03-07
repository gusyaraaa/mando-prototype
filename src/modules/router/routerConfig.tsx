import { Outlet } from 'react-router-dom'

import { AppLayout } from 'shared/ui/layout/AppLayout'
import { AppLayoutMinimal } from 'shared/ui/layout/AppLayoutMinimal'
import type { RouteObjectWithMeta } from './types'

import { routeLeaderboard } from 'routes/RouteLeadeboard'

import * as links from './links'

export const routes: RouteObjectWithMeta[] = [
  {
    element: <Outlet />,
    children: [
      {
        element: <AppLayoutMinimal />,
        children: [
          {
            path: links.leaderboard,
            ...routeLeaderboard,
          },
        ],
      },
    ],
  },
]
