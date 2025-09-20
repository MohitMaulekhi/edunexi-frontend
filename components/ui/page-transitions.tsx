"use client"
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface PageTransitionsProps {
  children: React.ReactNode
  className?: string
  transitionType?: 'fade' | 'slide' | 'scale' | 'blur' | 'flip'
  duration?: number
}

export const PageTransitions: React.FC<PageTransitionsProps> = ({
  children,
  className,
  transitionType = 'fade',
  duration = 300
}) => {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)

  useEffect(() => {
    setIsTransitioning(true)
    
    const timer = setTimeout(() => {
      setDisplayChildren(children)
      setIsTransitioning(false)
    }, duration / 2)

    return () => clearTimeout(timer)
  }, [pathname, children, duration])

  const getTransitionClasses = () => {
    const baseClasses = `transition-all ease-out`
    
    if (isTransitioning) {
      switch (transitionType) {
        case 'slide':
          return `${baseClasses} opacity-0 translate-x-4`
        case 'scale':
          return `${baseClasses} opacity-0 scale-95`
        case 'blur':
          return `${baseClasses} opacity-0 blur-sm`
        case 'flip':
          return `${baseClasses} opacity-0 transform rotate-y-90`
        default:
          return `${baseClasses} opacity-0`
      }
    }

    return `${baseClasses} opacity-100 translate-x-0 scale-100 blur-0 transform rotate-y-0`
  }

  return (
    <div
      className={cn(getTransitionClasses(), className)}
      style={{
        transitionDuration: `${duration}ms`
      }}
    >
      {displayChildren}
    </div>
  )
}

// Staggered animation component for lists
interface StaggeredAnimationProps {
  children: React.ReactNode[]
  delay?: number
  className?: string
  animationType?: 'fade-up' | 'fade-left' | 'fade-right' | 'scale'
}

export const StaggeredAnimation: React.FC<StaggeredAnimationProps> = ({
  children,
  delay = 100,
  className,
  animationType = 'fade-up'
}) => {
  const getAnimationClass = () => {
    switch (animationType) {
      case 'fade-left':
        return 'animate-slide-in-left'
      case 'fade-right':
        return 'animate-slide-in-right'
      case 'scale':
        return 'animate-scale-in'
      default:
        return 'animate-fade-in-up'
    }
  }

  return (
    <div className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={getAnimationClass()}
          style={{
            animationDelay: `${index * delay}ms`,
            animationFillMode: 'both'
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

// Intersection Observer based animation
interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  animationType?: 'fade-up' | 'fade-left' | 'fade-right' | 'scale' | 'float'
  threshold?: number
  rootMargin?: string
}

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  className,
  animationType = 'fade-up',
  threshold = 0.1,
  rootMargin = '0px'
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [elementRef, setElementRef] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!elementRef) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(elementRef)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(elementRef)

    return () => {
      if (elementRef) observer.unobserve(elementRef)
    }
  }, [elementRef, threshold, rootMargin])

  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0'
    
    switch (animationType) {
      case 'fade-left':
        return 'animate-slide-in-left'
      case 'fade-right':
        return 'animate-slide-in-right'
      case 'scale':
        return 'animate-scale-in'
      case 'float':
        return 'animate-float'
      default:
        return 'animate-fade-in-up'
    }
  }

  return (
    <div
      ref={setElementRef}
      className={cn(getAnimationClass(), className)}
    >
      {children}
    </div>
  )
}

export default PageTransitions