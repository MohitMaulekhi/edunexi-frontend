import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium font-poppins transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 text-white shadow-lg hover:from-blue-700 hover:via-indigo-600 hover:to-purple-600 hover:shadow-xl hover:scale-105 active:scale-100 transform',
        destructive:
          'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg hover:from-red-700 hover:to-red-800 hover:shadow-xl hover:scale-105 active:scale-100 transform',
        outline:
          'border border-indigo-500 bg-black/70 backdrop-blur-md text-indigo-400 shadow-lg hover:bg-indigo-500 hover:text-white hover:shadow-xl hover:scale-105 active:scale-100 transform',
        secondary:
          'bg-gray-700/70 backdrop-blur-md text-gray-200 shadow-lg hover:bg-gray-600/70 hover:shadow-xl hover:scale-105 active:scale-100 transform',
        ghost:
          'text-gray-300 hover:bg-white/10 hover:text-white hover:backdrop-blur-md hover:scale-105 active:scale-100 transform',
        link: 'text-indigo-400 underline-offset-4 hover:underline hover:text-indigo-300',
      },
      size: {
        default: 'h-10 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-lg gap-1.5 px-3 text-xs has-[>svg]:px-2.5',
        lg: 'h-12 rounded-xl px-6 text-base has-[>svg]:px-5',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

interface ButtonProps extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  loadingText?: string
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  loadingText,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingText || 'Loading...'}
        </>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Button, buttonVariants, type ButtonProps }
