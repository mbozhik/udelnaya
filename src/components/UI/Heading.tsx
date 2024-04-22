import {cn} from '@/lib/utils'

interface Props {
  type: 'title' | 'subtitle' | 'caption'
  text: string
  classes?: string
}

const Heading: React.FC<Props> = ({type, text, classes}) => {
  if (type === 'title' || type === 'subtitle') {
    return <h1 className={`${type === 'title' ? 'text-3xl' : 'text-3xl xl:text-2xl'} font-medium uppercase tracking-tight ${cn(classes)}`} dangerouslySetInnerHTML={{__html: text || ''}} />
  } else if (type === 'caption') {
    return <p className={`font-light ${cn(classes)}`} dangerouslySetInnerHTML={{__html: text || ''}} />
  }
}

export default Heading
