import {cn} from '@/lib/utils'

interface Props {
  type: 'title' | 'caption'
  text: string
  classes?: string
}

const Heading: React.FC<Props> = ({type, text, classes}) => {
  if (type === 'title') {
    return <h1 className={`text-5xl xl:text-4xl sm:text-3xl font-medium uppercase tracking-tight ${cn(classes)}`} dangerouslySetInnerHTML={{__html: text || ''}} />
  } else if (type === 'caption') {
    return <p className={`text-xl sm:text-base font-light ${cn(classes)}`} dangerouslySetInnerHTML={{__html: text || ''}} />
  }
}

export default Heading
