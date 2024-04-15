import Container from '#/UI/Container'
import Promo from '@/components/App/index/Promo'
import Programs from '##/index/Programs'
import Medicine from '##/index/Medicine'
import Rooms from '##/index/Rooms'

export default function Home() {
  return (
    <>
      <Promo classes="w-full h-[65vh] sm:!h-[100svh] sm:h-[100vh]" />
      <Container last={true} padding={false} classes="mt-20 space-y-20">
        <Medicine classes="w-full h-[50vh] xl:h-[55vh]" />
        <Programs />
        <Rooms />
      </Container>
    </>
  )
}
