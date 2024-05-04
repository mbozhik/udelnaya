import {cn} from '@/lib/utils'

interface Props {
  children: React.ReactNode
  width?: '1/2' | '2/3'
  padding?: boolean
  className?: string
}

export const widthclassName = {
  default: 'mx-auto flex-auto',
  '1/2': 'w-[40%] xl:w-[50%] sm:w-[90%]',
  '2/3': 'w-[60%] xl:w-[70%] sm:w-[90%]',
}

export default function Container({children, width = '2/3', padding = true, className}: Props) {
  const containerStyles = `${widthclassName.default} ${widthclassName[width]} ${padding && 'pt-36 sm:pt-24'} ${cn(className)}`

  return <main className={cn(containerStyles, className)}>{children}</main>
}
