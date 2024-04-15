import {cn} from '@/lib/utils'

interface Props {
  children: React.ReactNode
  width?: '2/3' | '3/4'
  padding?: boolean
  classes?: string
  last?: boolean
}

export const widthClasses = {
  default: 'mx-auto',
  '2/3': 'w-[70%] sm:w-[90%]',
  '3/4': 'w-[80%] sm:w-[93%]',
}

export default function Container({children, width = '2/3', padding = true, last, classes}: Props) {
  const containerStyles = `${widthClasses.default} ${widthClasses[width]} ${padding && 'pt-36 xl:pt-28 sm:pt-24'} ${last && 'pb-[15vh]'} ${cn(classes)}`

  return <main className={containerStyles}>{children}</main>
}
