import Link from 'next/link'
import Image from 'next/image'

import Heading from '#/UI/Heading'
import Text from '#/UI/Text'

import GroupVisits from '%/corporate/group-visits.jpg'
import Weddings from '%/corporate/weddings.jpg'
import CorporateEvents from '%/corporate/corporate-events.jpg'

const corporateData = {
  1: {
    title: 'Групповые заезды',
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

      <Link href="/sanatorium/corporate-clients" className="grid grid-cols-3 rounded-md sm:grid-cols-1 shadow-card">
        {Object.entries(corporateData).map(([key, value]) => (
          <div className="flex flex-col items-center gap-3 p-3 pb-4 sm:pb-1 sm:p-3 sm:gap-2" key={key}>
            <Image className="object-cover w-full h-full rounded-[4px]" src={value.image} alt={value.title} />
            <Text type="title" className="text-xl xl:text-lg !font-book" text={value.title} />
          </div>
        ))}
      </Link>
    </section>
  )
}
