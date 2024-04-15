import {cn} from '@/lib/utils'

interface Props {
  children: React.ReactNode
  width?: '1/2' | '3/4'
  padding?: boolean
  classes?: string
  last?: boolean
}

export const widthClasses = {
  default: 'mx-auto',
  '1/2': 'w-[70%] sm:w-[90%]',
  '3/4': 'w-[95%]',
}

export default function Container({children, width = '1/2', padding = false, last, classes}: Props) {
  const containerStyles = `${widthClasses.default} ${widthClasses[width]} ${padding && 'pt-14'} ${last && 'pb-[15vh]'} ${cn(classes)}`

  return <main className={containerStyles}>{children}</main>
}
