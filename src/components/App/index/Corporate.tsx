import Image from 'next/image'
import CorporateImage1 from '%/corporate/1.jpg'
import CorporateImage2 from '%/corporate/2.jpg'
import CorporateImage3 from '%/corporate/3.jpg'

import Heading from '#/UI/Heading'
import Text from '#/UI/Text'

const corporateData = {
  1: {
    title: 'Груповые заезды',
    image: CorporateImage1,
  },
  2: {
    title: 'Проведение свадеб',
    image: CorporateImage2,
  },
  3: {
    title: 'Корпоративные мероприятия',
    image: CorporateImage3,
  },
}

export default function Corporate() {
  return (
    <section data-section="corporate-index" className="space-y-7">
      <Heading type="title" classes="text-center" text="Корпоративным клиентам" />

      <div className="grid grid-cols-3 gap-5 sm:grid-cols-1">
        {Object.entries(corporateData).map(([key, value]) => (
          <div key={key} className="flex flex-col items-center gap-5 p-3 pb-5 sm:p-3 sm:gap-2 bg-custom-light-gray">
            <Image className="object-cover w-full h-full" src={value.image} alt={value.title} />
            <Text type="title" classes="text-center !font-book xl:text-xl sm:text-lg" text={value.title} />
          </div>
        ))}
      </div>
    </section>
  )
}
