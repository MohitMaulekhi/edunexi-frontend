import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // Base styling with dark theme consistency
          "flex min-h-[100px] w-full rounded-xl border px-4 py-3 text-sm font-poppins",
          "bg-gray-800/70 backdrop-blur-md border-gray-700 text-white shadow-lg",
          "placeholder:text-gray-400 selection:bg-blue-500/30 selection:text-white",
          // Focus states with enhanced visibility
          "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:shadow-glow",
          "transition-all duration-200 ease-in-out",
          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-900/50",
          // Error state
          "aria-invalid:border-red-500 aria-invalid:ring-red-500/50 aria-invalid:shadow-glow-red",
          // Success state (when valid)
          "data-[valid=true]:border-green-500 data-[valid=true]:ring-green-500/30",
          // Resize behavior
          "resize-y",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Textarea.displayName = "Textarea"

export { Textarea }
