import React, { useState } from 'react'
import { cn } from '@/lib/utils'

interface EnhancedInteractiveFeedbackProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  feedbackType?: 'ripple' | 'scale' | 'glow' | 'pulse' | 'bounce' | 'none'
  disabled?: boolean
  hapticFeedback?: boolean
}

export const EnhancedInteractiveFeedback: React.FC<EnhancedInteractiveFeedbackProps> = ({
  children,
  onClick,
  className,
  feedbackType = 'ripple',
  disabled = false,
  hapticFeedback = false
}) => {
  const [isPressed, setIsPressed] = useState(false)

  const triggerHapticFeedback = () => {
    if (hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(10) // Short vibration
    }
  }

  const handleMouseDown = () => {
    if (disabled) return
    setIsPressed(true)
    triggerHapticFeedback()
  }

  const handleMouseUp = () => {
    setIsPressed(false)
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !onClick) return

    if (feedbackType === 'ripple') {
      const rect = e.currentTarget.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2
      
      const ripple = document.createElement('span')
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        pointer-events: none;
        z-index: 10;
      `
      
      e.currentTarget.appendChild(ripple)
      
      setTimeout(() => {
        ripple.remove()
      }, 600)
    }

    onClick()
  }

  const getFeedbackClasses = () => {
    if (disabled) return 'opacity-50 cursor-not-allowed'
    
    const baseClasses = 'cursor-pointer select-none'
    
    switch (feedbackType) {
      case 'scale':
        return `${baseClasses} transition-all duration-200 active:scale-95 hover:scale-105 ${isPressed ? 'scale-95' : ''}`
      case 'glow':
        return `${baseClasses} transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:brightness-110`
      case 'pulse':
        return `${baseClasses} transition-all duration-200 hover:animate-pulse active:animate-none`
      case 'bounce':
        return `${baseClasses} transition-all duration-200 hover:animate-bounce active:animate-none ${isPressed ? 'animate-bounce' : ''}`
      case 'ripple':
        return `${baseClasses} relative overflow-hidden transition-all duration-200 hover:bg-white/5 active:bg-white/10`
      default:
        return baseClasses
    }
  }

  return (
    <div
      className={cn(getFeedbackClasses(), className)}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {children}
    </div>
  )
}

export default EnhancedInteractiveFeedback