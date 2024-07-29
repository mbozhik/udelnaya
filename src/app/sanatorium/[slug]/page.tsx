import {client, urlForImage} from '@/lib/sanity'
import {revalidateTime} from '@/lib/utils'

import Image from 'next/image'
import PortableBlock from '#/UI/PortableBlock'

import Container from '#/Global/Container'
import Heading from '#/UI/Heading'
import Questions from '##/index/Questions'
import Error from '#/UI/Error'
import ImageSlider from '@/components/UI/ImageSlider'

interface SanatoriumPageProps {
  title: string
  description: any
  image: {asset: {url: string}}
  about_slider: Array<{asset: {url: string}}>
  slug: {current: string}
}

async function getData(params): Promise<SanatoriumPageProps> {
  const slugMapping = {
    about: 'o-sanatorii',
    info: 'vazhnaya-informaciya',
    'corporate-clients': 'korporativnym-klientam',
  }

  const getSanitySlug = slugMapping[params.slug] || null

  const data = await client.fetch<SanatoriumPageProps>(
    `*[_type == 'sanatorium' && slug.current == '${getSanitySlug}'][0] {
      title,
      description,
      image,
      about_slider,
      slug,
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

const SanatoriumPage = async ({params}) => {
  const page: SanatoriumPageProps = await getData(params)

  if (!page) {
    return <Error />
  }

  const isAboutPage = params.slug === 'about'

  const sliderData =
    params.slug === 'about'
      ? page.about_slider.map((slide) => ({
          imageUrl: urlForImage(slide).url(),
        }))
      : null

  const imagesStyles = 'relative w-full h-[45vh] sm:h-[30vh] xl:w-full rounded-[4px]'

  return (
    <Container width="2/3" className="space-y-20 sm:space-y-14 mt-7">
      <div data-index={page.slug.current} className="p-5 space-y-10 rounded-md sm:space-y-7 shadow-card group sm:p-3">
        <div className="space-y-7 sm:space-y-5">
          <div className="flex flex-col items-center gap-10 sm:gap-5">
            <div className="relative grid place-items-center w-full h-[45vh] rounded-md overflow-hidden">
              <Image quality={100} priority={true} className="absolute inset-0 block object-cover s-full" width={1920} height={700} alt={`акция`} src={urlForImage(page.image).url()} />
            </div>
          </div>

          <div className="space-y-3">
            <Heading type="title" text={page.title} />

            <PortableBlock prose={true} value={page.description} />
          </div>
        </div>

        {isAboutPage ? (
          <div className="space-y-3">
            {/* <Heading type="title" text={page.title} /> */}

            <ImageSlider sliderData={sliderData} className={imagesStyles} />
          </div>
        ) : (
          ''
        )}
      </div>

      <Questions />
    </Container>
  )
}

export default SanatoriumPage
