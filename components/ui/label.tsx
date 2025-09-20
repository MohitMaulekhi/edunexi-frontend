'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'

import { cn } from '@/lib/utils'

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        // Enhanced label styling for dark theme
        'flex items-center gap-2 text-sm font-semibold font-poppins leading-none select-none',
        'text-gray-300 mb-2',
        // Disabled states
        'group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
        'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        // Required indicator support
        'data-[required=true]:after:content-["*"] data-[required=true]:after:text-red-400 data-[required=true]:after:ml-1',
        className,
      )}
      {...props}
    />
  )
}

export { Label }
