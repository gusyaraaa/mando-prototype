import { Outlet } from 'react-router-dom'

import { AppLayout } from 'shared/ui/layout/AppLayout'
import { AuthLayout } from 'shared/ui/layout/AuthLayout'
import { AppRedirect } from 'shared/utils/AppRedirect'
import type { RouteObjectWithMeta } from './types'

import { routeLogin } from 'routes/RouteLogin'
import { routeRegistration } from 'routes/RouteRegistration'
import { routeLeaderboard } from 'routes/RouteLeadeboard'
import { routeProveOwnership } from 'routes/RouteProveOwnership'
import { routeBounty, routeBountyConfirm } from 'routes/RouteBounty'
import { routeGifts } from 'routes/RouteGifts'
import { routeRewards } from 'routes/RouteRewards'
import { routeChat } from 'routes/RouteChat'

import * as links from './links'

export const routes: RouteObjectWithMeta[] = [
  {
    path: '/',
    index: true,
    element: <AppRedirect />,
  },
  {
    element: <Outlet />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: links.login,
            ...routeLogin,
          },
          {
            path: links.registration,
            ...routeRegistration,
          },
        ],
      },
      {
        element: <AppLayout />,
        children: [
          {
            path: links.leaderboard,
            ...routeLeaderboard,
          },
          {
            path: links.proveOwnership,
            ...routeProveOwnership,
          },
          {
            path: links.bounty(':id'),
            ...routeBounty,
          },
          {
            path: links.bounty(':id', true),
            ...routeBountyConfirm,
          },
          {
            path: links.gifts,
            ...routeGifts,
          },
          {
            path: links.rewards,
            ...routeRewards,
          },
          {
            path: links.chat(),
            ...routeChat,
          },
        ],
      },
    ],
  },
]
