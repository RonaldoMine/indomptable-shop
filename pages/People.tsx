import React, {Fragment, useState} from "react";
import OnePeople from "./components/OnePeople";
import people1 from "../public/assets/images/people/people1.jpg"
import people2 from "../public/assets/images/people/people2.jpg"
import people3 from "../public/assets/images/people/people3.jpg"
import people4 from "../public/assets/images/people/people4.jpg"
import people5 from "../public/assets/images/people/people5.jpg"
import people6 from "../public/assets/images/people/people6.jpg"
import people7 from "../public/assets/images/people/people7.jpg"
import people8 from "../public/assets/images/people/people8.jpg"
import people9 from "../public/assets/images/people/people9.jpg"
import people10 from "../public/assets/images/people/people10.jpg"
import {Dialog, Transition} from "@headlessui/react";
import Image from "next/image";
import {StaticImageData} from "next/dist/client/image";

export default function People() {
    let [isOpen, setIsOpen] = useState(false)
    let [currentImage, setCurrentImage] = useState({img: people1, title: "", index: 0})
    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = (img: StaticImageData, title: string, index: number) => {
        setIsOpen(true);
        setCurrentImage({img: img, title: title, index: index})
    }
    const handlePreviousPage = () => {
        let currentIndexitem = currentImage.index - 1;
        const item = peoples.find((people, index) => index === currentIndexitem);
        if (item) {
            setCurrentImage({img: item.img, title: item.title, index: currentIndexitem})
        }
    }
    const handleNextPage = () => {
        let currentIndexitem = currentImage.index + 1;
        const item = peoples.find((people, index) => index === currentIndexitem);
        if (item) {
            setCurrentImage({img: item.img, title: item.title, index: currentIndexitem})
        }
    }


    let peoples = [
        {
            title: "People 1",
            img: people1
        },
        {
            title: "People 2",
            img: people2
        },
        {
            title: "People 3",
            img: people3
        },
        {
            title: "People 4",
            img: people4
        },
        {
            title: "People 5",
            img: people5
        },
        {
            title: "People 6",
            img: people6
        },
        {
            title: "People 7",
            img: people7
        },
        {
            title: "People 8",
            img: people8
        },
        {
            title: "People 9",
            img: people9
        },
        {
            title: "People 10",
            img: people10
        }
    ];
    return (
        <>
            <div
                className="p-4 grid justify-items-center 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 grid-cols-1">
                {peoples.map((people, key) => {
                    return <OnePeople onClick={() => openModal(people.img, people.title, key)} key={key}
                                      img={people.img}
                                      title={people.title}/>
                })}
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-[9999]" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-80">
                        </div>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <div>
                                    <div>
                                        <Image src={currentImage.img} alt={currentImage.title}
                                               className={"h-[500px] w-[400px] object-cover rounded"}/>
                                    </div>
                                    <div className={"w-full flex justify-around sm:justify-between mt-2"}>
                                        <button onClick={handlePreviousPage}
                                                className={`bg-white bg-opacity-0 hover:bg-opacity-20 focus:bg-opacity-20  transition ease-in-out duration-500 rounded-full z-[99999] p-4 ${currentImage.index > 0 ? "visible" : "invisible"}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                                 viewBox="0 0 24 24"
                                                 className={"fill-white"}>
                                                <path
                                                    d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z"></path>
                                            </svg>
                                        </button>
                                        <button onClick={closeModal}
                                                className={"p-4 rounded-full bg-red-500 bg-opacity-20 border-red-500 border-2 hover:bg-opacity-100 transition-all duration-500"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 viewBox="0 0 24 24" className={"fill-white"}>
                                                <path
                                                    d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
                                            </svg>
                                        </button>
                                        <button onClick={handleNextPage}
                                                className={`bg-white bg-opacity-0 hover:bg-opacity-20 focus:bg-opacity-20 transition ease-in-out duration-500 rounded-full z-[99999] p-4  ${currentImage.index < (peoples.length - 1) ? "visible" : "invisible"}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                                 viewBox="0 0 24 24"
                                                 className={"fill-white"}>
                                                <path
                                                    d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>

    );

}
