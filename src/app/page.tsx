import Link from 'next/link'

import Stocks from '@/components/Stocks'

export default function Home() {
  return (
    <>
      <Link prefetch={false} href={'/program/'} className="duration-200 block w-fit mt-5 mx-auto hover:text-custom-teal">
        К программам
      </Link>
      <Stocks />
    </>
  )
}
