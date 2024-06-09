import {client, urlForImage} from '@/lib/sanity'
import {revalidateOnTime} from '@/lib/utils'

import Link from 'next/link'
import Image from 'next/image'
import Container from '#/Global/Container'
import Heading from '#/UI/Heading'
import Questions from '##/index/Questions'
import PortableBlock from '#/UI/PortableBlock'
import Text from '#/UI/Text'
import {CardField} from '##/medicine/SpecialistCard'
import Error from '#/UI/Error'

interface MedicineSubPageProps {
  name: string
  description: any
  slug: {current: string}

  position?: string
  education?: string
  accreditation?: string
  work_days?: string
  work_time?: string
  caption?: any
  image?: Array<{asset: {url: string}}>
}

async function getData(params): Promise<MedicineSubPageProps | null> {
  const slugMapping = {
    procedury: 'medicine_procedures',
    diagnostika: 'medicine_diagnostics',
    specialisty: 'medicine_specialists',
  }

  const getSanitySlug = slugMapping[params.slug] || null

  const data = await client.fetch<MedicineSubPageProps>(
    `*[_type == '${getSanitySlug}' && slug.current == '${params.subPage}'][0] {
        name,
        description,
        slug,
        
        position,
        education,
        accreditation,
        work_days,
        work_time,
        caption,
        image,
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

const MedicineSubPage = async ({params}) => {
  const data: MedicineSubPageProps | null = await getData(params)

  if (!data) {
    return <Error />
  }

  return (
    <Container width={params.slug == 'diagnostika' || params.slug == 'procedury' ? '1/2' : '2/3'} className="space-y-20 mt-7">
      {(params.slug == 'diagnostika' || params.slug == 'procedury') && (
        <section data-index={data.slug} className="space-y-7">
          <Heading type="title" text={data.name} />
          <PortableBlock prose={true} value={data.description} />
        </section>
      )}

      {params.slug == 'specialisty' && (
        <section data-index={data.slug} className="rounded-md shadow-mini-card h-fit p-5 xl:p-3 sm:p-4 space-y-5">
          <div className="grid grid-cols-2 items-center gap-5 duration-300 ">
            <Link className="h-[35vh] aspect-square relative rounded-[4px] overflow-hidden justify-self-center" href={urlForImage(data.image).url()} target="_blank">
              <Image quality={100} className="object-cover" src={urlForImage(data.image).url()} alt={data.name} fill={true} />
            </Link>

            <div className="space-y-2">
              <Text type="subtitle" text={data.name} />
              <mark>{data.position}</mark>

              <div className="space-y-1.5">
                <CardField title="Образование:" text={data.education} />
                <CardField title="Сертификация и аккредитация:" text={data.accreditation} />
                <CardField title="График работы:" text={data.work_days} />
                <CardField title="Часты приема:" text={data.work_time} />
              </div>
            </div>
          </div>

          {data.caption && <PortableBlock prose={true} value={data.caption} />}
        </section>
      )}

      <Questions />
    </Container>
  )
}

export default MedicineSubPage
