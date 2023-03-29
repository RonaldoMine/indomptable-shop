import React from "react";
import Image from "next/image";
import { HiX } from "react-icons/hi";
import Link from "next/link";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useBasket } from "../src/context/BasketContext";
import { useTranslation } from "react-i18next";

function Cart() {

    const { basket, dispatch } = useBasket();
    const {t} = useTranslation("basket-page")

    return (
      <div className="w-full overflow-x-hidden dark:bg-neutral-800">
        <main className="px-6 py-10 max-w-[75rem] mx-auto">
          <h1 className="text-3xl font-bold dark:text-neutral-100">
            {t("h1")}
          </h1>
          <hr className="my-6" />
          <div
            id="main-content-wrapper"
            className="grid grid-cols-1 gap-2 md:grid-cols-3"
          >
            <div id="left-pane" className="md:col-span-2">
              <div className="flex flex-col gap-4">
                {basket.items?.length > 0 ? (
                  basket.items.map((item, idx) => {
                    return (
                      <div
                        key={idx}
                        id="card"
                        className="border border-slate-200 dark:border-neutral-600"
                      >
                        <div className="flex p-5 justify-between">
                          <div className="flex">
                            <div className="h-64 flex-shrink-0 overflow-hidden">
                              <Image
                                src={item.img}
                                className="h-full w-full object-cover"
                                height={100}
                                width={100}
                                alt="Indomptable black tee"
                                priority
                              />
                            </div>
                            <div className="ml-4 flex flex-col justify-between">
                              <div>
                                <h2 className="text-lg dark:text-neutral-200">
                                  {item.sku}
                                </h2>
                                <p className="text-slate-500 mt-1 dark:text-neutral-400">
                                  Black | {item.size}
                                </p>
                                <p className="font-medium dark:text-neutral-300">
                                  XAF {item.price}
                                </p>
                              </div>
                              <div className="flex">
                                <button
                                  className="bg-slate-700 text-white px-2 shadow-md mr-2 dark:bg-slate-200 dark:text-neutral-700"
                                  onClick={() => {
                                    dispatch({
                                      type: "SUBSTRACT_QUANTITY",
                                      payload: idx,
                                    });
                                  }}
                                >
                                  -
                                </button>
                                <input
                                  readOnly
                                  value={item.qty}
                                  name="quantity"
                                  maxLength={2}
                                  className="border-2 px-2 text-center border-slate-400 rounded-md w-10 dark:bg-transparent dark:text-neutral-300"
                                />
                                <button
                                  className="bg-slate-700 text-white px-2 shadow-md ml-2 dark:bg-slate-200 dark:text-neutral-700"
                                  onClick={() => {
                                    dispatch({
                                      type: "ADD_QUANTITY",
                                      payload: idx,
                                    });
                                  }}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                          <div
                            className="active:text-slate-400 dark:text-neutral-500 dark:hover:text-neutral-300"
                            onClick={() =>
                              dispatch({ type: "REMOVE_PRODUCT", payload: idx })
                            }
                          >
                            <HiX />
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>
                    {t("emptyBasket.text")},{" "}
                    <Link href={"/"} className="underline">
                      {t("emptyBasket.link")}
                    </Link>
                  </p>
                )}
              </div>
            </div>
            {basket.items?.length > 0 && (
              <div id="right-pane" className="col-span-1">
                <div className="p-4 bg-slate-50 dark:bg-transparent dark:border-neutral-600 dark:border">
                  <h2 className="mb-4 text-lg font-semibold dark:text-neutral-200">
                    {t("order-summary")}
                  </h2>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-600 dark:text-neutral-400">
                      {t("total-quantity")}
                    </span>
                    <span className="font-semibold dark:text-neutral-200">
                      {basket.totalProduct}
                    </span>
                  </div>
                  <hr />
                  <div className="flex justify-between py-2">
                    <span className="text-slate-600 dark:text-neutral-400">
                      {t("subtotal")}
                    </span>
                    <span className="font-semibold dark:text-neutral-200">
                      XAF {basket.subTotal}
                    </span>
                  </div>
                  <hr />
                  <div className="flex justify-between py-2">
                    <span className="text-slate-600 dark:text-neutral-400">
                      {t("delivery-fees")}
                    </span>
                    <span className="font-semibold dark:text-neutral-200">
                      XAF {1000}
                    </span>
                  </div>
                  <hr />
                  <div className="flex justify-between py-2">
                    <h2 className="font-semibold dark:text-neutral-400">
                      {t("order-total")}
                    </h2>
                    <span className="font-semibold dark:text-neutral-200">
                      XAF {basket.subTotal + 1000}
                    </span>
                  </div>
                  <Link href={"/checkout"}>
                    {" "}
                    <button className="bg-gradient-to-bl from-slate-700 to-slate-900 px-8 py-4 text-white font-space mt-3 dark:text-black dark:from-slate-200 dark:to-slate-50">
                        {t("checkout")}
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    );
}

export default Cart;

export const getServerSideProps: GetServerSideProps = async ({locale}:any) => {
  return {
      props: {
        ...(await serverSideTranslations(locale, ["basket-page"])),
      },
    };
}
