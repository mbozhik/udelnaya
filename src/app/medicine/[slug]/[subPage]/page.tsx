import {client} from '@/lib/sanity'
import {revalidateOnTime} from '@/lib/utils'

import Container from '#/Global/Container'
import Heading from '#/UI/Heading'
import Questions from '##/index/Questions'
import PortableBlock from '#/UI/PortableBlock'
import SpecialistCard from '##/medicine/SpecialistCard'
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
        <section data-index={data.slug}>
          <SpecialistCard extend={true} specialist={data} />
        </section>
      )}

      <Questions />
    </Container>
  )
}

export default MedicineSubPage
