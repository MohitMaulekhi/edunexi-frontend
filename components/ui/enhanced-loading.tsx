import React from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface EnhancedLoadingProps {
  variant?: 'spinner' | 'dots' | 'pulse' | 'wave' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  color?: 'blue' | 'purple' | 'green' | 'orange' | 'white'
  className?: string
  text?: string
}

export const EnhancedLoading: React.FC<EnhancedLoadingProps> = ({
  variant = 'spinner',
  size = 'md',
  color = 'blue',
  className,
  text
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-4 w-4'
      case 'lg':
        return 'h-8 w-8'
      default:
        return 'h-6 w-6'
    }
  }

  const getColorClasses = () => {
    switch (color) {
      case 'purple':
        return 'text-purple-400'
      case 'green':
        return 'text-green-400'
      case 'orange':
        return 'text-orange-400'
      case 'white':
        return 'text-white'
      default:
        return 'text-blue-400'
    }
  }

  const renderSpinner = () => (
    <Loader2 className={cn(getSizeClasses(), getColorClasses(), 'animate-spin')} />
  )

  const renderDots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            'rounded-full animate-pulse',
            size === 'sm' ? 'h-2 w-2' : size === 'lg' ? 'h-4 w-4' : 'h-3 w-3',
            color === 'purple' ? 'bg-purple-400' :
            color === 'green' ? 'bg-green-400' :
            color === 'orange' ? 'bg-orange-400' :
            color === 'white' ? 'bg-white' :
            'bg-blue-400'
          )}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
  )

  const renderPulse = () => (
    <div
      className={cn(
        'rounded-full animate-ping',
        size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-8 w-8' : 'h-6 w-6',
        color === 'purple' ? 'bg-purple-400' :
        color === 'green' ? 'bg-green-400' :
        color === 'orange' ? 'bg-orange-400' :
        color === 'white' ? 'bg-white' :
        'bg-blue-400'
      )}
    />
  )

  const renderWave = () => (
    <div className="flex space-x-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={cn(
            'animate-bounce',
            size === 'sm' ? 'h-3 w-1' : size === 'lg' ? 'h-6 w-2' : 'h-4 w-1.5',
            color === 'purple' ? 'bg-purple-400' :
            color === 'green' ? 'bg-green-400' :
            color === 'orange' ? 'bg-orange-400' :
            color === 'white' ? 'bg-white' :
            'bg-blue-400'
          )}
          style={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: '0.8s'
          }}
        />
      ))}
    </div>
  )

  const renderGradient = () => (
    <div
      className={cn(
        'rounded-full animate-spin',
        getSizeClasses(),
        'bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500',
        'relative before:absolute before:inset-1 before:bg-black before:rounded-full'
      )}
    />
  )

  const renderLoading = () => {
    switch (variant) {
      case 'dots':
        return renderDots()
      case 'pulse':
        return renderPulse()
      case 'wave':
        return renderWave()
      case 'gradient':
        return renderGradient()
      default:
        return renderSpinner()
    }
  }

  return (
    <div className={cn('flex flex-col items-center justify-center space-y-2', className)}>
      {renderLoading()}
      {text && (
        <p className={cn(
          'text-sm animate-pulse',
          getColorClasses()
        )}>
          {text}
        </p>
      )}
    </div>
  )
}

export default EnhancedLoading