import { useState, useCallback } from 'react'

interface UseLoadingOptions {
  initialLoading?: boolean
  delay?: number
}

export const useLoading = (options: UseLoadingOptions = {}) => {
  const { initialLoading = false, delay = 0 } = options
  const [loading, setLoading] = useState(initialLoading)
  const [error, setError] = useState<string | null>(null)

  const startLoading = useCallback(() => {
    setError(null)
    if (delay > 0) {
      setTimeout(() => setLoading(true), delay)
    } else {
      setLoading(true)
    }
  }, [delay])

  const stopLoading = useCallback(() => {
    setLoading(false)
  }, [])

  const setLoadingError = useCallback((errorMessage: string) => {
    setLoading(false)
    setError(errorMessage)
  }, [])

  const withLoading = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    options?: { errorMessage?: string }
  ): Promise<T | null> => {
    try {
      startLoading()
      const result = await asyncFn()
      stopLoading()
      return result
    } catch (err) {
      const errorMessage = options?.errorMessage || 
        (err instanceof Error ? err.message : 'An error occurred')
      setLoadingError(errorMessage)
      return null
    }
  }, [startLoading, stopLoading, setLoadingError])

  return {
    loading,
    error,
    startLoading,
    stopLoading,
    setLoadingError,
    withLoading,
    clearError: () => setError(null)
  }
}