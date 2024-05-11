import {client, urlForImage} from '@/lib/sanity'
import {cn, revalidateOnTime} from '@/lib/utils'

import Link from 'next/link'
import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import {Fragment} from 'react'

import Container from '#/Global/Container'
import Heading from '#/UI/Heading'
import Text from '#/UI/Text'
import Questions from '##/index/Questions'

interface SpecialistyPageProps {
  name: string
  specialists?: Array<{name: string; position: string; education: string; accreditation: string; work_days: string; work_time: string; image: Array<{asset: {url: string}}>}>
  short_description: any
  description: any
  image: Array<{asset: {url: string}}>
  slug: {current: string}
}

async function getData(): Promise<SpecialistyPageProps | null> {
  const data = await client.fetch<SpecialistyPageProps>(
    `*[_type == 'medicine' && slug.current == 'specialisty'][0] {
        name,
        specialists[] -> { name, position, education, accreditation, work_days, work_time, image },
        short_description,
        description,
        image,
        slug
    }`,
    {},
    {
      next: {
        revalidate: revalidateOnTime,
      },
    },
  )
  return data || null
}

const SpecialistCard = ({specialist, className = ''}) => {
  return (
    <article className={cn('p-5 space-y-5 duration-300 rounded-md shadow-mini-card h-fit', className)}>
      <div className="w-full aspect-[7/5] relative rounded-[4px] overflow-hidden">
        <Image quality={100} className="object-cover" src={urlForImage(specialist.image).url()} fill={true} alt={`${specialist.name}`} />
      </div>
      <div className="space-y-3">
        <Text type="subtitle" text={specialist.name} />
        <div className="space-y-1.5">
          <mark>{specialist.position}</mark>
          <Text type="caption" text={specialist.education} />
          <Text type="caption" text={specialist.accreditation} />
          <Text type="caption" text={specialist.work_days} />
          <Text type="caption" text={specialist.work_time} />
        </div>
      </div>
    </article>
  )
}

const SpecialistyPage = async () => {
  const medicine: SpecialistyPageProps | null = await getData()

  if (!medicine) {
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  const gridConfig = {
    global: 'grid-cols-7',
    image: 'col-span-3',
    text: 'col-span-4',
  }

  const imagesStyles = `relative w-full h-full aspect-[3/2] rounded-[4px] ${gridConfig.image}`

  return (
    <Container width="2/3" className="space-y-20 mt-7">
      <div className="space-y-5">
        <Heading type="title" text={medicine.name} />

        <section data-index={medicine.slug.current} className="mb-20 mt-14">
          <div className="p-5 space-y-12 rounded-md sm:space-y-7 shadow-card group sm:p-3">
            <div className={`grid items-center ${gridConfig.global} gap-10 sm:flex sm:flex-col sm:gap-5`}>
              <div className={`relative ${imagesStyles}`}>
                <Image quality={100} className="object-cover" src={urlForImage(medicine.image).url()} fill={true} sizes="25vw" alt={`${medicine.name}`} />
              </div>

              <div className={`${gridConfig.text} pr-10 space-y-2 sm:pr-2`}>
                <PortableText value={medicine.short_description} />
              </div>
            </div>

            <div className="pr-10 space-y-2">
              <PortableText value={medicine.description} />
            </div>

            <section className="grid grid-cols-3 gap-5 sm:grid-cols-1">
              {medicine.specialists
                .filter((specialist) => specialist.position === 'Главный Врач')
                .map((chiefDoctor, index) => (
                  <Fragment key={index}>
                    {[0, 1, 2].map((cardIndex) => (
                      <SpecialistCard specialist={chiefDoctor} className={`${cardIndex > 0 ? 'opacity-0' : ''}`} key={cardIndex} />
                    ))}
                  </Fragment>
                ))}

              {medicine.specialists
                .filter((specialist) => specialist.position !== 'Главный Врач')
                .map((specialist, index) => (
                  <SpecialistCard specialist={specialist} key={index} />
                ))}
            </section>
          </div>
        </section>
      </div>
      <Questions />
    </Container>
  )
}

export default SpecialistyPage
