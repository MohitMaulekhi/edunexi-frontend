import { useAuth } from '@/contexts/AuthContext'
import { strapiApi } from '@/lib/api'
import { useCallback } from 'react'

export function useApi() {
  const { user, token, logout } = useAuth()

  const apiCall = useCallback(async <T>(
    apiFunction: () => Promise<T>,
    options?: { 
      onError?: (error: any) => void,
      onUnauthorized?: () => void 
    }
  ): Promise<T | null> => {
    try {
      if (!token) {
        throw new Error('No authentication token available')
      }
      
      return await apiFunction()
    } catch (error: any) {
      console.error('API call failed:', error)
      
      // Handle 401 errors
      if (error.response?.status === 401) {
        if (options?.onUnauthorized) {
          options.onUnauthorized()
        } else {
          logout()
        }
      }
      
      // Call custom error handler if provided
      if (options?.onError) {
        options.onError(error)
      }
      
      return null
    }
  }, [token, logout])

  // Convenience methods for common operations
  const createStudent = useCallback((studentData: any) => 
    apiCall(() => strapiApi.createStudent(studentData)), [apiCall])

  const getStudents = useCallback((params?: any) => 
    apiCall(() => strapiApi.getStudents(params)), [apiCall])

  const updateStudent = useCallback((id: number, studentData: any) => 
    apiCall(() => strapiApi.updateStudent(id, studentData)), [apiCall])

  const createAchievement = useCallback((achievementData: any) => 
    apiCall(() => strapiApi.createAchievement(achievementData)), [apiCall])

  const getAchievements = useCallback((params?: any) => 
    apiCall(() => strapiApi.getAchievements(params)), [apiCall])

  const updateAchievement = useCallback((id: number, achievementData: any) => 
    apiCall(() => strapiApi.updateAchievement(id, achievementData)), [apiCall])

  const createEvent = useCallback((eventData: any) => 
    apiCall(() => strapiApi.createEvent(eventData)), [apiCall])

  const getEvents = useCallback((params?: any) => 
    apiCall(() => strapiApi.getEvents(params)), [apiCall])

  const getNotifications = useCallback((params?: any) => 
    apiCall(() => strapiApi.getNotifications(params)), [apiCall])

  return {
    user,
    token,
    apiCall,
    createStudent,
    getStudents,
    updateStudent,
    createAchievement,
    getAchievements,
    updateAchievement,
    createEvent,
    getEvents,
    getNotifications,
  }
}
