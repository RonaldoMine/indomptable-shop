import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineShopping } from "react-icons/ai";
import { useBasket } from "../context/BasketContext";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import logo from "../../public/assets/images/logo.svg";
import useProductToFavorite from "../hooks/useProductToFavorite";
import HamburgerMenu from "./HamburgerMenu";
import { useHeaderVisible } from "../hooks/useHeaderVisible";

export default function Header({ lang }: { lang: string }) {
  const { basket } = useBasket();
  const { totalFavoriteProduct } = useProductToFavorite();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { locale: currentLocale } = useRouter();
  const { pathname, asPath, query } = router;
  const [mounted, setMounted] = useState(false);
  const visible = useHeaderVisible();
  const locales_messages = require(`../../public/locales/${lang}/link.json`);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <>
      <header
        className={`sticky ${
          visible ? "top-0" : "-top-32 md:-top-20"
        } z-50 duration-150 transition-[top] delay-500 bg-white dark:bg-neutral-800 dark:border-b-neutral-500 dark:border-b shadow-md`}
      >
        <div className="max-w-7xl mx-auto grid gap-2 justify-items-center md:justify-items-end md:flex px-4 sm:px-10  relative z-10">
          <div className="flex justify-between w-full md:w-auto border-b border-gray-100 md:border-0 dark:border-neutral-600 pb-2 sm:pb-0">
            <Link href={"/"} className="py-3">
              <Image className={"h-8 w-24"} src={logo} alt="Indomptable" />
            </Link>
            <HamburgerMenu locales_messages={locales_messages} />
          </div>
          <div className="hidden md:flex gap-8 w-full justify-center sm:mb-0 sm:mt-0">
            <Link
              href="/shopping"
              className={`dark:text-white dark:border-neutral-400 pt-3.5 ${
                pathname === "/shopping" ? "border-b-2 border-neutral-600" : ""
              }`}
            >
              {locales_messages.shop}
            </Link>
            <Link
              href="/gallery"
              className={`dark:text-white dark:border-neutral-400 pt-3.5 ${
                pathname === "/gallery" ? "border-b-2 border-neutral-600" : ""
              }`}
            >
              {locales_messages.gallery}
            </Link>
            <Link
              href="/about"
              className={`dark:text-white dark:border-neutral-400 pt-3.5 ${
                pathname === "/about" ? "border-b-2 border-neutral-600" : ""
              }`}
            >
              {locales_messages.about}
            </Link>
            <Link
              href={"/#contact-us"}
              className="pt-3.5"
              title={locales_messages.contact}
            >
              {locales_messages.contact}
            </Link>
          </div>
          <div className="flex justify-between items-center gap-4 mb-2">
            <button
              title={currentLocale}
              className="border rounded-2xl w-10 px-2 gap-1 text-center"
              onClick={() => {
                router.push({ pathname, query }, asPath, {
                  locale: currentLocale === "en" ? "fr" : "en",
                });
              }}
              style={{
                borderColor: "#747474",
              }}
            >
              {" "}
              {currentLocale}
            </button>
            <Link
              href={"/cart"}
              title={"Checkout"}
              className={`flex items-center dark:text-white ${
                pathname === "/cart" || pathname === "/checkout"
                  ? "border-b-2"
                  : ""
              }`}
            >
              <span className={"relative"}>
                {basket.items.length > 0 && (
                  <span
                    className={
                      "absolute flex justify-center items-center top-[-0.5rem] left-3 bg-red-500 text-center rounded-full h-4 w-4 text-white"
                    }
                    style={{ fontSize: 8 }}
                  >
                    {basket.totalProduct > 99 ? "99+" : basket.totalProduct}
                  </span>
                )}
                <AiOutlineShopping />
              </span>
            </Link>
            <Link
              href={"/favorite"}
              title={"Favorite"}
              className={`flex items-center dark:text-white ${
                pathname === "/favorite" ? "border-b-2" : ""
              }`}
            >
              <span className={"relative"}>
                {totalFavoriteProduct > 0 && (
                  <span
                    className={
                      "absolute flex justify-center items-center top-[-0.5rem] left-3 bg-red-500 text-center rounded-full h-4 w-4 text-white"
                    }
                    style={{ fontSize: 8 }}
                  >
                    {totalFavoriteProduct > 99 ? "99+" : totalFavoriteProduct}
                  </span>
                )}
                <AiFillHeart />
              </span>
            </Link>
            <button
              title={"Theme"}
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <HiOutlineSun /> : <HiOutlineMoon />}
            </button>
          </div>
        </div>
      </header>
      <p className={`p-3 bg-orange text-center text-xs z-50`}>
        {locales_messages["orange-banner"].text},{" "}
        <Link href="/shopping" className="underline">
          {locales_messages["orange-banner"].link}
        </Link>
        .
      </p>
    </>
  );
}
