import Link from "next/link";
import logo from "../../public/assets/images/logo.svg";
import Image from "next/image";
import {useRouter} from "next/router";

export default function Footer({lang}: { lang: string }) {
    const router = useRouter();
    const locales_messages = require(`../../public/locales/${lang}/footer.json`);
    const locales_messages_link = require(`../../public/locales/${lang}/link.json`);

    const handleGoToAboutUs = () => {
        const contactUs = document.getElementById("contact-us");
        if (contactUs) {
            contactUs.scrollIntoView({behavior: "smooth", block: "center"});
        } else {
            router.push("/").then(() => {
                const contactUs = document.getElementById("contact-us");
                contactUs?.scrollIntoView({behavior: "smooth", block: "end"});
            })
        }
    }

    return (
        <footer className="px-10 py-20 relative dark:bg-neutral-800 border-t border-t-neutral-200">
            <div className="max-w-5xl mx-auto grid gap-10 md:flex">
                <div>
                    <Link href={"/"}>
                        <Image
                            className={"h-16 w-24 pb-3"}
                            src={logo}
                            alt="Indomptable Logo"
                        />
                    </Link>
                    <p
                        dangerouslySetInnerHTML={{__html: locales_messages.subtitle}}
                    />
                </div>

                <div className={"grid gap-4 grid-cols-2 sm:grid-cols-3"}>
                    <div>
                        <ul>
                            <li>
                                <Link href={"/about"}>{locales_messages_link.about}</Link>
                            </li>
                            {/* <li>
                            <Link href={"/"}>{locales_messages_link.policy}</Link>
                        </li> */}
                            <li>
                                <Link href={"/gallery"}>{locales_messages_link.gallery}</Link>
                            </li>
                            <li>
                                <button
                                    className="text-left"
                                    onClick={handleGoToAboutUs}
                                >
                                    {locales_messages_link.contact}
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>
                                <Link
                                    href={
                                        "https://www.facebook.com/profile.php?id=100089070463423"
                                    }
                                    target={"_blank"}
                                >
                                    Facebook
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"https://www.instagram.com/_1ndomptable/"}
                                    target={"_blank"}
                                >
                                    Instagram
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={"col-span-2 sm:col-span-1"}>
                        @ 2022, Indomptable
                    </div>
                </div>
            </div>
        </footer>
    );
}
