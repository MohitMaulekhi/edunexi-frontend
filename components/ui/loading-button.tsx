import React from 'react'
import { Button, ButtonProps } from './button'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean
  loadingText?: string
  icon?: React.ReactNode
}

export const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ loading = false, loadingText, icon, children, className, disabled, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          loading && "cursor-not-allowed",
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        <div className={cn(
          "flex items-center gap-2 transition-opacity duration-200",
          loading && "opacity-0"
        )}>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {children}
        </div>
        
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              {loadingText && <span>{loadingText}</span>}
            </div>
          </div>
        )}
      </Button>
    )
  }
)

LoadingButton.displayName = "LoadingButton"

export default LoadingButton