import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react'

interface InteractiveFeedbackProps {
  children: React.ReactNode
  onAction?: () => Promise<void> | void
  successMessage?: string
  errorMessage?: string
  loadingMessage?: string
  showFeedback?: boolean
  feedbackDuration?: number
  className?: string
}

type FeedbackState = 'idle' | 'loading' | 'success' | 'error'

export const InteractiveFeedback: React.FC<InteractiveFeedbackProps> = ({
  children,
  onAction,
  successMessage = 'Action completed successfully',
  errorMessage = 'An error occurred',
  loadingMessage = 'Processing...',
  showFeedback = true,
  feedbackDuration = 3000,
  className
}) => {
  const [state, setState] = useState<FeedbackState>('idle')
  const [customMessage, setCustomMessage] = useState<string>('')

  const handleAction = async () => {
    if (!onAction) return

    try {
      setState('loading')
      await onAction()
      setState('success')
      setCustomMessage(successMessage)
      
      if (showFeedback) {
        setTimeout(() => {
          setState('idle')
          setCustomMessage('')
        }, feedbackDuration)
      }
    } catch (error) {
      setState('error')
      const message = error instanceof Error ? error.message : errorMessage
      setCustomMessage(message)
      
      if (showFeedback) {
        setTimeout(() => {
          setState('idle')
          setCustomMessage('')
        }, feedbackDuration)
      }
    }
  }

  const getFeedbackIcon = () => {
    switch (state) {
      case 'loading':
        return <div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getFeedbackColor = () => {
    switch (state) {
      case 'loading':
        return 'text-blue-500 bg-blue-500/10 border-blue-500/20'
      case 'success':
        return 'text-green-500 bg-green-500/10 border-green-500/20'
      case 'error':
        return 'text-red-500 bg-red-500/10 border-red-500/20'
      default:
        return ''
    }
  }

  return (
    <div className={cn("relative", className)}>
      <div onClick={handleAction} className="cursor-pointer">
        {children}
      </div>
      
      {showFeedback && state !== 'idle' && (
        <div className={cn(
          "absolute top-full left-0 right-0 mt-2 p-3 rounded-lg border backdrop-blur-md",
          "flex items-center gap-2 text-sm font-medium transition-all duration-300",
          "animate-fade-in-up z-10",
          getFeedbackColor()
        )}>
          {getFeedbackIcon()}
          <span>{customMessage || (state === 'loading' ? loadingMessage : '')}</span>
        </div>
      )}
    </div>
  )
}

export default InteractiveFeedback