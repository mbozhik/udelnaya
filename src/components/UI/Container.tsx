interface Props {
  children: React.ReactNode
  padding?: boolean
}

export default function Container({padding = true, children}: Props) {
  return <main className={`w-[70%] xl:w-[60%] sm:w-[90%] mx-auto pb-[15vh] ${padding ? 'pt-14' : ''}`}>{children}</main>
}
