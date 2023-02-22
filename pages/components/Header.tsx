import logo_white from "../../public/assets/images/logo.svg";
import logo_black from "../../public/assets/images/logo-black.svg";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { useBasket } from "../../src/context/BasketContext";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { useTheme } from "next-themes";

export default function Header() {
  const { basket } = useBasket();

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <>
      <div className="grid gap-2 sm:justify-items-end justify-items-center items-center mx-auto sm:flex px-10 py-3 relative dark:bg-neutral-800 dark:border-b-neutral-500 dark:border-b shadow-md z-10">
        <Link href={"/"}>
          <Image
            className={"h-10"}
            src={theme === "dark" ? logo_white : logo_black}
            alt="BeleFirst"
          />
        </Link>
        <div className="flex w-full lg:justify-center sm:justify-end justify-center items-center">
          <a
            href="https://www.facebook.com/belefirst1"
            className="dark:text-white"
          >
            Facebook
          </a>
          <a
            href="https://www.instagram.com/belefirst1"
            className="dark:text-white ml-8"
          >
            Instagram
          </a>
        </div>
        <div className="flex gap-4">
          <Link href={"/cart"} className={"flex items-center dark:text-white"}>
            <span className={"relative"}>
              {basket.items.length > 0 && (
                <span
                  className={
                    "absolute flex justify-center items-center top-[-0.5rem] left-3 bg-red-500 text-center rounded-full h-4 w-4 block text-white"
                  }
                  style={{ fontSize: 8 }}
                >
                  {basket.totalProduct > 99 ? "99+" : basket.totalProduct}
                </span>
              )}
              <AiOutlineShopping />
            </span>
          </Link>
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <HiOutlineSun />
            ) : (
              <HiOutlineMoon color="white" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
