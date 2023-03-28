import React, {useState} from "react";
import {useBasket} from "../src/context/BasketContext";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {AiFillCheckCircle, AiOutlineCloseCircle, AiOutlineFilePdf} from "react-icons/ai";
import {BiArrowBack} from "react-icons/bi";
import om from "../public/assets/images/om.svg"
import momo from "../public/assets/images/mtn.svg"
import Image from "next/image";
import Link from "next/link";

enum PaymentStatus {
    SUCCESS = "SUCCESS",
    PENDING = "PENDING",
    CREATED = "CREATED",
    FAILED = "FAILED",
    CANCELLED = "CANCELLED"
}

function Checkout() {
    const {basket, dispatch} = useBasket();
    const [paymentMessage, setPaymentMessage] = useState("La commande est en cours de traitement...")
    const [paymentStatus, setPaymentStatus] = useState(PaymentStatus.CREATED)
    const [paymentPdfLink, setPaymentPdfLink] = useState("")
    let interval: string | number | NodeJS.Timer | undefined;
    const {
        handleSubmit, register, formState: {
            errors
        }
    } = useForm();
    const [onLoad, setOnLoad] = useState(false);

    const handleInitPayment = async (values: any) => {
        setOnLoad(true)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...values,
                quantity: basket.totalProduct,
                amount: (basket.subTotal + 1000),
                basket: basket.items
            }),
        }
        const response = await fetch("/api/payment", options);
        const result = await response.json();
        const status = response.status
        if (status === 200) {
            toast.success(result.message)
            setPaymentStatus(result.status)
            setPaymentMessage(result.message)
            interval = setInterval(() => {
                checkPayment(result.paymentId)
            }, 5000)
        } else {
            toast.error(result.message)
            setOnLoad(false)
        }
    }

    const checkPayment = async (paymentId: string) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({paymentId: paymentId}),
        }
        const response = await fetch("/api/checkStatus", options);
        const result = await response.json();
        const status = response.status
        if (status === 200) {
            if (result.status != PaymentStatus.PENDING && result.status != PaymentStatus.CREATED) {
                if (result.status === PaymentStatus.SUCCESS) {
                    dispatch({
                        type: "RESET_BASKET",
                        payload: {}
                    })
                }
                setPaymentMessage(result.message)
                setPaymentStatus(result.status)
                setPaymentPdfLink(result.pdf)
                setOnLoad(false)
                clearInterval(interval)
            }
        } else {
            toast.error(result.message)
            setOnLoad(false)
            clearInterval(interval)
        }
    }
    return <>
        <div className='w-full overflow-x-hidden'>
            <div className="px-6 py-10 max-w-[75rem] mx-auto">
                <h1 className="text-3xl font-bold">Checkout your command</h1>
                <hr className="my-6"/>
                <div id="main-content-wrapper" className="grid grid-cols-1 gap-2 md:grid-cols-3">
                    {
                        (basket.totalProduct > 0 || paymentStatus === PaymentStatus.SUCCESS) ? <>
                                {paymentStatus !== PaymentStatus.SUCCESS && (<div className="col-span-1">
                                    <div className="p-4 dark:bg-neutral-800 bg-slate-50">
                                        <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
                                        <div className="flex justify-between py-2">
                                            <span className="text-slate-600 dark:text-slate-200">Total Quantity</span>
                                            <span className="font-semibold">{basket.totalProduct}</span>
                                        </div>
                                        <hr/>
                                        <div className="flex justify-between py-2">
                                            <span className="text-slate-600 dark:text-slate-200">Subtotal</span>
                                            <span className="font-semibold">XAF {basket.subTotal}</span>
                                        </div>
                                        <hr/>
                                        <div className="flex justify-between py-2">
                                            <span className="text-slate-600 dark:text-slate-200">Delivery Fees</span>
                                            <span className="font-semibold">XAF {1000}</span>
                                        </div>
                                        <hr/>
                                        <div className="flex justify-between py-2">
                                            <h2 className="font-semibold">Order total</h2>
                                            <span className="font-semibold">XAF {basket.subTotal + 1000}</span>
                                        </div>
                                    </div>
                                </div>)}
                                <div
                                    className={`${paymentStatus === PaymentStatus.SUCCESS ? "col-span-3" : "col-span-2"} relative `}>
                                    {onLoad && (<div
                                        className="transition-all absolute w-full h-full bg-neutral-500 bg-opacity-90 z-10 p-4">
                                        <div className="flex flex-col h-full justify-center items-center">
                                            <h3 className={"text-white text-center mb-2"}>{paymentMessage}</h3>
                                            <div className="text-center">
                                                <span className={"loader"}></span>
                                            </div>
                                        </div>
                                    </div>)}
                                    {(paymentStatus !== PaymentStatus.PENDING && paymentStatus !== PaymentStatus.CREATED) && (
                                        <div className="transition-all absolute w-full h-full bg-white z-10 p-4 shadow-md">
                                            <div className="flex flex-col h-full justify-center items-center">
                                                <div className="text-center">
                                                    {paymentStatus === PaymentStatus.SUCCESS ?
                                                        <AiFillCheckCircle className={"fill-green-500"} size={"80px"}/> :
                                                        <AiOutlineCloseCircle className={"fill-red-500"} size={"80px"}/>}
                                                </div>
                                                <h3 className={"text-center mb-2"}>{paymentMessage}</h3>
                                                <div
                                                    className={"flex flex-col-reverse items-center justify-between w-full"}>
                                                    <Link href={"/"}
                                                          className={"underline mt-4 flex aligns-center font-bold"}>
                                                        <BiArrowBack className={"mr-2"}/> <span>Retour à la boutique</span>
                                                    </Link>
                                                    {(paymentStatus === PaymentStatus.SUCCESS && paymentPdfLink !== "") && (
                                                        <a className={"text-gradient underline mt-4 flex aligns-center"}
                                                           href={`/${paymentPdfLink}`} target="_blank">Télécharger Votre
                                                            facture <AiOutlineFilePdf
                                                                className={"text-red-500 ml-2"}/></a>)}
                                                </div>
                                            </div>
                                        </div>)}
                                    <h2 className="text-2xl text-center mb-6 mt-4">Delivery options</h2>
                                    <form onSubmit={handleSubmit(handleInitPayment)}>
                                        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-x-8 md:gap-y-8 gap-4">
                                            <div>
                                                <input type="text"
                                                       className={"form-control rounded dark:bg-transparent dark:text-white"} {...register("firstname", {
                                                    required: true,
                                                })} defaultValue={"Ronaldo"} placeholder="First Name *"/>
                                                <span
                                                    className={"text-red-500 text-sm "}>{errors.firstname && "Please enter your firstname"}</span>
                                            </div>
                                            <div>
                                                <input type="text"
                                                       className={"form-control rounded dark:bg-transparent dark:text-white"} {...register("lastname", {
                                                    required: true,
                                                })} defaultValue={"Mine"} placeholder="Last Name *"/>
                                                <span
                                                    className={"text-red-500 text-sm"}>{errors.lastname && "Please enter your lastname"}</span>
                                            </div>
                                            <div>
                                                <input type="email"
                                                       className={"form-control rounded dark:bg-transparent dark:text-white"} {...register("email", {
                                                    required: true,
                                                })} defaultValue={"and@gmail.com"} placeholder="Email *"/>
                                                <span
                                                    className={"text-red-500 text-sm "}>{errors.email && "Please enter your email"}</span>
                                            </div>
                                            <div>
                                                <input type="number" {...register("phoneNumber", {
                                                    required: true
                                                })} defaultValue={"675710605"}
                                                       className={"form-control rounded dark:bg-transparent dark:text-white"}
                                                       placeholder="Phone Number *"/>
                                                <span
                                                    className={"text-red-500 text-sm "}>{errors.phoneNumber && "Please enter your phone number"}</span>
                                            </div>
                                        </div>
                                        <div className={"col-span-2 mt-4"}>
                                            <input type="text" {...register("address", {
                                                required: true
                                            })} defaultValue={"Immeuble Tecno, Boulevard de la Liberté, Akwa"}
                                                   className={"form-control rounded dark:bg-transparent dark:text-white"}
                                                   placeholder="Address *"/>
                                            <span
                                                className={"text-red-500 text-sm "}>{errors.address && "Please enter your address line"}</span>
                                        </div>
                                        <div
                                            className={"md:flex grid md:justify-between justify-items-center items-center mt-4"}>
                                            <div className={"flex items-center"}>
                                                Accepté ici
                                                <Image src={om} alt="Orange Money" className={"h-20 w-20"}/>
                                                <Image src={momo} alt="MTN Mobile Money" className={"h-20 w-20"}/>
                                            </div>
                                            <button className={"bg-gradient w-28 p-2 text-white"} type={"submit"}>
                                                Pay
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </> :
                            <p>No items in your basket, <Link href={"/"} className="underline">Go to shopping</Link></p>
                    }
                </div>
            </div>
        </div>
    </>
}

export default Checkout;
