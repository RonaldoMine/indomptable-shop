import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Landing.module.css'
import logo from '../public/assets/images/logo.svg'
import shirt_black from '../public/assets/images/tshirt-black-desktop.png'
import shirt_white from '../public/assets/images/tshirt-white-desktop.png'
import {useState} from "react";


export default function Home() {
    const [colorTShirt, setColorTShirt] = useState('white');
    const [whiteOptionsView, setWhiteOptionView] = useState({opacity: 1, display: "block"});
    const [blackOptionsView, setBlackOptionView] = useState({opacity: 0, display: "none"});

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
            className={`${styles.wrapper} w-screen md:h-screen h-full bg-cover bg-center overflow-x-hidden`}>
            <Head>
                <title>Coming Soon - Indomptable Shop</title>
                <meta name="description" content="Boutique en ligne des indomptables"/>
                <link rel="icon" href="/assets/images/logo.svg"/>
            </Head>

            <main className='md:px-32 px-10 py-6 relative z-10'>
                <div className="grid sm:justify-items-end justify-items-center mx-auto sm:flex">
                    <Image src={logo} alt="BeleFirst" className='mb-6'/>
                    <div className='flex w-full lg:justify-center sm:justify-end justify-center items-center mb-6'>
                        <a href="https://www.facebook.com/belefirst1" className='text-white'>Facebook</a>
                        <a href="https://www.instagram.com/belefirst1" className='text-white ml-8'>Instagram</a>
                    </div>
                </div>
                <div className='sm:flex grid justify-center items-center sm:mt-0 mx-auto h-full'>
                    <div className={"grid md:flex relative justify-center items-center sm:w-screen"}>
                        <div className="md:grid md:mt-0 md:order-1 flex justify-center md:content-center rounded-full mr-5 mb-4 order-2 z-10">
                            <button onClick={() => handleChangeTShirt('white')}
                                    className={`w-10 h-10 rounded-full flex justify-center items-center ml-2 mr-2 ${colorTShirt === 'white' && styles.item}`}>
                                <div className={`bg-white rounded-full w-2 h-2`}></div>
                            </button>
                            <button onClick={() => handleChangeTShirt('black')}
                                    className={`w-10 h-10 rounded-full flex justify-center items-center ml-2 mr-2 mb-2 ${colorTShirt === 'black' && styles.item}`}>
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
                            <Image src={shirt_black} alt="Indomptable t-shirt"
                                   className='w-96 sm:w-[26rem] transition transition-all duration-500 mt-[-165%] z-0'
                                   style={{
                                       opacity: `${blackOptionsView.opacity}`
                                   }}
                            />
                        </div>
                        <div className="text-white text-center md:text-left order-3 mb-4 ml-5">
                            <div
                                style={{
                                    opacity: `${whiteOptionsView.opacity}`,
                                    display: `${whiteOptionsView.display}`
                                }}>
                                <h1 className='text-8xl font-futura font-bold text-white mb-4 md:text-7xl lg:text-9xl block'>THE <br/> MBOA
                                </h1>
                                <h2 className='text-1xl font-space font-bold'>INDOMPTABLE THE WHITE TEE</h2>
                                <p>Wear proundly our colors, show your identity, <br/> show your worth, show your
                                    continental
                                    attitude</p>
                            </div>
                            <div
                                style={{
                                    opacity: `${blackOptionsView.opacity}`,
                                    display: `${blackOptionsView.display}`
                                }}>
                                <h1 className='text-8xl font-futura font-bold text-white mb-4 md:text-7xl lg:text-9xl'>THE <br/> HEMLE
                                </h1>
                                <h2 className='text-1xl font-space font-bold'>INDOMPTABLE THE BLACK TEE</h2>
                                <p>Wear proundly our colors, show your identity, <br/> show your worth, show your
                                    continental
                                    attitude</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
