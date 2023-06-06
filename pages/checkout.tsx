import React, {Fragment, useState} from "react";
import {useBasket} from "../src/context/BasketContext";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {AiFillCheckCircle, AiOutlineCloseCircle} from "react-icons/ai";
import {BiArrowBack, BiCheck, BiChevronDown} from "react-icons/bi";
import om from "../public/assets/images/om.svg"
import momo from "../public/assets/images/mtn.svg"
import Image from "next/image";
import Link from "next/link";
import {useTranslation} from "next-i18next";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import PageHeader from "../src/components/PageHeader";
import {Listbox, Transition} from "@headlessui/react";

enum PaymentStatus {
    SUCCESS = "SUCCESS",
    PENDING = "PENDING",
    CREATED = "CREATED",
    FAILED = "FAILED",
    CANCELLED = "CANCELLED"
}

const towns = ['Douala', 'Yaoundé']

function Checkout({locale}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const {basket, dispatch} = useBasket();
    const {t} = useTranslation("checkout-page");
    const [paymentMessage, setPaymentMessage] = useState(`${t("init-payment-message")}`);
    const [paymentStatus, setPaymentStatus] = useState(PaymentStatus.CREATED)
    //const [paymentPdfLink, setPaymentPdfLink] = useState("");
    const [selectedTown, setSelectedTown] = useState("");
    const [checkPaymentOnLoad, setCheckPaymentOnLoad] = useState(false);
    let interval: string | number | NodeJS.Timer | undefined;
    const {
        handleSubmit, register, setValue, formState: {
            errors
        }
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            address: "",
            town: ""
        }
    });
    const [onLoad, setOnLoad] = useState(false);

    const handleInitPayment = async (values: any) => {
        setOnLoad(true)
        setPaymentMessage(`${t("init-payment-message")}`)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...values,
                quantity: basket.totalProduct,
                amount: (basket.subTotal + 1000),
                basket: basket.items,
                lang: locale
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
                if (!checkPaymentOnLoad) {
                    setCheckPaymentOnLoad(true)
                    checkPayment(result.paymentId)
                }
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
            body: JSON.stringify({paymentId: paymentId, lang: locale}),
        }
        const response = await fetch("/api/checkStatus", options);
        const result = await response.json();
        const status = response.status
        if (status === 200) {
            setCheckPaymentOnLoad(false)
            if (result.status != PaymentStatus.PENDING && result.status != PaymentStatus.CREATED) {
                if (result.status === PaymentStatus.SUCCESS) {
                    dispatch({
                        type: "RESET_BASKET",
                        payload: {}
                    })
                }
                setPaymentMessage(result.message)
                setPaymentStatus(result.status)
                //setPaymentPdfLink(result.pdf)
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
                <PageHeader title={t("title")}/>
                <div id="main-content-wrapper" className="grid grid-cols-1 gap-2 md:grid-cols-3">
                    {
                        (basket.totalProduct > 0 || paymentStatus === PaymentStatus.SUCCESS) ? <>
                                {paymentStatus !== PaymentStatus.SUCCESS && (<div className="col-span-1">
                                    <div className="p-4 dark:bg-neutral-800 bg-slate-50">
                                        <h2 className="mb-4 text-lg font-semibold">{t("order-summary")}</h2>
                                        <div className="flex justify-between py-2">
                                            <span className="text-slate-600 dark:text-slate-200">{t("quantity")}</span>
                                            <span className="font-semibold">{basket.totalProduct}</span>
                                        </div>
                                        <hr/>
                                        <div className="flex justify-between py-2">
                                            <span className="text-slate-600 dark:text-slate-200">{t("sub-total")}</span>
                                            <span className="font-semibold">XAF {basket.subTotal}</span>
                                        </div>
                                        <hr/>
                                        <div className="flex justify-between py-2">
                                            <span className="text-slate-600 dark:text-slate-200">{t("delivery-fees")}</span>
                                            <span className="font-semibold">XAF {1000}</span>
                                        </div>
                                        <hr/>
                                        <div className="flex justify-between py-2">
                                            <h2 className="font-semibold">{t("total")}</h2>
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
                                        <div
                                            className="transition-all absolute w-full h-full dark:bg-neutral-800 bg-white z-10 p-4 shadow-md">
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
                                                        <BiArrowBack className={"mr-2"}/> <span>{t("back-to-shop")}</span>
                                                    </Link>
                                                    {/*{(paymentStatus === PaymentStatus.SUCCESS && paymentPdfLink !== "") && (
                                                        <a className={"text-gradient underline mt-4 flex aligns-center"}
                                                           href={`/${paymentPdfLink}`}
                                                           target="_blank" rel="noreferrer">{t("download-invoice")}
                                                            <AiOutlineFilePdf
                                                                className={"text-red-500 ml-2"}/></a>)}*/}
                                                </div>
                                            </div>
                                        </div>)}
                                    <h2 className="text-2xl text-center mb-6 mt-4">{t("form.title")}</h2>
                                    <form onSubmit={handleSubmit(handleInitPayment)}>
                                        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-x-8 md:gap-y-8 gap-4">
                                            <div>
                                                <input type="text"
                                                       className={"form-control rounded dark:bg-transparent dark:text-white"} {...register("firstName", {
                                                    required: true,
                                                })} placeholder={`${t("form.first-name")} *`}/>
                                                <span
                                                    className={"text-red-500 text-sm "}>{errors.firstName && t("errors.first-name")}</span>
                                            </div>
                                            <div>
                                                <input type="text"
                                                       className={"form-control rounded dark:bg-transparent dark:text-white"} {...register("lastName", {
                                                    required: true,
                                                })} placeholder={`${t("form.last-name")} *`}/>
                                                <span
                                                    className={"text-red-500 text-sm"}>{errors.lastName && t("errors.last-name")}</span>
                                            </div>
                                            <div>
                                                <input type="email"
                                                       className={"form-control rounded dark:bg-transparent dark:text-white"} {...register("email", {
                                                    required: true,
                                                })} placeholder={`${t("form.email")} *`}/>
                                                <span
                                                    className={"text-red-500 text-sm "}>{errors.email && t("errors.email")}</span>
                                            </div>
                                            <div>
                                                <input type="number" {...register("phoneNumber", {
                                                    required: true
                                                })} className={"form-control rounded dark:bg-transparent dark:text-white"}
                                                       placeholder={`${t("form.phone")} *`}/>
                                                <span
                                                    className={"text-red-500 text-sm "}>{errors.phoneNumber && t("errors.phone")}</span>
                                            </div>
                                            <div>
                                                <Listbox value={selectedTown} {...register("town", {
                                                    required: true
                                                })}
                                                         onChange={(town) => {
                                                             setSelectedTown(town)
                                                             setValue("town", town);
                                                         }
                                                         }>
                                                    <div className="relative">
                                                        <Listbox.Button
                                                            className="select-control relative w-full bg-white text-left focus:outline-none sm:text-sm">
                                                            <span
                                                                className="my-auto block">{selectedTown === "" ? t("form.town") : selectedTown}</span>
                                                            <span
                                                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                              <BiChevronDown
                                                                  className="h-5 w-5 text-gray-400"
                                                                  aria-hidden="true"
                                                              />
                                                            </span>
                                                        </Listbox.Button>
                                                        <Transition
                                                            as={Fragment}
                                                            leave="transition ease-in duration-100"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                            <Listbox.Options
                                                                className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                                {towns.map((town, index) => (
                                                                    <Listbox.Option
                                                                        key={index}
                                                                        className={({active}) =>
                                                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                                                active ? 'bg-orange-100 text-orange-900' : 'text-gray-900'
                                                                            }`
                                                                        }
                                                                        value={town}
                                                                    >
                                                                        {({selected}) => (
                                                                            <>
                      <span
                          className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        {town}
                      </span>
                                                                                {selected ? (
                                                                                    <span
                                                                                        className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <BiCheck className="h-5 w-5" aria-hidden="true"/>
                        </span>
                                                                                ) : null}
                                                                            </>
                                                                        )}
                                                                    </Listbox.Option>
                                                                ))}
                                                            </Listbox.Options>
                                                        </Transition>
                                                    </div>
                                                </Listbox>
                                                <span
                                                    className={"text-red-500 text-sm "}>{errors?.town && t("errors.town")}</span>
                                            </div>
                                            <div>
                                                <input type="text" {...register("address", {
                                                    required: true
                                                })} className={"form-control rounded dark:bg-transparent dark:text-white"}
                                                       placeholder={`${t("form.address")} *`}/>
                                                <span
                                                    className={"text-red-500 text-sm "}>{errors.address && t("errors.address")}</span>
                                            </div>
                                        </div>
                                        <div
                                            className={"md:flex grid md:justify-between justify-items-center items-center mt-4"}>
                                            <div className={"flex items-center"}>
                                                {t("form.accept-here")}
                                                <div className={"bg-white ml-2"}><Image src={om} alt="Orange Money"
                                                                                        height={'40'}
                                                                                        className={"h-15 w-20"}/></div>
                                                <Image src={momo} alt="MTN Mobile Money" className={"h-20 w-20"}/>
                                            </div>
                                            <button className={"bg-gradient w-28 p-2 text-white"} type={"submit"}>
                                                {t("form.button")}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </> :
                            <p>{t("empty-basket")}, <Link href={"/"} className="underline">{t("back-to-shop")}</Link>
                            </p>
                    }
                </div>
            </div>
        </div>
    </>
}

export default Checkout;


export const getServerSideProps: GetServerSideProps = async ({locale}: any) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["checkout-page"])),
            locale: locale
        }
    }
}
