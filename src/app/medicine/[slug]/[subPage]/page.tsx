import {client} from '@/lib/sanity'
import {revalidateOnTime} from '@/lib/utils'

import Container from '#/Global/Container'
import Heading from '#/UI/Heading'
import Questions from '##/index/Questions'
import PortableBlock from '#/UI/PortableBlock'
import Error from '#/UI/Error'

interface MedicineSubPageProps {
  name: string
  description: any
  slug: {current: string}
}

async function getData(params): Promise<MedicineSubPageProps | null> {
  const getEntityType =
    params.slug === 'procedury'
      ? 'medicine_procedures' // procedury
      : params.slug === 'diagnostika'
      ? 'medicine_diagnostics' // diagnostika
      : null

  const data = await client.fetch<MedicineSubPageProps>(
    `*[_type == '${getEntityType}' && slug.current == '${params.subPage}'][0] {
        name,
        description,
        slug,
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
    <Container width="1/2" className="space-y-20 mt-7">
      <section data-index={data.slug} className="space-y-7">
        <Heading type="title" text={data.name} />

        <PortableBlock prose={true} value={data.description} />
      </section>

      <Questions />
    </Container>
  )
}

export default MedicineSubPage
