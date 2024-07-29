import {client, urlForFile} from '@/lib/sanity'
import {revalidateTime} from '@/lib/utils'

import Container from '#/Global/Container'
import Text from '#/UI/Text'
import Button from '#/UI/Button'
import Error from '#/UI/Error'

async function getData() {
  const data = await client.fetch(
    `*[_type == 'footer'] {
        legislation,
      }`,
    {},
    {
      next: {
        revalidate: revalidateTime,
      },
    },
  )
  return data
}

const LegislationPage = async () => {
  const docs = await getData()

  if (!docs) {
    return <Error />
  }

  const legislationDocs = docs[0].legislation

  return (
    <Container width="2/3" className="space-y-20">
      <section data-index="legislation" className="mt-14 space-y-7">
        <Text type="title" className="uppercase text-center" text="Медицинское законодательство" />

        <div className="space-y-4">
          {legislationDocs.map((item) => (
            <Button type="link" blank={true} href={urlForFile(item.file.asset._ref)} size="lg" className="w-full uppercase" variant="secondary" adavanced_hover={true} text={item.label} key={item._key} />
          ))}
        </div>
      </section>
    </Container>
  )
}

export default LegislationPage
