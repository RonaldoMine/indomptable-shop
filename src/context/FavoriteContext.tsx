import React, {createContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import Image from "next/image";
import {useTranslation} from "react-i18next";

interface FavoriteProductDetail {
    sku: string,
    name: string,
    img: string,
    price: number,
    category: string
}

const FavoriteContext = createContext<{
    favorites: FavoriteProductDetail[],
    addProductToFavorite: (elt: FavoriteProductDetail) => void,
    removeProductToFavorite: (elt: FavoriteProductDetail) => void,
    totalFavoriteProduct: number
}>({
    favorites: [],
    addProductToFavorite: (elt: FavoriteProductDetail) => {
    },
    removeProductToFavorite: (elt: FavoriteProductDetail) => {
    },
    totalFavoriteProduct: 0
});


const FavoriteContextProvider = ({children}: { children: React.ReactNode }) => {
    const {t} = useTranslation("favorite");
    const [favorites, setFavorites] = useState<FavoriteProductDetail[]>([]);
    const addProductToFavorite = (product: FavoriteProductDetail) => {
        const favorite = favorites.find((favorite: FavoriteProductDetail) => favorite.sku == product.sku);
        if (favorites.length > 0 && favorite) {
            toast(<span>{t('toast.product-exist')}</span>, {
                progressClassName: "bg-gradient",
                className: "w-full dark:bg-neutral-600 dark:text-white",
                closeButton: false,
                autoClose: 3000,
            })
        } else {
            const newFavorites = [...favorites, {
                sku: product.sku,
                name: product.name,
                img: product.img,
                price: product.price,
                category: "t-shirt"
            }];
            setFavorites(newFavorites);
            localStorage.setItem("favorites", JSON.stringify(newFavorites))
            toast(<div className={'flex items-center'}>
                <Image className={"h-[70px] w-10 object-cover"} width={80} height={80}
                       src={product.img}
                       alt={product.name}/>
                <div className={'dark:text-white p-2'}>
                    <b>{product.name}</b> <span>{t('toast.product-added')}</span>
                </div>
            </div>, {
                progressClassName: "bg-gradient",
                className: "w-full dark:bg-neutral-600",
                closeButton: false,
                autoClose: 3000
            });
        }
    }

    const removeProductToFavorite = (product: FavoriteProductDetail) => {
        const newFavorites = favorites.slice().filter((favorite: any) => favorite.sku !== product.sku);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        setFavorites(newFavorites)
    }

    useEffect(() => {
        setFavorites(JSON.parse(localStorage.getItem("favorites") ?? '[]'));
    }, [])

    return <FavoriteContext.Provider value={{
        favorites: favorites,
        addProductToFavorite: addProductToFavorite,
        removeProductToFavorite: removeProductToFavorite,
        totalFavoriteProduct: favorites.length
    }}>{children}</FavoriteContext.Provider>
}

export {FavoriteContext, FavoriteContextProvider}
