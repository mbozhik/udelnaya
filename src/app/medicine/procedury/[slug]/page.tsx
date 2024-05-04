import {client} from '@/lib/sanity'
import {revalidateOnTime} from '@/lib/utils'

import {PortableText} from '@portabletext/react'
import {PortableImage} from '#/UI/PortableImage'

import Container from '#/Global/Container'
import Heading from '#/UI/Heading'
import Questions from '##/index/Questions'

interface MedicinePage {
  name: string
  description: any
  slug: {current: string}
}

async function getData(slug): Promise<MedicinePage | null> {
  const data = await client.fetch<MedicinePage>(
    `*[_type == 'medicine_procedures' && slug.current == '${slug}'][0] {
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

const ProgramPage = async ({params}) => {
  const medicine: MedicinePage | null = await getData(params.slug)

  if (!medicine) {
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  return (
    <Container width="1/2" className="space-y-20 mt-7">
      <section data-index={medicine.slug} className="space-y-7">
        <Heading type="title" text={medicine.name} />

        <div className="tracking-tight prose sm:pr-2 sm:text-sm prose-li:marker:text-custom-primary">
          <PortableText
            value={medicine.description}
            components={{
              types: {
                image: PortableImage,
              },
            }}
          />
        </div>
      </section>
      <Questions />
    </Container>
  )
}

export default ProgramPage
