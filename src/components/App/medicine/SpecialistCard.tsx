import {memo} from 'react'

import {urlForImage} from '@/lib/sanity'
import {cn} from '@/lib/utils'

import Link from 'next/link'
import Image from 'next/image'
import Text from '#/UI/Text'

interface CardFieldProps {
  title: string
  text: string
}

export const CardField = memo(({title, text}: CardFieldProps) => (
  <div>
    <Text type="caption" className="font-semibold" text={title} />
    <Text type="caption" text={text} />
  </div>
))
CardField.displayName = 'CardField'

const SpecialistCard = ({specialist, className = ''}) => {
  const imageUrl = urlForImage(specialist.image).url()

  return (
    <Link href={`/medicine/specialisty/${specialist.slug.current}`} className={cn('p-5 xl:p-3 sm:p-4 space-y-5 h-full duration-300 rounded-md shadow-mini-card', className)}>
      <div className="w-full aspect-[7/5] relative rounded-[4px] overflow-hidden">
        <Image quality={100} className="object-cover" src={imageUrl} alt={specialist.name} fill={true} />
      </div>

      <div className="space-y-3">
        <Text type="subtitle" text={specialist.name} />
        <div className="space-y-2">
          <mark>{specialist.position}</mark>

          <div className="space-y-1.5">
            <CardField title="Образование:" text={specialist.education} />
            <CardField title="Сертификация и аккредитация:" text={specialist.accreditation} />
            <CardField title="График работы:" text={specialist.work_days} />
            <CardField title="Часты приема:" text={specialist.work_time} />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default SpecialistCard
