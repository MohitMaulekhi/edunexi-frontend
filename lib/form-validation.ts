/**
 * Form validation utilities for consistent error and success state handling
 */

export interface ValidationResult {
  isValid: boolean
  error?: string
  success?: string
}

export interface FormFieldProps {
  value: string | number | undefined
  error?: string
  success?: string
  required?: boolean
}

/**
 * Get validation classes for form inputs
 */
export function getValidationClasses(field: FormFieldProps): string {
  const classes: string[] = []
  
  if (field.error) {
    classes.push('aria-invalid:border-red-500', 'aria-invalid:ring-red-500/50', 'aria-invalid:shadow-glow-red')
  } else if (field.success || (field.value && field.required)) {
    classes.push('data-[valid=true]:border-green-500', 'data-[valid=true]:ring-green-500/30')
  }
  
  return classes.join(' ')
}

/**
 * Get validation attributes for form inputs
 */
export function getValidationAttributes(field: FormFieldProps): Record<string, any> {
  const attributes: Record<string, any> = {}
  
  if (field.error) {
    attributes['aria-invalid'] = true
    attributes['aria-describedby'] = `${field.error}-error`
  } else if (field.success || (field.value && field.required)) {
    attributes['data-valid'] = true
  }
  
  if (field.required) {
    attributes['required'] = true
    attributes['aria-required'] = true
  }
  
  return attributes
}

/**
 * Common validation functions
 */
export const validators = {
  email: (value: string): ValidationResult => {
    if (!value) return { isValid: false, error: 'Email is required' }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return { isValid: false, error: 'Please enter a valid email address' }
    }
    return { isValid: true, success: 'Valid email address' }
  },

  password: (value: string, minLength = 6): ValidationResult => {
    if (!value) return { isValid: false, error: 'Password is required' }
    if (value.length < minLength) {
      return { isValid: false, error: `Password must be at least ${minLength} characters long` }
    }
    return { isValid: true, success: 'Password meets requirements' }
  },

  required: (value: string | number | undefined, fieldName = 'This field'): ValidationResult => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return { isValid: false, error: `${fieldName} is required` }
    }
    return { isValid: true }
  },

  phoneNumber: (value: string): ValidationResult => {
    if (!value) return { isValid: true } // Optional field
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
      return { isValid: false, error: 'Please enter a valid phone number' }
    }
    return { isValid: true, success: 'Valid phone number' }
  },

  cgpa: (value: number | undefined): ValidationResult => {
    if (value === undefined) return { isValid: true } // Optional field
    if (value < 0 || value > 4.0) {
      return { isValid: false, error: 'CGPA must be between 0.0 and 4.0' }
    }
    return { isValid: true, success: 'Valid CGPA' }
  },

  semester: (value: number | undefined): ValidationResult => {
    if (value === undefined) return { isValid: true } // Optional field
    if (value < 1 || value > 8) {
      return { isValid: false, error: 'Semester must be between 1 and 8' }
    }
    return { isValid: true, success: 'Valid semester' }
  }
}

/**
 * Validate an entire form object
 */
export function validateForm<T extends Record<string, any>>(
  formData: T,
  validationRules: Record<keyof T, (value: any) => ValidationResult>
): { isValid: boolean; errors: Record<keyof T, string>; successes: Record<keyof T, string> } {
  const errors: Record<keyof T, string> = {} as Record<keyof T, string>
  const successes: Record<keyof T, string> = {} as Record<keyof T, string>
  let isValid = true

  for (const [field, validator] of Object.entries(validationRules)) {
    const result = validator(formData[field])
    if (!result.isValid && result.error) {
      errors[field as keyof T] = result.error
      isValid = false
    } else if (result.success) {
      successes[field as keyof T] = result.success
    }
  }

  return { isValid, errors, successes }
}