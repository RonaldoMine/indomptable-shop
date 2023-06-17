import {Popover, Transition} from '@headlessui/react'
import {Fragment} from 'react'
import {AiOutlineMenu, AiOutlinePicture, AiOutlineShop, AiOutlineMessage, AiOutlineClose} from "react-icons/ai";
import {BsPeople} from "react-icons/bs";
import {useRouter} from "next/router";

export default function HamburgerMenu({locales_messages}: { locales_messages: { shop: string, gallery: string, about: string, contact: string } }) {
    const router = useRouter();

    const handleGoToAboutUs = () => {
        const contactUs = document.getElementById("contact-us");
        if (contactUs) {
            contactUs.scrollIntoView({behavior: "smooth", block: "center"});
        } else {
            router.push("/").then(() => {
                const contactUs = document.getElementById("contact-us");
                contactUs?.scrollIntoView({behavior: "auto", block: "center"});
            })
        }
    }

    const menus = [
        {
            name: locales_messages.shop,
            onClick: () => router.push("shopping"),
            icon: <AiOutlineShop className={"fill-neutral-800 dark:fill-white"}/>
        },
        {
            name: locales_messages.gallery,
            onClick: () => router.push("/gallery"),
            icon: <AiOutlinePicture className={"fill-neutral-800 dark:fill-white"}/>
        },
        {
            name: locales_messages.about,
            onClick: () => router.push("/about"),
            icon: <BsPeople className={"fill-neutral-800 dark:fill-white"}/>
        },
        {
            name: locales_messages.contact,
            onClick: handleGoToAboutUs,
            icon: <AiOutlineMessage className={"fill-neutral-800 dark:fill-white"}/>
        },
    ]
    return (
        <div className="px-4 md:hidden">
            <Popover className="relative">
                {({open, close}) => (
                    <>
                        <Popover.Button
                            className={`
                group inline-flex items-center rounded-md px-3 py-2 text-base font-medium hover:text-opacity-100 focus:outline-none`}
                        >
                            {open ? <AiOutlineClose size={"1.90rem"}/> : <AiOutlineMenu size={"1.90rem"}/>}
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-300"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel
                                className="absolute z-[999] mt-1 right-0 transform px-2 sm:px-0 w-64">
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div
                                        className="relative grid gap-8 bg-white dark:bg-neutral-700 p-7 lg:grid-cols-2">
                                        {menus.map((item) => (
                                            <div
                                                key={item.name}
                                                onClick={() => {
                                                    close();
                                                    item.onClick()
                                                }}
                                                className="hover:cursor-pointer -m-3 flex items-center rounded-lg transition duration-150 ease-in-out hover:bg-gray-50 dark:hover:bg-opacity-10 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                            >
                                                <div
                                                    className="flex h-10 w-10 shrink-0 items-center justify-center sm:h-12 sm:w-12">
                                                    {item.icon}
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm font-medium">
                                                        {item.name}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    )
}
