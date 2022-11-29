import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Landing.module.css'
import logo from '../public/assets/images/belefirst_logo.svg'
import facebook from '../public/assets/images/facebook.svg'
import instagram from '../public/assets/images/instagram.svg'
import shirt from '../public/assets/images/tshirtblack.png'


export default function Home() {
  return (
    <div className={`${styles.wrapper} w-screen h-screen bg-cover bg-center overflow-hidden`}>
      <Head>
        <title>Coming Soon - Indomptable Shop</title>
        <meta name="description" content="Boutique en ligne des indomptables" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='px-7 py-6'>
        <Image src={logo} alt="BeleFirst" className='mb-3'/>
        {/* <h1 className='text-6xl font-black mix-blend-overlay'>
          INDOMPTABLE
        </h1> */}
        <div>
          <Image src={shirt} alt="Indomptable t-shirt" className='mt-8 sm:mt-0 w-96 sm:w-[26rem] mx-auto'/>
        </div>
        <footer className='w-max flex items-center fixed -translate-x-1/2 left-1/2 bottom-16'>
          <h3 className='text-4xl font-futura'>Follow us</h3>
          <a href="https://www.facebook.com/belefirst1"><Image src={facebook} alt="Facebook" className='w-12 ml-8' /></a>
          <a href="https://www.instagram.com/belefirst1"><Image src={instagram} alt="Instagram" className='w-14 ml-2' /></a>
          
        </footer>
      </main>
    </div>
  )
}
