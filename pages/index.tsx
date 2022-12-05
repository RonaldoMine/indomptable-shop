import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Landing.module.css'
import logo from '../public/assets/images/belefirst_logo.svg'
import facebook from '../public/assets/images/facebook.svg'
import instagram from '../public/assets/images/instagram.svg'
import shirt_black from '../public/assets/images/tshirtblack.png'
import shirt_white from '../public/assets/images/tshirtwhite.png'
import light_svg from '../public/assets/images/light.svg'
import dark_svg from '../public/assets/images/dark.svg'
import {useState} from "react";


export default function Home() {
    const [theme, setTheme] = useState("light");
    const [theme_svg, setSvgTheme] = useState(light_svg);
    const [teeShirt, setTeeshirt] = useState(shirt_white);

    const handleChangeTheme = () => {
        if (theme === "light") {
            setTheme("dark");
            setTeeshirt(shirt_black);
            setSvgTheme(dark_svg);
            document.documentElement.classList.add('dark')
        } else {
            setTheme("light");
            setTeeshirt(shirt_white);
            setSvgTheme(light_svg);
            document.documentElement.classList.remove('dark')
        }
    }
    return (
        <div className={`${styles.wrapper} w-screen h-screen bg-cover bg-center overflow-x-hidden`}>
            <Head>
                <title>Coming Soon - Indomptable Shop</title>
                <meta name="description" content="Boutique en ligne des indomptables"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className='px-7 py-6 relative z-10'>
                <div className="flex justify-between">
                    <Image src={logo} alt="BeleFirst" className='mb-3'/>
                    <button
                        className="rounded-full bg-white transition ease-in dark:bg-neutral-900 dark:border-2 font-medium p-4"
                        onClick={handleChangeTheme}>
                        <Image alt={"Thème"} src={theme_svg}/></button>
                </div>
                <div>
                    <Image src={teeShirt} alt="Indomptable t-shirt" className='mt-8 sm:mt-0 w-96 sm:w-[26rem] mx-auto'/>
                </div>
                <footer className='w-full justify-center flex items-center bottom-16 mt-5'>
                    <h3 className='text-4xl font-futura text-white dark:text-black'>Follow us</h3>
                    <a href="https://www.facebook.com/belefirst1"><Image src={facebook} alt="Facebook"
                                                                         className='w-12 ml-8'/></a>
                    <a href="https://www.instagram.com/belefirst1"><Image src={instagram} alt="Instagram"
                                                                          className='w-14 ml-2'/></a>
                </footer>
            </main>
            <h1 className='sm:opacity-100 md:text-9xl opacity-0 italic font-black mix-blend-overlay absolute z-0 top-1/2 left-0 text-center right-0'>
                INDOMPTABLE
            </h1>
        </div>
    )
}
