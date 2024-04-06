import Link from 'next/link'

import Programs from '@/components/Programs'

export default function Program() {
  return (
    <>
      <Link prefetch={false} href={'/'} className="duration-200 block w-fit mt-5 mx-auto hover:text-custom-teal">
        На главную
      </Link>
      <Programs />
    </>
  )
}
