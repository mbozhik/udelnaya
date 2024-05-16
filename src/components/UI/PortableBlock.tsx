import {PortableText} from '@portabletext/react'

import {getImageDimensions} from '@sanity/asset-utils'
import {urlForImage} from '@/lib/sanity'
import Image from 'next/image'
import {cn} from '@/lib/utils'

interface Props {
  value: any
  prose?: boolean
  className?: string
}

const PortableImage = ({value}) => {
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

const PortableBlock: React.FC<Props> = ({value, prose = false, className}) => {
  return (
    <div className={cn(`tracking-tight sm:text-sm sm:pr-2 space-y-2.5 ${prose ? 'prose prose-li:marker:text-custom-primary' : ''}`, className)}>
      <PortableText
        value={value}
        components={{
          types: {
            image: PortableImage,
          },
          marks: {
            link: ({value, children}) => {
              const {blank, href} = value
              return (
                <a className="duration-200 text-custom-primary hover:text-custom-gray" href={href} target="_blank" rel="noopener">
                  {children}
                </a>
              )
            },
          },
        }}
      />
    </div>
  )
}

export default PortableBlock
