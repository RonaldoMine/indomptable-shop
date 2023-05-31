import Link from "next/link";
import {useTheme} from "next-themes";
import footer_logo_white from "../../public/assets/images/logo.svg";
import footer_logo_black from "../../public/assets/images/logo-black.svg";
import Image from "next/image";

export default function Footer({lang}: { lang: string }) {
    const {theme} = useTheme();
    const locales_messages = require(`../../public/locales/${lang}/footer.json`);
    const locales_messages_link = require(`../../public/locales/${lang}/link.json`);
    return (
        <footer
            className="grid gap-10 sm:justify-items-end justify-between items-center mx-auto sm:flex px-10 py-20 relative dark:bg-neutral-800 border-t border-t-neutral-200">
            <div>
                <Link href={"/"}>
                    <Image
                        className={"h-10"}
                        src={theme === "dark" ? footer_logo_white : footer_logo_black}
                        alt="Indomptable Logo"
                    />
                </Link>
               <p dangerouslySetInnerHTML={{__html: locales_messages.subtitle}} />
            </div>

            <div className={"grid gap-4 grid-cols-2 sm:grid-cols-3"}>
                <div>
                    <ul>
                       {/* <li>
                            <Link href={"/about-us"}>{locales_messages_link.about}</Link>
                        </li>
                        <li>
                            <Link href={"/"}>{locales_messages_link.policy}</Link>
                        </li>*/}
                        <li>
                            <Link href={"/gallery"}>{locales_messages_link.gallery}</Link>
                        </li>
                        <li>
                            <Link href={"/#contact-us"}>{locales_messages_link.contact}</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li>
                            <Link href={"https://www.facebook.com/profile.php?id=100089070463423"} target={"_blank"}>Facebook</Link>
                        </li>
                        <li>
                            <Link href={"https://www.instagram.com/_1ndomptable/"} target={"_blank"}>Instagram</Link>
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
