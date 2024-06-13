import {memo} from 'react'

import {urlForImage} from '@/lib/sanity'
import {cn} from '@/lib/utils'

import Link from 'next/link'
import Image from 'next/image'
import Text from '#/UI/Text'
import PortableBlock from '#/UI/PortableBlock'

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

interface CardContentProps {
  specialist: any
  extend?: boolean
  subPage?: boolean
  className?: string
}

const CardContent = ({specialist, extend, subPage, className}: CardContentProps) => {
  const containerClassName = cn('flex gap-5', extend ? 'w-full justify-between items-center sm:flex-col' : 'flex-col', className)

  return (
    <div className={`h-full p-5 space-y-5 rounded-md shadow-mini-card xl:p-3 sm:p-4 ${!subPage ? 'mb-2 sm:mb-5' : ''}`}>
      <div className={containerClassName}>
        <div className={cn('w-full aspect-[7/5] relative rounded-[4px] overflow-hidden', extend ? 'w-[40vw] sm:w-full' : '')}>
          <Image quality={100} className="object-cover" src={urlForImage(specialist.image).url()} alt={specialist.name} fill={true} />
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
      </div>

      {subPage && specialist.caption && <PortableBlock prose={true} value={specialist.caption} />}
    </div>
  )
}

interface SpecialistCardProps {
  specialist: any
  extend?: boolean
  subPage?: boolean
  className?: string
}

const SpecialistCard = ({specialist, extend = false, subPage = false, className}: SpecialistCardProps) => {
  const content = <CardContent specialist={specialist} extend={extend} subPage={subPage} className={className} />

  return subPage ? <>{content}</> : <Link href={`/medicine/specialisty/${specialist.slug.current}`}>{content}</Link>
}

export default SpecialistCard
