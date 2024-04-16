import * as React from 'react'
import {cn} from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({className, type, ...props}, ref) => {
  return (
    <input
      type={type}
      className={cn(
        `
          px-5 sm:px-4 py-1.5 sm:py-3 w-full duration-200 bg-white placeholder:text-custom-primary
          border-[1.5px] border-custom-primary outline-none 
        focus-visible:border-custom-gray focus-visible:placeholder:text-custom-gray
          disabled:cursor-not-allowed disabled:opacity-50
        `,
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export {Input}
