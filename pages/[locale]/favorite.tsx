import React from "react";
import Image from "next/image";
import {HiOutlineExternalLink, HiX} from "react-icons/hi";
import Link from "next/link";
import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import useProductToFavorite from "../../src/hooks/useProductToFavorite";

function Favorite() {
    const {favorites, removeProductToFavorite} = useProductToFavorite();
    const {t} = useTranslation("favorite")

    return (
        <div className="w-full overflow-x-hidden dark:bg-neutral-800">
            <main className="px-6 py-10 max-w-[75rem] mx-auto">
                <h1 className="text-3xl font-bold dark:text-neutral-100 text-center sm:text-left">
                    {t("title")}
                </h1>
                <hr className="my-6"/>
                <div
                    id="favorite-content"
                    className="grid grid-cols-1 gap-4 md:grid-cols-4 sm:grid-cols-2"
                >
                    {favorites?.length > 0 ? (
                        favorites.map((favorite: any, idx: number) => {
                            return (
                                <div
                                    key={idx}
                                    id="card"
                                    className="border border-slate-200 dark:border-neutral-600 shadow-md"
                                >
                                    <div className="relative">
                                        <button onClick={() => removeProductToFavorite(favorite)}
                                                className="p-2 rounded-full text-white bg-soft-orange mb-2 absolute top-2 left-2 checkout">
                                            <Link href={`/category/${favorite.category}/${favorite.sku}`}>
                                                <HiOutlineExternalLink/>
                                            </Link>
                                        </button>
                                        <button onClick={() => removeProductToFavorite(favorite)}
                                                className="p-2 rounded-full text-red mb-2 absolute top-2 right-2">
                                            <HiX/>
                                        </button>
                                        <Image
                                            src={favorite.img}
                                            className="h-[200px] w-full object-contain"
                                            height={100}
                                            width={100}
                                            alt={favorite.name}
                                            priority
                                        />
                                        <div>
                                            <div className={"p-5 text-center"}>
                                                <h2 className="text-lg dark:text-neutral-200 font-bold">
                                                    {favorite.name}
                                                </h2>
                                                <p className="font-medium dark:text-neutral-300">
                                                    XAF {favorite.price}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className={"col-span-4"}>
                            {t("empty-list")},{" "}
                            <Link href={"/"} className="underline">
                                {t("back-to-home")}
                            </Link>
                        </p>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Favorite;

const getServerSideProps: GetServerSideProps = async ({locale}: any) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["favorite"])),
        },
    };
}
