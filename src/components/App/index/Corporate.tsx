import Link from 'next/link'
import Image from 'next/image'

import Heading from '#/UI/Heading'
import Text from '#/UI/Text'

import GroupVisits from '%/corporate/group-visits.jpg'
import Weddings from '%/corporate/weddings.jpg'
import CorporateEvents from '%/corporate/corporate-events.jpg'

const corporateData = {
  1: {
    title: 'Груповые заезды',
    image: GroupVisits,
  },
  2: {
    title: 'Проведение свадеб',
    image: Weddings,
  },
  3: {
    title: 'Корпоративные мероприятия',
    image: CorporateEvents,
  },
}

export default function Corporate() {
  return (
    <section data-section="corporate-index" className="mb-20 space-y-7 sm:space-y-5">
      <Heading type="title" className="text-center" text="Корпоративным клиентам" />

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-1">
        {Object.entries(corporateData).map(([key, value]) => (
          <Link href="/sanatorium/corporate-clients" key={key} className="flex flex-col items-center gap-3 p-3 pb-3 rounded-md sm:p-3 sm:gap-2 shadow-card">
            <Image className="object-cover w-full h-full rounded-[4px]" src={value.image} alt={value.title} />
            <Text type="title" className="text-xl xl:text-lg !font-book" text={value.title} />
          </Link>
        ))}
      </div>
    </section>
  )
}
