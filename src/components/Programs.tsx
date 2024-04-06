import Link from 'next/link'
import Image from 'next/image'
import {client, urlForImage} from '@/lib/sanity'

interface Program {
  name: string
  duration: string
  description: string
  images: Array<{asset: {url: string}}>
  pdf: {asset: {url: string}}
  slug: {current: string}
}

export const revalidate = 30

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
    <section className="grid grid-cols-4 xl:grid-cols-3 sm:grid-cols-1 items-start gap-5 p-5 m-5 mt-20 border-2 border-custom-teal/25">
      {programs.map((program, idx) => (
        <Link key={idx} href={`/program/${program.slug.current}`} className="flex flex-col justify-between h-[500px] w-full gap-5 p-5 border-2 border-custom-teal group">
          {program.images.length > 0 && (
            <div className="w-full h-[250px] relative self-center">
              <Image src={urlForImage(program.images[0]).url()} className="object-cover" fill={true} alt={`program 0`} />
            </div>
          )}

          <div className="space-y-2">
            <h1 className="text-2xl font-medium ">{program.name}</h1>
            <h2 className="line-clamp-3">{program.description}</h2>
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
