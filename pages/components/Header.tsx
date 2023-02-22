import logo_white from '../../public/assets/images/logo.svg'
import logo_black from '../../public/assets/images/logo-black.svg'
import light_svg from '../../public/assets/images/icones/light.svg'
import dark_svg from '../../public/assets/images/icones/dark.svg'
import Image from 'next/image'
import Link from "next/link";
import {useContext, useEffect, useState} from "react";
import { AiOutlineShopping } from "react-icons/ai";
import {useBasket} from "../../src/context/BasketContext";
import ThemeContext from '../../src/context/ThemeContext'


export default function Header() {
    const {basket} = useBasket();

    const themeCtx: { isDarkMode?: boolean; toggleThemeHandler: () => void } = useContext(ThemeContext);

    const [theme_svg, setSvgTheme] = useState(light_svg);
    const [logo_svg, setLogoSvg] = useState(logo_white);

    useEffect(() => {
      console.log(themeCtx.isDarkMode)
    
    }, [themeCtx.isDarkMode]);
    
    
    return (
        <>
            <div className="grid gap-2 sm:justify-items-end justify-items-center items-center mx-auto sm:flex px-10 py-3 relative dark:bg-neutral-800 dark:border-b-neutral-500 dark:border-b shadow-md z-10">
                <Link href={"/"}><Image className={"h-10"} src={logo_svg} alt="BeleFirst"/></Link>
                <div className='flex w-full lg:justify-center sm:justify-end justify-center items-center'>
                    <a href="https://www.facebook.com/belefirst1" className='dark:text-white'>Facebook</a>
                    <a href="https://www.instagram.com/belefirst1" className='dark:text-white ml-8'>Instagram</a>
                </div>
                <div className="flex gap-4">
                    <Link href={"/cart"} className={"flex items-center"}>
                    <span className={"relative"}>
                        {basket.items.length > 0 && (<span
                            className={"absolute flex justify-center items-center top-[-0.5rem] left-3 bg-red-500 text-center rounded-full h-4 w-4 block text-white"}
                            style={{fontSize: 8}}>{basket.totalProduct > 99 ? "99+" : basket.totalProduct}</span>)}
                        <AiOutlineShopping />
                    </span>
                    </Link>
                    <button onClick={themeCtx.toggleThemeHandler}><Image src={theme_svg} alt="Theme"/></button>
                </div>
            </div>
        </>
    )
}
