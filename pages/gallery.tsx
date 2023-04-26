import React, {Fragment, useState} from "react";
import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import {sanityClient} from "../sanity";
import PageHeader from "../src/components/PageHeader";
import Image from "next/image";
import {Dialog, Transition} from "@headlessui/react";
import {AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineClose} from "react-icons/ai";

function Gallery({peoples}: any) {
    let [isOpen, setIsOpen] = useState(false);
    let [currentImage, setCurrentImage] = useState({img: "", title: "", index: 0, blurUrl: ""});
    const {t} = useTranslation("gallery");

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = ({
                           img,
                           title,
                           index,
                           blurUrl
                       }: { img: string, title: string, index: number, blurUrl: string }) => {
        setIsOpen(true);
        setCurrentImage({img: img, title: title, index: index, blurUrl: blurUrl})
    }
    const handlePreviousPage = () => {
        let currentIndexItem = currentImage.index - 1;
        const item = peoples.find((people: any, index: number) => index === currentIndexItem);
        if (item) {
            setCurrentImage({
                img: item.src.url,
                title: item.title,
                index: currentIndexItem,
                blurUrl: item.src.metadata.lqip,
            });
        }
    }
    const handleNextPage = () => {
        let currentIndexItem = currentImage.index + 1;
        const item = peoples.find((people: any, index: number) => index === currentIndexItem);
        if (item) {
            setCurrentImage({
                img: item.src.url,
                title: item.title,
                index: currentIndexItem,
                blurUrl: item.src.metadata.lqip,
            });
        }
    }

    return (
        <>
            <div className="w-full overflow-x-hidden dark:bg-neutral-800">
                <div className="px-6 py-10 max-w-[75rem] mx-auto">
                    <PageHeader title={t("page-title")}/>
                    <div
                        id="masonry-grid"
                        className="md:columns-3 lg:columns-4 2xl:columns-5 sm:columns-2 gap-10"
                    >
                        {peoples.map((people: { src: any; title: string }, key: number) => {
                            return (
                                <div
                                    key={key}
                                    className={
                                        "md:w-72 w-full mb-2 rounded hover:cursor-pointer"
                                    }
                                    onClick={() =>
                                        openModal(
                                            {
                                                img: people.src.url,
                                                title: people.title,
                                                index: key,
                                                blurUrl: people.src.metadata.lqip
                                            }
                                        )
                                    }
                                >
                                    <Image
                                        src={people.src.url}
                                        alt={people.title}
                                        placeholder="blur"
                                        blurDataURL={people.src.metadata.lqip}
                                        height={people.src.metadata.dimensions.height}
                                        width={people.src.metadata.dimensions.width}
                                        className={
                                            "h-full object-cover rounded duration-100"
                                        }
                                    ></Image>
                                </div>
                            );
                        })}
                    </div>
                </div>
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
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-80"></div>
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
                                        <Image
                                            src={currentImage.img}
                                            alt={currentImage.title}
                                            height={500}
                                            width={400}
                                            placeholder="blur"
                                            blurDataURL={currentImage.blurUrl}
                                            className={"h-[500px] w-full object-cover rounded"}
                                        />
                                    </div>
                                    <div
                                        className={
                                            "w-full flex justify-around sm:justify-evenly mt-2"
                                        }
                                    >
                                        <button
                                            onClick={handlePreviousPage}
                                            className={`w-10 h-10 bg-white bg-opacity-0 hover:bg-opacity-20 focus:bg-opacity-20  transition ease-in-out duration-500 rounded-full z-[99999] ${
                                                currentImage.index > 0 ? "visible" : "invisible"
                                            }`}
                                        >
                                            <AiOutlineArrowLeft className={"mx-auto text-white dark:text-neutral-800"}/>
                                        </button>
                                        <button
                                            onClick={closeModal}
                                            className={
                                                "w-10 h-10 rounded-full bg-red-500 bg-opacity-20 border-red-500 border-2 hover:bg-opacity-100 transition-all duration-500"
                                            }
                                        >

                                            <AiOutlineClose className={"mx-auto text-white dark:text-neutral-800"}/>
                                        </button>
                                        <button
                                            onClick={handleNextPage}
                                            className={`w-10 h-10 bg-white bg-opacity-0 hover:bg-opacity-20 focus:bg-opacity-20 transition ease-in-out duration-500 rounded-full z-[99999] ${
                                                currentImage.index < peoples.length - 1
                                                    ? "visible"
                                                    : "invisible"
                                            }`}
                                        >
                                            <AiOutlineArrowRight className={"mx-auto text-white dark:text-neutral-800"}/>
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

export default Gallery;


export const getServerSideProps: GetServerSideProps = async ({
                                                                 locale,
                                                             }: any) => {
    const query = `*[_type == "people"] | order(_id desc){
    _id,
    title,
        "src": src.asset->{
              url,
        metadata{
          dimensions{
          width,
            height,
            aspectRatio
          },
        lqip
        }
    }
}`;
    const peoples = await sanityClient.fetch(query);
    return {
        props: {
            peoples,
            ...(await serverSideTranslations(locale, ["gallery"])),
        },
    };
};
