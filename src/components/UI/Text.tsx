import {cn} from '@/lib/utils'

interface Props {
  type?: 'title' | 'caption'
  text: string
  className?: string
}

const Text: React.FC<Props> = ({type = 'caption', text, className}) => {
  if (type === 'title') {
    return <h1 className={cn('text-2xl xl:text-xl font-medium tracking-tight', className)} dangerouslySetInnerHTML={{__html: text || ''}} />
  } else if (type === 'caption') {
    return <p className={cn('tracking-tight sm:text-sm', className)} dangerouslySetInnerHTML={{__html: text || ''}} />
  }
}

export default Text
