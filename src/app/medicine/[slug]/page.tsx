import {client, urlForImage} from '@/lib/sanity'
import {revalidateOnTime} from '@/lib/utils'

import Image from 'next/image'
import {Fragment} from 'react'
import PortableBlock from '#/UI/PortableBlock'

import Container from '#/Global/Container'
import Heading from '#/UI/Heading'
import Questions from '##/index/Questions'
import Error from '#/UI/Error'

import SpecialistCard from '##/medicine/SpecialistCard'
import MedicineGrid from '@/components/App/medicine/MedicineGrid'

interface MedicinePage {
  name: string
  short_description: any
  description: any
  image: Array<{asset: {url: string}}>
  slug: {current: string}

  specialists?: Array<{name: string; position: string; education: string; accreditation: string; work_days: string; work_time: string; image: Array<{asset: {url: string}}>}>
  procedures?: Array<{name: string; description: any; slug: {current: string}}>
  diagnostics?: Array<{name: string; description: any; slug: {current: string}}>
}

async function getData(slug): Promise<MedicinePage | null> {
  const data = await client.fetch<MedicinePage>(
    `*[_type == 'medicine' && slug.current == '${slug}'][0] {
        name,
        short_description,
        description,
        image,
        special_offer,
        slug,
        specialists[] -> { name, position, education, accreditation, work_days, work_time, image, slug },
        procedures[] -> { name, description, slug },
        diagnostics[] -> { name, description, slug },

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

const MedicinePage = async ({params}) => {
  const data: MedicinePage | null = await getData(params.slug)

  if (!data) {
    return <Error />
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
        <Heading type="title" text={data.name} />

        <section data-index={data.slug.current} className="mb-20 mt-14">
          <div className="p-5 space-y-12 rounded-md sm:space-y-7 shadow-card group sm:p-3">
            <div className={`grid items-center ${gridConfig.global} gap-10 sm:flex sm:flex-col sm:gap-5`}>
              <div className={`relative ${imagesStyles}`}>
                <Image quality={100} className="object-cover" src={urlForImage(data.image).url()} fill={true} sizes="25vw" alt={`${data.name}`} />
              </div>

              <PortableBlock className={`${gridConfig.text} pr-10`} value={data.short_description} />
            </div>

            <PortableBlock className="pr-10" value={data.description} />

            {params.slug == 'specialisty' && (
              <section className="grid grid-cols-3 auto-rows-min gap-5 xl:gap-3 sm:gap-5 sm:grid-cols-1">
                {data.specialists
                  .filter((specialist) => specialist.position === 'Главный Врач')
                  .map((chiefDoctor, index) => (
                    <Fragment key={index}>
                      {[0, 1, 2].map((cardIndex) => (
                        <SpecialistCard specialist={chiefDoctor} className={`${cardIndex > 0 ? 'opacity-0 sm:hidden' : ''}`} key={cardIndex} />
                      ))}
                    </Fragment>
                  ))}

                {data.specialists
                  .filter((specialist) => specialist.position !== 'Главный Врач')
                  .map((specialist, index) => (
                    <SpecialistCard specialist={specialist} key={index} />
                  ))}
              </section>
            )}

            {params.slug == 'diagnostika' && <MedicineGrid sub_entity={data.diagnostics} link={params.slug} />}
            {params.slug == 'procedury' && <MedicineGrid sub_entity={data.procedures} link={params.slug} />}
          </div>
        </section>
      </div>

      <Questions />
    </Container>
  )
}

export default MedicinePage
