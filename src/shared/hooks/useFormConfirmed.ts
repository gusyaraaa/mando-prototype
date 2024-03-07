import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export function useFormConfirmed<T>() {
  const location = useLocation()
  const navigate = useNavigate()
  const [successData, setSuccessData] = useState<T | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [txHash, setTxHash] = useState<string | null>(null)

  const submitFormValues = (formValues: T) => {
    setSuccessData(formValues)
    setIsSubmitted(true)
  }

  const confirmForm = (hash: string) => {
    setTxHash(hash)
    navigate({ hash: 'confirmed' })
  }

  const resetSubmission = () => {
    setIsSubmitted(false)
  }

  return {
    pathname: location.pathname,
    successData,
    txHash,
    isSubmitted,
    submitFormValues,
    confirmForm,
    resetSubmission,
  }
}
