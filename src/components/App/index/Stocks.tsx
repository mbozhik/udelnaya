import {unstable_noStore as noStore} from 'next/cache'

import {client} from '@/lib/sanity'
import StocksSlider from '#/App/index/StocksSlider'

const getData = async () => {
  noStore()

  const query = `
    *[_type == 'stocks'] {
      images
    }`

  const data = await client.fetch(query)
  return data
}

interface StocksProps {
  classes: string
}

const Stocks: React.FC<StocksProps> = async ({classes}) => {
  const stocks = await getData()

  if (!stocks) {
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  const images = stocks.map((stock) => stock.images).flat()

  return <StocksSlider images={images} classes={classes} />
}

export default Stocks
