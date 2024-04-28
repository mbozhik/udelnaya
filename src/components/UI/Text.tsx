import {cn} from '@/lib/utils'

interface Props {
  type?: 'title' | 'caption'
  text: string
  className?: string
}

const Text: React.FC<Props> = ({type = 'caption', text, className}) => {
  if (type === 'title') {
    return <h1 className={`text-2xl xl:text-xl font-medium tracking-tight ${cn(className)}`} dangerouslySetInnerHTML={{__html: text || ''}} />
  } else if (type === 'caption') {
    return <p className={`tracking-tight sm:text-sm ${cn(className)}`} dangerouslySetInnerHTML={{__html: text || ''}} />
  }
}

export default Text
