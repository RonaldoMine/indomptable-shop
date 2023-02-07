import {AiFillCheckCircle, AiOutlineClose} from "react-icons/ai";
import {urlFor} from "../../sanity";
import React from "react";
import {useBasket} from "../../src/context/BasketContext";
import {useRouter} from "next/router";

export default function ToastProduct({
                                         product,
                                         size,
                                         onClose,
                                         closeToast
                                     }: { product: any, size: string, onClose?: () => void, closeToast?: () => void }) {
    const {basket} = useBasket();
    const router = useRouter()
    return <>
        <div className="flex items-center justify-between mb-2">
            <AiFillCheckCircle className={"fill-green-500 mr-3"}/>
            <h3>Product add in cart</h3>
            <AiOutlineClose className={"fill-red-500 mr-3 hover:cursor-pointer"} onClick={() => {
                onClose && onClose()
                closeToast && closeToast()
            }}/>
        </div>
        <div className="flex mb-6">
            <img
                className="w-32 h-32 object-cover"
                src={urlFor(product?.thumbnail).url()}
                alt={product?.name}
            />
            <div className={"grid items-center"}>
                <p className={"font-bold text-slate-700"}>
                    {product?.name}
                </p>
                <p>
                    Size <span className={"text-neutral-700"}>{size}</span>
                </p>
                <p>
                    XAF <span className={"text-neutral-700"}>{product?.price}</span>
                </p>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <button className={"border-gray-300 border w-full p-2 bg-white"} onClick={() => {
                router.push("/cart")
                onClose && onClose()
                closeToast && closeToast()
            }}>
                View cart ({basket.totalProduct})
            </button>
            <button className={"bg-gradient w-full p-2 text-white"} onClick={() => {
                onClose && onClose()
                closeToast && closeToast()
                router.push("/checkout")
            }}>
                Checkout
            </button>
        </div>
    </>
}
