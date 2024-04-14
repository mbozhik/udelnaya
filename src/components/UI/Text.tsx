interface Props {
  type?: 'heading' | 'text'
  text?: string
  classes?: string
}

const Text: React.FC<Props> = ({type = 'text', text, classes}) =>
  // prettier-ignore
  type === 'heading' ? (
    <h1 className={`text-5xl font-medium uppercase sm:text-2xl text-custom-blue ${classes}`} dangerouslySetInnerHTML={{__html: text || ''}} />
  ) : (
    <p className={`text-base sm:text-sm ${classes}`} dangerouslySetInnerHTML={{__html: text || ''}} />
  )

export default Text
