import { createRoute } from 'modules/router/utils/createRoute'

function RouteLeaderboard() {
  return <p>text</p>
}

export const routeLeaderboard = createRoute({
  component: RouteLeaderboard,
  withBackButton: false,
})
