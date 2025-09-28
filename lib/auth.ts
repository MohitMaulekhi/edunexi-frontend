// Authentication utilities using axios
import axios from 'axios'
import type { User, LoginResponse } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

// Authentication functions using axios
export async function loginUser(credentials: { email: string; password: string }): Promise<LoginResponse> {
  try {
    const response = await axios.post(`${API_URL}/api/auth/local`, {
      identifier: credentials.email,
      password: credentials.password,
    })

    return {
      success: true,
      user: response.data.user,
      token: response.data.jwt,
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || 'Login failed',
    }
  }
}


export async function getUserProfile(token: string): Promise<User | null> {
  try {
    const response = await axios.get(`${API_URL}/api/users/me?populate[role]=*&populate[university]=*&populate[student][populate][university]=*`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const userData = response.data

    // For students, ensure university is available from student profile if not directly assigned
    if (userData.role?.type === 'student' || userData.role?.name === 'Student') {
      if (!userData.university && userData.student?.university) {
        userData.university = userData.student.university
      }
    }

    return userData
  } catch (error) {
    console.error('Failed to get user profile:', error)
    return null
  }
}

export async function updateUserProfile(token: string, userData: Partial<User>): Promise<User | null> {
  try {
    const response = await axios.put(`${API_URL}/api/users/me`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (error) {
    return null
  }
}
