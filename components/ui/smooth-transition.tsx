import React from 'react'
import { cn } from '@/lib/utils'

interface SmoothTransitionProps {
  children: React.ReactNode
  show: boolean
  type?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale'
  duration?: 'fast' | 'normal' | 'slow'
  delay?: number
  className?: string
}

export const SmoothTransition: React.FC<SmoothTransitionProps> = ({
  children,
  show,
  type = 'fade',
  duration = 'normal',
  delay = 0,
  className
}) => {
  const getDurationClass = () => {
    switch (duration) {
      case 'fast':
        return 'duration-200'
      case 'slow':
        return 'duration-700'
      default:
        return 'duration-300'
    }
  }

  const getTransitionClasses = () => {
    const baseClasses = `transition-all ${getDurationClass()} ease-out`
    
    if (!show) {
      switch (type) {
        case 'slide-up':
          return `${baseClasses} opacity-0 translate-y-4`
        case 'slide-down':
          return `${baseClasses} opacity-0 -translate-y-4`
        case 'slide-left':
          return `${baseClasses} opacity-0 translate-x-4`
        case 'slide-right':
          return `${baseClasses} opacity-0 -translate-x-4`
        case 'scale':
          return `${baseClasses} opacity-0 scale-95`
        default:
          return `${baseClasses} opacity-0`
      }
    }

    return `${baseClasses} opacity-100 translate-x-0 translate-y-0 scale-100`
  }

  if (!show) {
    return null
  }

  return (
    <div
      className={cn(getTransitionClasses(), className)}
      style={{
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  )
}

export default SmoothTransition