import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='w-full h-screen bg-black'>
      <Head>
        <title>Coming Soon - Indomptable Shop</title>
        <meta name="description" content="Boutique en ligne des indomptables" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='text-white text-center absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2'>
          <h1 className="text-9xl font-bold mx-auto text-center self-center text-white">
          INDOMPTABLE
        </h1>
        <p className='mt-3 text-3xl'>Coming Soon...</p>
      </main>
    </div>
  )
}
