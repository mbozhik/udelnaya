import * as React from 'react'
import {cn} from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({className, type, ...props}, ref) => {
  return (
    <input
      type={type}
      className={cn(
        `
          px-3.5 py-1.5 sm:py-3 rounded-md w-full duration-200 sm:text-sm
          border-[1.5px] border-custom-gray outline-none bg-white 
          focus-visible:border-custom-primary focus-visible:placeholder:text-custom-primary 
          disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-custom-gray
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
