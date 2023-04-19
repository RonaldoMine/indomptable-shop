import {AiFillHeart} from "react-icons/ai";
import {urlFor} from "../../sanity";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {toast} from "react-toastify";

export default function ToastAddProductToFavorite({
                                                      product,
                                                      visible,
                                                      setVisible
                                                  }: { product: any, visible: boolean, setVisible: (visible: boolean) => void }) {
    const {t} = useTranslation("favorite");
    const [favorites, setFavorites] = useState([]);
    const toastProduct = () => {
        const favorite = favorites?.find((favorite: any) => favorite.sku = product.sku);
        if (favorites.length > 0 && favorite) {
            toast("Ce produit a déjà été ajouté dans les favories", {
                progressClassName: "bg-gradient",
            })
        } else {
            localStorage.setItem("favorites", JSON.stringify([...favorites, {sku: product.sku, name: product.name}]))
            toast(<div className="dark:bg-neutral-800">
                <div className="flex gap-2 items-center justify-center mb-2">
                    <h3>{t("toast.title")}</h3>
                    <AiFillHeart className={"fill-orange-500 mr-3"}/>
                </div>
                <div className="text-center mb-6">
                    <img
                        className="w-32 h-32 object-cover mx-auto"
                        src={urlFor(product?.coverThumbnail).url()}
                        alt={product?.name}
                    />
                    <div className={"grid items-center"}>
                        <p className={"font-bold text-slate-700 dark:text-neutral-200"}>
                            {product?.name}
                        </p>
                    </div>
                </div>
            </div>, {
                progressClassName: "bg-gradient",
                className: "w-full dark:bg-neutral-800",
                autoClose: 2000,
                closeButton: false,
                closeOnClick: false,
                onClose: () => setVisible(false),
            });
        }
    }
    useEffect(() => {
        if (visible) toastProduct()
        console.log(visible)
    }, [visible])

    useEffect(() => {
        setFavorites(JSON.parse(localStorage.getItem("favorites") ?? '{}'));
    }, [])
    return (
        <div
            className={`transition-all fixed inset-0 bg-neutral-500 bg-opacity-70 z-10 ${!visible && 'invisible'}`}></div>
    );
}
