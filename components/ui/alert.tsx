import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const alertVariants = cva(
  'relative w-full rounded-xl border px-4 py-3 text-sm font-poppins grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current shadow-lg backdrop-blur-md',
  {
    variants: {
      variant: {
        default: 
          'bg-gray-800/70 border-gray-700 text-gray-200 [&>svg]:text-blue-400',
        destructive:
          'bg-red-900/20 border-red-500/50 text-red-200 shadow-glow-red [&>svg]:text-red-400 *:data-[slot=alert-description]:text-red-200',
        success:
          'bg-green-900/20 border-green-500/50 text-green-200 shadow-glow-green [&>svg]:text-green-400 *:data-[slot=alert-description]:text-green-200',
        warning:
          'bg-orange-900/20 border-orange-500/50 text-orange-200 shadow-glow-orange [&>svg]:text-orange-400 *:data-[slot=alert-description]:text-orange-200',
        info:
          'bg-blue-900/20 border-blue-500/50 text-blue-200 shadow-glow [&>svg]:text-blue-400 *:data-[slot=alert-description]:text-blue-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        'col-start-2 line-clamp-1 min-h-4 font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        'col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed',
        className,
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
