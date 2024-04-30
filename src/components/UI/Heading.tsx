import {cn} from '@/lib/utils'

interface Props {
  type: 'title' | 'subtitle' | 'caption'
  text: string
  className?: string
}

const Heading: React.FC<Props> = ({type, text, className}) => {
  if (type === 'title' || type === 'subtitle') {
    return <h1 className={cn(`font-medium uppercase tracking-tight ${type === 'title' ? 'text-3xl sm:text-2xl' : 'text-3xl xl:text-2xl'}`, className)} dangerouslySetInnerHTML={{__html: text || ''}} />
  } else if (type === 'caption') {
    return <p className={cn('font-light ', className)} dangerouslySetInnerHTML={{__html: text || ''}} />
  }
}

export default Heading
