import { useCallback, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export function useFormLock() {
  const location = useLocation()
  const navigate = useNavigate()

  const isLocked = location.hash === '#confirm'

  const lockForm = useCallback(() => {
    navigate(location.pathname + '#confirm')
  }, [location.pathname, navigate])

  const unlockForm = useCallback(() => {
    navigate(location.pathname)
  }, [location.pathname, navigate])

  useEffect(() => {
    if (isLocked) unlockForm()
  }, [])

  return {
    isLocked,
    lockForm,
    unlockForm,
  }
}
