export const login = '/login'
export const registration = '/registration'

export const leaderboard = '/leaderboard'
export const chat = (id?: string) => `/chat${id ? `?id=${id}` : ''}`
export const proveOwnership = '/prove-ownership'
export const rewards = '/rewards'
export const gifts = '/gifts'
export const bounty = (id?: string, confirm = false) =>
  `/bounty/${confirm ? 'confirm/' : ''}${id || ''}`
