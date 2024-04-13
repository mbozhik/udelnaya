import Link from 'next/link'

interface Button {
  text: string
  type?: 'link' | 'button'
  variant?: 'primary' | 'secondary'
  href: string
  blank?: boolean
  classes?: string
}

export const buttonVariants = {
  default: 'px-5 sm:px-4 py-1.5 text-xl xl:text-lg sm:text-base border-2 border-transparent duration-300 cursor-pointer',
  primary: 'text-white bg-custom-teal hover:bg-custom-gray',
  secondary: 'text-custom-teal !border-custom-teal hover:!border-custom-gray hover:text-custom-gray',
}

const Button: React.FC<Button> = ({text, type = 'link', variant = 'primary', href, blank, classes}) => {
  const buttonStyles = `${buttonVariants[variant] || buttonVariants['primary']} ${buttonVariants.default}  ${classes}`

  return (
    <>
      {type === 'link' ? (
        <Link href={href} target={blank && '_blank'} className={buttonStyles}>
          {text}
        </Link>
      ) : (
        <button className={buttonStyles}>{text}</button>
      )}
    </>
  )
}

export default Button
