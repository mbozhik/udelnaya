import {unstable_noStore as noStore} from 'next/cache'
import {client, urlForImage} from '@/lib/sanity'

import StocksSlider from '#/App/index/StocksSlider'

const getData = async () => {
  noStore()

  const query = `
    *[_type == 'stocks'] {
      title,
      caption,
      image
    }`

  const data = await client.fetch(query)
  return data
}

const Stocks = async ({classes}) => {
  const stocks = await getData()

  if (!stocks) {
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  const sliderData = stocks.map((stock) => ({
    imageUrl: urlForImage(stock.image.asset._ref).url(),
    title: stock.title,
    caption: stock.caption,
  }))

  return <StocksSlider sliderData={sliderData} classes={classes} />
}

export default Stocks
