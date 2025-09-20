"use client"
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface PageTransitionProps {
  children: React.ReactNode
  className?: string
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className
}) => {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)

  useEffect(() => {
    setIsTransitioning(true)
    
    const timer = setTimeout(() => {
      setDisplayChildren(children)
      setIsTransitioning(false)
    }, 150)

    return () => clearTimeout(timer)
  }, [pathname, children])

  return (
    <div
      className={cn(
        "transition-all duration-300 ease-out",
        isTransitioning 
          ? "opacity-0 translate-y-2 scale-[0.98]" 
          : "opacity-100 translate-y-0 scale-100",
        className
      )}
    >
      {displayChildren}
    </div>
  )
}

export default PageTransition