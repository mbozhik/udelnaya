import Text from '#/UI/Text'
import Container from '#/UI/Container'

export default function Booking() {
  return (
    <section data-section="booking" className="bg-custom-light-gray py-5">
      <Container padding={false}>
        <form className="grid grid-cols-5">
          <div>
            <Text type="title" text="Бронирование" />
            <Text type="caption" text="Какой-то текст" />
          </div>
        </form>
      </Container>
    </section>
  )
}
