import {isMobile} from '@bozzhik/is-mobile'
import {cn} from '@/lib/utils'
import Link from 'next/link'

interface Props {
  type: 'link' | 'button' | 'submit'
  text: string
  variant?: 'primary' | 'secondary'
  size: 'md' | 'lg'
  adavanced_hover?: boolean
  href?: string
  blank?: boolean
  className?: string
  onClick?: () => void
  [x: string]: any
}

export const buttonVariants = {
  default: {
    styles: 'px-5 sm:px-4 py-1.5 rounded-md border-2 border-custom-primary duration-300 cursor-pointer tracking-normal',
    hover: 'group-hover:opacity-85',
  },
  primary: {
    default: 'text-white bg-custom-primary',
    hover: 'hover:bg-custom-gray hover:border-custom-gray',
    hover_mobile: 'active:bg-custom-gray active:border-custom-gray',
  },
  secondary: {
    default: 'text-custom-primary',
    hover: 'hover:border-custom-gray hover:text-custom-gray',
    hover_mobile: 'active:border-custom-gray active:text-custom-gray',
  },
}

const Button: React.FC<Props> = ({type, text, variant = 'primary', size, adavanced_hover = false, href, blank, className, onClick, ...props}) => {
  const buttonStyles = `
  ${buttonVariants.default.styles} ${buttonVariants[variant].default} 
  ${adavanced_hover ? (!isMobile ? buttonVariants[variant].hover : buttonVariants[variant].hover_mobile) : buttonVariants.default.hover} 
  ${size === 'lg' && 'text-lg sm:text-base'} ${cn(className)}
  `

  if (type === 'link') {
    return (
      <Link href={href} target={blank && '_blank'} className={`block text-center ${buttonStyles}`} {...props}>
        {text}
      </Link>
    )
  } else if (type === 'button' || type === 'submit') {
    return (
      <button className={buttonStyles} onClick={onClick} {...props}>
        {text}
      </button>
    )
  }
}

export default Button
