import { Navigate } from 'react-router-dom'

import { login, leaderboard } from 'modules/router/links'
import { useLocalStorage } from 'shared/hooks/useLocalStorage'
import { UserData, defaultUserData } from 'types/core'

export const AppRedirect = () => {
  const [user] = useLocalStorage<UserData | undefined>(`mando-user`, undefined)

  if (user?.isAuth) {
    return <Navigate to={leaderboard} replace />
  }

  return <Navigate to={login} replace />
}
