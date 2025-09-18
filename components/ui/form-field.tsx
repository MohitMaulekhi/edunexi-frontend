import * as React from 'react'
import { cn } from '@/lib/utils'
import { Label } from './label'
import { Input } from './input'
import { Textarea } from './textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import { Alert, AlertDescription } from './alert'
import { CheckCircle, AlertCircle, Info } from 'lucide-react'

interface BaseFormFieldProps {
  label: string
  name: string
  error?: string
  success?: string
  required?: boolean
  disabled?: boolean
  className?: string
  description?: string
}

interface InputFormFieldProps extends BaseFormFieldProps {
  type: 'input'
  inputType?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'date' | 'file'
  placeholder?: string
  value: string | number
  onChange: (value: string) => void
  min?: number
  max?: number
  step?: number
  accept?: string
  multiple?: boolean
}

interface TextareaFormFieldProps extends BaseFormFieldProps {
  type: 'textarea'
  placeholder?: string
  value: string
  onChange: (value: string) => void
  rows?: number
}

interface SelectFormFieldProps extends BaseFormFieldProps {
  type: 'select'
  placeholder?: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
}

type FormFieldProps = InputFormFieldProps | TextareaFormFieldProps | SelectFormFieldProps

export function FormField(props: FormFieldProps) {
  const {
    label,
    name,
    error,
    success,
    required = false,
    disabled = false,
    className,
    description,
    type,
    ...fieldProps
  } = props

  const fieldId = `field-${name}`
  const errorId = `${fieldId}-error`
  const successId = `${fieldId}-success`
  const descriptionId = `${fieldId}-description`

  const getValidationAttributes = () => {
    const attributes: Record<string, any> = {
      id: fieldId,
      'aria-describedby': [
        description && descriptionId,
        error && errorId,
        success && successId,
      ].filter(Boolean).join(' ') || undefined,
    }

    if (error) {
      attributes['aria-invalid'] = true
    } else if (success || (fieldProps.value && required)) {
      attributes['data-valid'] = true
    }

    if (required) {
      attributes['required'] = true
      attributes['aria-required'] = true
    }

    return attributes
  }

  const renderField = () => {
    const validationAttributes = getValidationAttributes()

    switch (type) {
      case 'input':
        const inputProps = fieldProps as Omit<InputFormFieldProps, keyof BaseFormFieldProps | 'type'>
        return (
          <Input
            type={inputProps.inputType || 'text'}
            placeholder={inputProps.placeholder}
            value={inputProps.value}
            onChange={(e) => inputProps.onChange(e.target.value)}
            disabled={disabled}
            min={inputProps.min}
            max={inputProps.max}
            step={inputProps.step}
            accept={inputProps.accept}
            multiple={inputProps.multiple}
            {...validationAttributes}
          />
        )

      case 'textarea':
        const textareaProps = fieldProps as Omit<TextareaFormFieldProps, keyof BaseFormFieldProps | 'type'>
        return (
          <Textarea
            placeholder={textareaProps.placeholder}
            value={textareaProps.value}
            onChange={(e) => textareaProps.onChange(e.target.value)}
            disabled={disabled}
            rows={textareaProps.rows}
            {...validationAttributes}
          />
        )

      case 'select':
        const selectProps = fieldProps as Omit<SelectFormFieldProps, keyof BaseFormFieldProps | 'type'>
        return (
          <Select
            value={selectProps.value}
            onValueChange={selectProps.onChange}
            disabled={disabled}
            {...validationAttributes}
          >
            <SelectTrigger>
              <SelectValue placeholder={selectProps.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {selectProps.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      default:
        return null
    }
  }

  return (
    <div className={cn('space-y-2', className)}>
      <Label
        htmlFor={fieldId}
        data-required={required}
        className={cn(
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </Label>

      {description && (
        <p id={descriptionId} className="text-xs text-gray-400 -mt-1">
          {description}
        </p>
      )}

      {renderField()}

      {/* Error State */}
      {error && (
        <Alert variant="destructive" id={errorId}>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Success State */}
      {success && !error && (
        <Alert variant="success" id={successId}>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

export default FormField