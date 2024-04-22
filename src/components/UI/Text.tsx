import {cn} from '@/lib/utils'

interface Props {
  type: 'title' | 'caption'
  text: string
  classes?: string
}

const Text: React.FC<Props> = ({type, text, classes}) => {
  if (type === 'title') {
    return <h1 className={`text-2xl xl:text-xl font-medium tracking-tight ${cn(classes)}`} dangerouslySetInnerHTML={{__html: text || ''}} />
  } else if (type === 'caption') {
    return <p className={`tracking-tight sm:text-sm ${cn(classes)}`} dangerouslySetInnerHTML={{__html: text || ''}} />
  }
}

export default Text
