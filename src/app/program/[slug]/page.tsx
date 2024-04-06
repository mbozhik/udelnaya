import Link from 'next/link'
import Image from 'next/image'

import {client, urlFor} from '@/lib/sanity'

const getData = async (slug) => {
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
  console.log('🚀 ~ ProgramPage ~ program:', program)

  return (
    <section className="grid w-screen h-screen place-items-center">
      <div className="flex flex-col items-center w-1/2 gap-5">
        <Link href={'/'} className="mx-auto duration-200 w-fit hover:text-custom-teal">
          На главную
        </Link>
        <div className="flex flex-col gap-5 p-5 border-2 border-custom-teal group">
          {program.images.map((image, index) => (
            <div key={index} className="w-full h-[15vw] relative self-center">
              <Image src={urlFor(image).url()} className="object-cover" fill={true} alt={`program ${index}`} />
            </div>
          ))}

          <div>
            <h1 className="text-2xl font-medium">{program.name}</h1>
            <h3 className="px-2 py-1 text-sm text-white bg-custom-teal w-fit">{program.duration}</h3>
            <h2 className="mt-5">{program.description}</h2>
          </div>

          <button title="Забронировать" className="w-full py-2 text-white duration-300 bg-custom-teal group-hover:bg-custom-teal/85">
            Забронировать
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProgramPage
