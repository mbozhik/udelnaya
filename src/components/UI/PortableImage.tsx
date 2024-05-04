import {getImageDimensions} from '@sanity/asset-utils'
import {urlForImage} from '@/lib/sanity'
import Image from 'next/image'

export const PortableImage = ({value}) => {
  const {width, height} = getImageDimensions(value)
  return (
    <Image
      className="w-full h-[35vh] rounded-md object-cover place-self-center"
      quality={100}
      width={700}
      height={700}
      src={urlForImage(value).url()}
      style={{
        aspectRatio: width / height,
      }}
      alt="image"
    />
  )
}
