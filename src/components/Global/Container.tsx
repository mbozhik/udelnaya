import {cn} from '@/lib/utils'

interface Props {
  children: React.ReactNode
  width?: '2/3' | '3/4'
  padding?: boolean
  className?: string
}

export const widthclassName = {
  default: 'mx-auto flex-auto',
  '2/3': 'w-[60%] xl:w-[70%] sm:w-[90%]',
  '3/4': 'w-[80%] sm:w-[93%]',
}

export default function Container({children, width = '2/3', padding = true, className}: Props) {
  const containerStyles = `${widthclassName.default} ${widthclassName[width]} ${padding && 'pt-36 sm:pt-24'} ${cn(className)}`

  return <main className={containerStyles}>{children}</main>
}
