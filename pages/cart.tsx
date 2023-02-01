import React from "react";
import Image from "next/image";
import shirt from '../public/assets/images/tshirt-black-desktop.png'
import { HiX } from "react-icons/hi";
import Link from "next/link";
import { useBasket } from "../src/context/BasketContext";
import {urlFor} from "../sanity";

function Cart() {

    const { basket, dispatch } = useBasket();

    return <div className='w-full overflow-x-hidden'>
        <main className="px-6 py-10 max-w-[75rem] mx-auto">
            <h1 className="text-3xl font-bold">Your basket</h1>
            <hr className="my-6" />
            <div id="main-content-wrapper" className="grid grid-cols-1 gap-2 md:grid-cols-3">
                <div id="left-pane" className="md:col-span-2">
                    <div className="flex flex-col gap-4">
                        {
                            basket.items?.length > 0 ?
                                basket.items.map((item, idx) => {
                                    return <div key={idx} id="card" className="border border-slate-200">
                                        <div className="flex p-5 justify-between">
                                            <div className="flex">
                                                <div className="h-64 flex-shrink-0 overflow-hidden">
                                                    <Image className='h-full w-full object-cover object-center' height={100} width={100} src={item.img} alt="Indomptable black tee" />
                                                </div>
                                                <div className="ml-4 flex flex-col justify-between">
                                                    <div>
                                                        <h2 className="text-lg">Indomitable gold version</h2>
                                                        <p className="text-slate-500 mt-1">
                                                            Black | {item.size}
                                                        </p>
                                                        <p className="font-medium">XAF {item.price}</p>
                                                    </div>
                                                    <div className="flex">
                                                        <button className="bg-slate-700 text-white px-2 shadow-md mr-2" onClick={() => { dispatch({ type: 'SUBSTRACT_QUANTITY', payload: idx }) }}>-</button>
                                                        <input name="quantity" defaultValue={item.qty} value={item.qty} maxLength={2} className="border-2 px-2 text-center border-slate-400 rounded-md w-10"/>
                                                        <button className="bg-slate-700 text-white px-2 shadow-md ml-2" onClick={() => { dispatch({ type: 'ADD_QUANTITY', payload: idx})}}>+</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="active:text-slate-400" onClick={() => dispatch({type: 'REMOVE_PRODUCT', payload: idx})}><HiX /></div>
                                        </div>
                                    </div>
                                }) :
                                <p>No items in your basket, <Link href={"/"} className="underline">Go to shopping</Link></p>}
                    </div>

                </div>
                {basket.items?.length > 0 && (<div id="right-pane" className="col-span-1">
                    <div className="p-4 bg-slate-50">
                        <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
                        <div className="flex justify-between py-2">
                            <span className="text-slate-600">Subtotal</span>
                            <span className="font-semibold">XAF {basket.subTotal}</span>
                        </div>
                        <hr />
                        <div className="flex justify-between py-2">
                            <span className="text-slate-600">Delivery Fees</span>
                            <span className="font-semibold">XAF {1000}</span>
                        </div>
                        <hr />
                        <div className="flex justify-between py-2">
                            <h2 className="font-semibold">Order total</h2>
                            <span className="font-semibold">XAF {basket.subTotal + 1000}</span>
                        </div>
                        <button className='bg-gradient-to-bl from-slate-700 to-slate-900 px-8 py-4 text-white font-space mt-3'>Checkout</button>
                    </div>
                </div>)}
            </div>
        </main>
    </div>
}

export default Cart;
