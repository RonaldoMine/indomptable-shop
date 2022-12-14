import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Landing.module.css'
import logo from '../public/assets/images/logo.svg'
import shirt_black from '../public/assets/images/tshirt-black-deesktop.webp'
import shirt_white from '../public/assets/images/tshirt-white-desktop.webp'
import light_svg from '../public/assets/images/light.svg'
import dark_svg from '../public/assets/images/dark.svg'
import {useState} from "react";


export default function Home() {
    const [theme, setTheme] = useState("light");
    const [theme_svg, setSvgTheme] = useState(light_svg);
    const [colorTShirt, setColorTShirt] = useState('white');
    const [whiteOptionsView, setWhiteOptionView] = useState({opacity: 1, display: "block"});
    const [blackOptionsView, setBlackOptionView] = useState({opacity: 0, display: "none"});

    const handleChangeTheme = () => {
        if (theme == 'dark') {
            setTheme("light");
            setSvgTheme(light_svg);
            document.documentElement.classList.remove('dark')
        } else {
            setTheme("dark");
            setSvgTheme(dark_svg);
            document.documentElement.classList.add('dark')
        }
    }
    const handleChangeTShirt = (color: string) => {
        if (color === 'white') {
            setWhiteOptionView({display: 'block', opacity: 1})
            setBlackOptionView({display: 'none', opacity: 0})
            setColorTShirt('white')
        } else {
            setWhiteOptionView({display: 'none', opacity: 0})
            setBlackOptionView({display: 'block', opacity: 1})
            setColorTShirt('black')
        }
    }
    return (
        <div
            className={`${theme == 'light' ? styles.wrapper : styles.wrapperDark} w-screen h-screen bg-cover bg-center overflow-x-hidden`}>
            <Head>
                <title>Coming Soon - Indomptable Shop</title>
                <meta name="description" content="Boutique en ligne des indomptables"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className='md:px-32 px-10 py-6 relative z-10'>
                <div className="grid justify-items-center mx-auto sm:flex">
                    <Image src={logo} alt="BeleFirst" className='mb-6'/>
                    <div className='flex w-full justify-center items-center mb-6'>
                        <a href="https://www.facebook.com/belefirst1" className='text-white'>Facebook</a>
                        <a href="https://www.instagram.com/belefirst1" className='text-white ml-8'>Instagram</a>
                    </div>
                    <button
                        className="hidden bg-white transition ease-in dark:bg-neutral-900 dark:border-2 font-medium w-12 h-12 flex justify-center items-center"
                        onClick={handleChangeTheme} style={{borderRadius: "100%"}}>
                        <Image alt={"Thème"} src={theme_svg} width={24} height={24}/></button>
                </div>
                <div className='sm:flex grid justify-center items-center sm:mt-0 mx-auto h-full'>
                    <div className={"grid sm:flex relative justify-center sm:w-screen"}>
                        <div
                            className="md:grid md:mt-0 md:order-1 flex justify-center md:content-center rounded-full mr-5 mb-4 order-2">
                            <button onClick={() => handleChangeTShirt('white')}
                                    className={`w-10 h-10 rounded-full flex justify-center items-center ${colorTShirt === 'white' && styles.item}`}>
                                <div className={`bg-white rounded-full w-2 h-2`}></div>
                            </button>
                            <button onClick={() => handleChangeTShirt('black')}
                                    className={`w-10 h-10 rounded-full flex justify-center items-center mb-2 ${colorTShirt === 'black' && styles.item}`}>
                                <div className={`bg-white rounded-full w-2 h-2`}></div>
                            </button>
                        </div>
                        <div className={"md:order-2 order-1"}>
                            <Image src={shirt_white} alt="Indomptable t-shirt"
                                   className='w-96 sm:w-[26rem] transition transition-all duration-500'
                                   style={{
                                       opacity: `${whiteOptionsView.opacity}`
                                   }}
                            />
                            <Image src={shirt_black} id={"img-2"} alt="Indomptable t-shirt"
                                   className='w-96 sm:w-[26rem] transition transition-all duration-500 md:mt-[-570px] mt-[-500px]'
                                   style={{
                                       opacity: `${blackOptionsView.opacity}`
                                   }}
                            />
                        </div>
                        <div className="my-auto text-white text-center md:text-left order-3">
                            <div
                                style={{
                                    opacity: `${whiteOptionsView.opacity}`,
                                    display: `${whiteOptionsView.display}`
                                }}>
                                <h1 className='text-8xl font-futura font-bold text-white mb-4 md:text-9xl block'>THE <br/> MBOA
                                </h1>
                                <h2 className='text-1xl font-space font-bold'>INDOMPTABLE THE WHITE TEE</h2>
                                <p>Wear proundly our colors, show your identity, <br/> show your worth, show your
                                    continetal
                                    attitude</p>
                            </div>
                            <div
                                style={{
                                    opacity: `${blackOptionsView.opacity}`,
                                    display: `${blackOptionsView.display}`
                                }}>
                                <h1 className='text-8xl font-futura font-bold text-white mb-4 md:text-9xl'>THE <br/> HEMLE
                                </h1>
                                <h2 className='text-1xl font-space font-bold'>INDOMPTABLE THE BLACK TEE</h2>
                                <p>Wear proundly our colors, show your identity, <br/> show your worth, show your
                                    continetal
                                    attitude</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
