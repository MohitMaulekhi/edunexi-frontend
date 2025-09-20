import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styling with dark theme consistency
        'flex h-10 w-full min-w-0 rounded-xl border px-4 py-3 text-sm font-poppins',
        'bg-gray-800/70 backdrop-blur-md border-gray-700 text-white shadow-lg',
        'placeholder:text-gray-400 selection:bg-blue-500/30 selection:text-white',
        // Focus states with enhanced visibility
        'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:shadow-glow',
        'transition-all duration-200 ease-in-out',
        // File input styling
        'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-300',
        'file:mr-4 file:py-1 file:px-2 file:rounded-lg file:bg-gray-700/50',
        // Disabled state
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-900/50',
        // Error state
        'aria-invalid:border-red-500 aria-invalid:ring-red-500/50 aria-invalid:shadow-glow-red',
        // Success state (when valid)
        'data-[valid=true]:border-green-500 data-[valid=true]:ring-green-500/30',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
