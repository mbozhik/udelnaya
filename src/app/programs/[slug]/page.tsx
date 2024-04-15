import {unstable_noStore as noStore} from 'next/cache'

import Link from 'next/link'
import Image from 'next/image'

import {client, urlForImage, urlForFile} from '@/lib/sanity'

const getData = async (slug) => {
  noStore()

  const query = `
    *[_type == 'program' && slug.current == '${slug}'][0] {
        name,
        duration,
        description,
        images,
        pdf,
        slug
    }`

  const data = await client.fetch(query)
  return data
}

const ProgramPage = async ({params}) => {
  const program = await getData(params.slug)

  if (!program) {
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  return (
    <section className="grid w-screen h-screen place-items-center">
      <div className="flex flex-col items-center w-1/2 gap-5">
        <Link prefetch={false} href={'/program/'} className="duration-200 block w-fit mt-5 mx-auto hover:text-custom-primary">
          К программам
        </Link>
        <div className="flex flex-col gap-5 p-5 border-2 border-custom-primary group">
          <div className="flex gap-5">
            {program.images &&
              program.images.length > 0 &&
              program.images.map((image, index) => (
                <div key={index} className="w-full h-[15vw] relative self-center">
                  <Image src={urlForImage(image).url()} className="object-cover" fill={true} alt={`program ${index}`} />
                </div>
              ))}
          </div>

          <div>
            <h1 className="text-2xl font-medium">{program.name}</h1>
            {program.duration && <h3 className="px-2 py-1 text-sm text-white bg-custom-primary w-fit">{program.duration}</h3>}
            <h2 className="mt-5">{program.description}</h2>
          </div>

          {program.pdf && (
            <Link href={urlForFile(program.pdf.asset._ref)} className="px-2 py-1 text-sm text-white bg-custom-primary w-fit" target="_blank" rel="noopener noreferrer">
              View PDF
            </Link>
          )}

          <button title="Забронировать" className="w-full py-2 text-white duration-300 bg-custom-primary group-hover:bg-custom-primary/85" type="button">
            Забронировать
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProgramPage
