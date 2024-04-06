import Image from 'next/image'

import {client, urlFor} from '@/lib/sanity'

const getData = async () => {
  const query = `
    *[_type == 'stocks'] {
        images
    }`

  const data = await client.fetch(query)
  return data
}

const Stocks = async () => {
  const stocks = await getData()

  return (
    <section className="p-5 m-5 space-y-5 border-2 border-custom-teal/25">
      <h1 className="py-2 mx-auto text-xl text-center border-2 text-custom-teal border-custom-teal">Акции</h1>

      {stocks.map((stock, idx) => (
        <div key={idx} className="flex justify-between w-full">
          {stock.images.map((image, index) => (
            <div key={index} className="s-[20vw] relative">
              <Image src={urlFor(image).url()} className="object-cover" fill={true} alt={`stock ${index}`} />
            </div>
          ))}
        </div>
      ))}
    </section>
  )
}

export default Stocks
