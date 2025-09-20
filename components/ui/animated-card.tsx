import React from 'react'
import { Card, CardProps } from './card'
import { cn } from '@/lib/utils'

interface AnimatedCardProps extends Omit<CardProps, 'className'> {
  hoverEffect?: 'lift' | 'glow' | 'scale' | 'tilt' | 'pulse' | 'none'
  animationDelay?: number
  glowColor?: 'blue' | 'purple' | 'green' | 'orange' | 'red'
  className?: string
  interactive?: boolean
}

export const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ 
    className, 
    hoverEffect = 'lift', 
    animationDelay = 0,
    glowColor = 'blue',
    interactive = true,
    children, 
    ...props 
  }, ref) => {
    const getHoverEffectClasses = () => {
      if (!interactive) return ''
      
      switch (hoverEffect) {
        case 'lift':
          return 'hover:transform hover:-translate-y-3 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/60 hover:rotate-0.5'
        case 'glow':
          return `hover:shadow-glow${glowColor !== 'blue' ? `-${glowColor}` : ''} hover:scale-[1.01] hover:-translate-y-1`
        case 'scale':
          return 'hover:scale-[1.05] hover:shadow-xl hover:-translate-y-1'
        case 'tilt':
          return 'hover:transform hover:-translate-y-2 hover:scale-[1.02] hover:rotate-1 hover:shadow-2xl'
        case 'pulse':
          return 'hover:scale-[1.02] hover:shadow-xl hover:animate-pulse'
        case 'none':
          return ''
        default:
          return 'hover:transform hover:-translate-y-3 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/60'
      }
    }

    const getGlowClasses = () => {
      if (hoverEffect !== 'glow' || !interactive) return ''
      
      switch (glowColor) {
        case 'purple':
          return 'hover:shadow-glow-purple'
        case 'green':
          return 'hover:shadow-glow-green'
        case 'orange':
          return 'hover:shadow-glow-orange'
        case 'red':
          return 'hover:shadow-glow-red'
        default:
          return 'hover:shadow-glow'
      }
    }

    const getInteractiveClasses = () => {
      if (!interactive) return ''
      return 'cursor-pointer group relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/5 before:via-white/2 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000'
    }

    return (
      <Card
        ref={ref}
        className={cn(
          "transition-all duration-300 ease-out animate-fade-in-up",
          getHoverEffectClasses(),
          getGlowClasses(),
          getInteractiveClasses(),
          interactive && "active:scale-[0.98] active:translate-y-0",
          className
        )}
        style={{
          animationDelay: `${animationDelay}ms`
        }}
        {...props}
      >
        {children}
      </Card>
    )
  }
)

AnimatedCard.displayName = "AnimatedCard"

export default AnimatedCard