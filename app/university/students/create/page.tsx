

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import ProtectedRoute from "@/components/ProtectedRoute"
import { registerStudent } from "@/lib/university"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Loader2, UserPlus } from "lucide-react"
import Link from "next/link"
import type { StudentRegistrationData } from "@/types"

function CreateStudentContent() {
  const { token } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState<StudentRegistrationData>({
    email: "",
    password: "",
    department: "",
    year: undefined,
    semester: undefined,
    phoneNumber: "",
    CGPA: undefined,
    enrollmentDate: "",
    expectedGraduation: "",
    address: "",
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}


    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    }

    if (!formData.password || formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long"
    }

    // Optional fields validation
    if (formData.CGPA !== undefined && (formData.CGPA < 0 || formData.CGPA > 4.0)) {
      errors.CGPA = "CGPA must be between 0.0 and 4.0"
    }

    if (formData.semester !== undefined && (formData.semester < 1 || formData.semester > 8)) {
      errors.semester = "Semester must be between 1 and 8"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (field: keyof StudentRegistrationData, value: string | number | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ""
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    if (!token) {
      setError("Authentication token not found. Please login again.")
      return
    }

    setIsSubmitting(true)
    setError("")
    setSuccess("")

    try {
      const result = await registerStudent(token, formData)
      
      if (result.success) {
        setSuccess("Student registered successfully!")
        
        // Reset form
        setFormData({
          email: "",
          password: "",
          department: "",
          year: undefined,
          semester: undefined,
          phoneNumber: "",
          CGPA: undefined,
          enrollmentDate: "",
          expectedGraduation: "",
          address: "",
        })
        
        // Redirect to students list after a brief delay
        setTimeout(() => {
          router.push("/university/students")
        }, 2000)
        
      } else {
        setError(result.error || "Failed to register student")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#000000] font-poppins">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Page Header - Integrated into content */}
        <div className="mb-8">
          <Link href="/university/students" className="inline-flex items-center text-sm text-gray-400 hover:text-blue-400 mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Students
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#E5E5E5] to-[#60A5FA] bg-clip-text text-transparent mb-2">
                Register New Student
              </h1>
              <p className="text-gray-300 text-lg">Create a new student account</p>
            </div>
            <UserPlus className="h-10 w-10 text-blue-500" />
          </div>
        </div>

        {/* Success/Error Messages */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert variant="success" className="mb-6">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {/* Registration Form */}
        <div className="bg-black/70 backdrop-blur-md border border-gray-700 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Student Information</h2>
            <p className="text-gray-300">
              Fill in the student details below. Required fields are marked with an asterisk (*).
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="student@university.edu"
                    disabled={isSubmitting}
                    aria-invalid={formErrors.email ? true : undefined}
                  />
                  {formErrors.email && (
                    <Alert variant="destructive" className="mt-1">
                      <AlertDescription>{formErrors.email}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  
                  <Label htmlFor="password">
                    Password *
                  </Label>
                  <Input
                    id="password"
                    type="text"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="Enter password"
                    disabled={isSubmitting}
                    aria-invalid={formErrors.password ? true : undefined}
                  />
                  {formErrors.password && (
                    <Alert variant="destructive" className="mt-1">
                      <AlertDescription>{formErrors.password}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Academic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Academic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">
                      Department
                    </Label>
                    <Input
                      id="department"
                      value={formData.department}
                      onChange={(e) => handleInputChange("department", e.target.value)}
                      placeholder="Computer Science"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year">
                      Academic Year
                    </Label>
                    <Select 
                      value={formData.year} 
                      onValueChange={(value: "Freshman" | "Sophomore" | "Junior" | "Senior") => 
                        handleInputChange("year", value)
                      }
                      disabled={isSubmitting}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Freshman">Freshman</SelectItem>
                        <SelectItem value="Sophomore">Sophomore</SelectItem>
                        <SelectItem value="Junior">Junior</SelectItem>
                        <SelectItem value="Senior">Senior</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="semester">
                      Current Semester
                    </Label>
                    <Select 
                      value={formData.semester?.toString()} 
                      onValueChange={(value) => handleInputChange("semester", parseInt(value))}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                          <SelectItem key={sem} value={sem.toString()}>
                            Semester {sem}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formErrors.semester && (
                      <Alert variant="destructive" className="mt-1">
                        <AlertDescription>{formErrors.semester}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cgpa">
                      CGPA
                    </Label>
                    <Input
                      id="cgpa"
                      type="number"
                      step="0.01"
                      min="0"
                      max="4.0"
                      value={formData.CGPA || ""}
                      onChange={(e) => handleInputChange("CGPA", e.target.value ? parseFloat(e.target.value) : undefined)}
                      placeholder="3.75"
                      disabled={isSubmitting}
                      aria-invalid={formErrors.CGPA ? true : undefined}
                    />
                    {formErrors.CGPA && (
                      <Alert variant="destructive" className="mt-1">
                        <AlertDescription>{formErrors.CGPA}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="enrollmentDate">
                      Enrollment Date
                    </Label>
                    <Input
                      id="enrollmentDate"
                      type="date"
                      value={formData.enrollmentDate}
                      onChange={(e) => handleInputChange("enrollmentDate", e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expectedGraduation">
                      Expected Graduation Date
                    </Label>
                    <Input
                      id="expectedGraduation"
                      type="date"
                      value={formData.expectedGraduation}
                      onChange={(e) => handleInputChange("expectedGraduation", e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Additional Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="address">
                    Address
                  </Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Student's address"
                    rows={3}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Link href="/university/students">
                  <Button variant="outline" disabled={isSubmitting}>
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Registering Student...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Register Student
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const CreateStudentPage = () => {
  return (
    <ProtectedRoute allowedRoles={["university_admin"]}>
      <CreateStudentContent />
    </ProtectedRoute>
  )
}

export default CreateStudentPage
