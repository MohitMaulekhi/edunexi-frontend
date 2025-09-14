// University functions using axios
import axios from 'axios'
import type { StudentRegistrationData, StudentRegistrationResponse } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

// Register a new student (University Admin only)
export async function registerStudent(
  token: string, 
  studentData: StudentRegistrationData
): Promise<StudentRegistrationResponse> {
  try {
    const response = await axios.post(`${API_URL}/api/students/create-with-user`, studentData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    return {
      success: true,
      student: response.data,
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error?.message || 
             error.response?.data?.message || 
             'Failed to register student',
    }
  }
}


