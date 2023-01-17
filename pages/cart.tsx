import React from "react";
import Image from "next/image";
import shirt from '../public/assets/images/tshirt-black-desktop.png'
import { HiX } from "react-icons/hi";
import { useBasket } from "../src/hooks/useBasket";
import Link from "next/link";

function Cart() {

    const { order, removeProduct } = useBasket();

    return <div className='w-full overflow-x-hidden'>
        <main className="px-6 py-10 max-w-[75rem] mx-auto">
            <h1 className="text-3xl font-bold">Your basket</h1>
            <hr className="my-6" />
            <div id="main-content-wrapper" className="grid grid-cols-1 gap-2 md:grid-cols-3">
                <div id="left-pane" className="md:col-span-2">

                    <div className="flex flex-col gap-4">

                        {
                            order.length > 0 ?
                                order.map((item, idx) => {
                                    return <div key={idx} id="card" className="border border-slate-200">
                                        <div className="flex p-5 justify-between">
                                            <div className="flex">
                                                <div className="h-64 flex-shrink-0 overflow-hidden">
                                                    <Image className='h-full w-full object-cover object-center ' src={shirt} alt="Indomptable black tee" />
                                                </div>
                                                <div className="ml-4 flex flex-col justify-between">
                                                    <div>
                                                        <h2 className="text-lg">Indomitable gold version</h2>
                                                        <p className="text-slate-500 mt-1">
                                                            Black | {item.productSize}
                                                        </p>
                                                        <p className="font-medium">XAF8000</p>
                                                    </div>
                                                    <select name="quantity" className="self-start px-4 py-1 border-2 rounded-md appearance-none">
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="active:text-slate-400" onClick={() => removeProduct(idx)}><HiX /></div>
                                        </div>
                                    </div>
                                }) :
                                <p>No items in your basket, <Link href={"/"} className="underline">Go to shopping</Link></p>}

                    </div>

                </div>
                <div id="right-pane" className="col-span-1">
                    <div className="p-4 bg-slate-50">
                        <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
                        <div className="flex justify-between py-2">
                            <span className="text-slate-600">Subtotal</span>
                            <span className="font-semibold">XAF99</span>
                        </div>
                        <hr />
                        <div className="flex justify-between py-2">
                            <span className="text-slate-600">Subtotal</span>
                            <span className="font-semibold">XAF99</span>
                        </div>
                        <hr />
                        <div className="flex justify-between py-2">
                            <span className="text-slate-600">Subtotal</span>
                            <span className="font-semibold">XAF99</span>
                        </div>
                        <hr />
                        <div className="flex justify-between py-2">
                            <h2 className="font-semibold">Order total</h2>
                            <span className="font-semibold">XAF112</span>
                        </div>
                        <button className='bg-gradient-to-bl from-slate-700 to-slate-900 px-8 py-4 text-white font-space mt-3'>Checkout</button>
                    </div>
                </div>
            </div>
        </main>
    </div>
}

export default Cart;
