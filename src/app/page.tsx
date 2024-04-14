import Stocks from '##/index/Stocks'
import Programs from '##/index/Programs'

export default function Home() {
  return (
    <>
      <Stocks classes="w-full h-[65vh] sm:!h-[100svh] sm:h-[100vh]" />
      <main className="w-[70%] sm:w-[90%] mx-auto">
        <Programs />
      </main>
    </>
  )
}
