import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import {AiFillHeart, AiOutlineShopping} from "react-icons/ai";
import {useBasket} from "../context/BasketContext";
import {
    HiOutlineMoon,
    HiOutlineSun,
} from "react-icons/hi";
import {useTheme} from "next-themes";
import {useRouter} from "next/router";
import logo from "../../public/assets/images/logo.svg";
import useProductToFavorite from "../hooks/useProductToFavorite";

export default function Header({lang}: { lang: string }) {
    const {basket} = useBasket();
    const {totalFavoriteProduct} = useProductToFavorite();
    const {theme, setTheme} = useTheme();
    const router = useRouter();
    const {locale: currentLocale} = useRouter();
    const {pathname, asPath, query} = router;
    const [mounted, setMounted] = useState(false);
    const locales_messages = require(`../../public/locales/${lang}/link.json`);

    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) return null;

    return (
        <>
            <div
                className="grid gap-2 sm:justify-items-end justify-items-center items-center mx-auto sm:flex px-10 py-3 relative dark:bg-neutral-800 dark:border-b-neutral-500 dark:border-b shadow-md z-10">
                <Link href={"/"}>
                    <Image
                        className={"h-8"}
                        src={logo}
                        alt="Indomptable"
                    />
                </Link>
                <div
                    className="flex gap-8 w-full lg:justify-center justify-center items-center sm:mb-0 sm:mt-0 mb-2 mt-2">
                    <Link
                        href="/shopping"
                        className={`dark:text-white ${pathname === "/shopping" ? "border-b-2" : ""}`}
                    >
                        {locales_messages.shop}
                    </Link>
                    <Link
                        href="/gallery"
                        className={`dark:text-white ${pathname === "/gallery" ? "border-b-2" : ""}`}
                    >
                        {locales_messages.gallery}
                    </Link>
                    <Link
                        href="/about"
                        className={`dark:text-white ${pathname === "/about" ? "border-b" : ""}`}
                    >
                        {locales_messages.about}
                    </Link>
                    <button onClick={() => {
                        const contactUs = document.getElementById("contact-us");
                        if (contactUs) {
                            contactUs.scrollIntoView({behavior: "smooth", block: "center"});
                        } else {
                            router.push("/").then(() => {
                                const contactUs = document.getElementById("contact-us");
                                contactUs?.scrollIntoView({behavior: "auto", block: "center"});
                            })
                        }
                    }}>{locales_messages.contact}</button>
                </div>
                <div className="flex gap-4">
                    <button className="border rounded-2xl w-10 px-2 gap-1 text-center"
                            onClick={() => {
                                router.push({pathname, query}, asPath, {
                                    locale: currentLocale === "en" ? "fr" : "en",
                                });
                            }}
                            style={{
                                borderColor: '#747474'
                            }}
                    > {currentLocale}
                    </button>
                    <Link href={"/cart"}
                          className={`flex items-center dark:text-white ${pathname === "/cart" || pathname === "/checkout" ? "border-b-2" : ""}`}>
                        <span className={"relative"}>
                          {basket.items.length > 0 && (
                              <span
                                  className={
                                      "absolute flex justify-center items-center top-[-0.5rem] left-3 bg-red-500 text-center rounded-full h-4 w-4 text-white"
                                  }
                                  style={{fontSize: 8}}
                              >
                              {basket.totalProduct > 99 ? "99+" : basket.totalProduct}
                            </span>
                          )}
                            <AiOutlineShopping/>
                        </span>
                    </Link>
                    <Link href={"/favorite"}
                          className={`flex items-center dark:text-white ${pathname === "/favorite" ? "border-b-2" : ""}`}>
                        <span className={"relative"}>
                          {totalFavoriteProduct > 0 && (
                              <span
                                  className={
                                      "absolute flex justify-center items-center top-[-0.5rem] left-3 bg-red-500 text-center rounded-full h-4 w-4 text-white"
                                  }
                                  style={{fontSize: 8}}
                              >
                              {totalFavoriteProduct > 99 ? "99+" : totalFavoriteProduct}
                            </span>
                          )}
                            <AiFillHeart/>
                        </span>
                    </Link>
                    <button
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    >
                        {theme === "light" ? <HiOutlineSun/> : <HiOutlineMoon/>}
                    </button>
                </div>
            </div>
        </>
    );
}
