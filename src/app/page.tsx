import Container from '#/Global/Container'

import Promo from '@/components/App/index/Promo'
import Booking from '#/UI/Booking'
import Programs from '##/index/Programs'
import Medicine from '##/index/Medicine'
import Rooms from '##/index/Rooms'
import Corporate from '##/index/Corporate'
import Questions from '##/index/Questions'

export default function Home() {
  return (
    <>
      <Promo />
      <Booking />
      <Container padding={false} className="mt-16 space-y-16 sm:mt-14 sm:space-y-14">
        <Medicine />
        <Programs />
        <Rooms />
        <Corporate />
        <Questions />
      </Container>
    </>
  )
}
