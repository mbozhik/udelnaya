import Link from 'next/link'
import Image from 'next/image'
import {client, urlFor} from '@/lib/sanity'

interface Program {
  name: string
  duration: string
  description: string
  images: Array<{asset: {url: string}}>
  pdf: {asset: {url: string}}
  slug: {current: string}
}

const getData = async (): Promise<Program[]> => {
  const query = `
    *[_type == 'program'] {
        name,
        duration,
        description,
        images,
        pdf,
        slug
    }`

  const data: Program[] = await client.fetch(query)
  return data
}

const Program = async () => {
  const programs: Program[] = await getData()

  return (
    <section className="flex flex-row flex-wrap items-start gap-5 p-5 m-5 mt-20 border-2 border-custom-teal/25">
      {programs.map((program, idx) => (
        <Link key={idx} href={`/program/${program.slug.current}`} className="flex flex-col w-[24%] gap-5 p-5 border-2 border-custom-teal group">
          {program.images.map((image, index) => (
            <div key={index} className="w-full h-[15vw] relative self-center">
              <Image src={urlFor(image).url()} className="object-cover" fill={true} alt={`program ${index}`} />
            </div>
          ))}

          <div className="space-y-2 line-clamp-4">
            <h1 className="text-2xl font-medium">{program.name}</h1>
            <h2>{program.description}</h2>
          </div>
          <button title="Подробнее" className="w-full py-2 text-white duration-300 bg-custom-teal group-hover:bg-custom-teal/85">
            Подробнее
          </button>
        </Link>
      ))}
    </section>
  )
}

export default Program
