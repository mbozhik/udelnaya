import {cn} from '@/lib/utils'

interface Props {
  type?: 'title' | 'subtitle' | 'caption'
  text: string
  className?: string
}

const Text: React.FC<Props> = ({type = 'caption', text, className}) => {
  if (type === 'title' || type === 'subtitle') {
    return <h1 className={cn(`font-medium tracking-tight ${type === 'title' ? 'text-2xl xl:text-xl' : 'text-xl xl:text-lg'}`, className)} dangerouslySetInnerHTML={{__html: text || ''}} />
  } else if (type === 'caption') {
    return <p className={cn('tracking-tight sm:text-sm', className)} dangerouslySetInnerHTML={{__html: text || ''}} />
  }
}

export default Text
