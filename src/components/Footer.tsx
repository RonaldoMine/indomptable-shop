import Link from "next/link";
import {useTheme} from "next-themes";
import footer_logo_white from "../../public/assets/images/logo.svg";
import footer_logo_black from "../../public/assets/images/logo-black.svg";
import Image from "next/image";

export default function Footer() {
    const {theme} = useTheme();
    return (
        <footer
            className="container grid gap-10 sm:justify-items-end justify-between items-center mx-auto sm:flex px-10 py-20 relative dark:bg-neutral-800 border-t border-t-neutral-200">
            <div>
                <Link href={"/"}>
                    <Image
                        className={"h-10"}
                        src={theme === "dark" ? footer_logo_white : footer_logo_black}
                        alt="Indomptable Logo"
                    />
                </Link>
               <p>A brand with a purpose, strong values <br/> drive with passion</p>
            </div>

            <div className={"grid gap-4 grid-cols-2 sm:grid-cols-3"}>
                <div>
                    <ul>
                        <li>
                            <Link href={"/gallery"}>Gallery</Link>
                        </li>
                        <li>
                            <Link href={"/#contact-us"}>About Us</Link>
                        </li>
                        <li>
                            <Link href={"/"}>Refund policy</Link>
                        </li>
                        <li>
                            <Link href={"/"}>Contact-us</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li>
                            <Link href={"/"}>Facebook</Link>
                        </li>
                        <li>
                            <Link href={"/"}>Instagram</Link>
                        </li>
                        <li>
                            <Link href={"/"}>TikTok</Link>
                        </li>
                    </ul>
                </div>
                <div className={"flex items-center justify-center col-span-2 sm:col-span-1"}>
                    @ 2022, Indomptable
                </div>
            </div>
        </footer>
    );
}
