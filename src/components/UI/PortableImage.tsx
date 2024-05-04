import {getImageDimensions} from '@sanity/asset-utils'
import {urlForImage} from '@/lib/sanity'
import Image from 'next/image'

export const PortableImage = ({value}) => {
  const {width, height} = getImageDimensions(value)
  return (
    <Image
      className="aspect-square object-cover s-32 place-self-center"
      src={urlForImage(value).url()}
      style={{
        aspectRatio: width / height,
      }}
      width={500}
      height={500}
      quality={100}
      alt="image"
    />
  )
}
