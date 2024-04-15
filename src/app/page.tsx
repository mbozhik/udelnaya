import Container from '#/UI/Container'
import Stocks from '##/index/Stocks'
import Programs from '##/index/Programs'
import Medicine from '##/index/Medicine'

export default function Home() {
  return (
    <>
      <Stocks classes="w-full h-[65vh] sm:!h-[100svh] sm:h-[100vh]" />
      <Container padding={false}>
        <Medicine />
        <Programs />
      </Container>
    </>
  )
}
