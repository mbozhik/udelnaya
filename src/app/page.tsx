import Container from '#/UI/Container'
import Promo from '@/components/App/index/Promo'
import Programs from '##/index/Programs'
import Medicine from '##/index/Medicine'
import Rooms from '##/index/Rooms'
import Questions from '##/index/Questions'
import Booking from '#/UI/Booking'

export default function Home() {
  return (
    <>
      <Promo />
      <Booking />
      <Container padding={false} classes="mt-20 space-y-20">
        <Medicine />
        <Programs />
        <Rooms />
        <Questions />
      </Container>
    </>
  )
}
