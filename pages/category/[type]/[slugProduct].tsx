import Image, { ImageProps } from "next/image";
import React, { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { sanityClient, urlFor } from "../../../sanity";
import { useBasket } from "../../../src/context/BasketContext";
import { toast } from "react-toastify";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import ToastProduct from "../../components/ToastProduct";
import useProductToFavorite from "../../../src/hooks/useProductToFavorite";

type Color = {
    name: string;
    images: {
        src: ImageProps;
        thumbnail: ImageProps;
        blurry: ImageProps;
    }[];
    sizes: {
        label: string;
        quantity: number;
    }[];
    totalQuantity: number;
};

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

export default function SlugProduct({
                                        productData,
                                    }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { t } = useTranslation("product-page");
    const [expanded, setExpanded] = useState({ one: false, two: false });
    const [errorSizeUnselected, setErrorSizeUnselected] = useState("");
    const [onAddProduct, setOnAddProduct] = useState(false);
    const { dispatch } = useBasket();
    const product = productData[0].product;
    const colors = product.colors;
    const [selectedColor, setSelectedColor] = useState(colors[0]);

    const [availableSizes, setAvailableSizes] = useState<any>(
        selectedColor.sizes
    );
    const [selectedSize, setSelectedSize] = useState(availableSizes[0]);
    const {addProductToFavorite} = useProductToFavorite();
    // useEffect(() => {
    //   console.log(selectedColor.sizes);
    // }, [selectedColor]);

    const handleOnChangeSize = (selected: any) => {
        setSelectedSize(selected);
        setErrorSizeUnselected("");
    };

    const handleOnChangeColor = (selected: any) => {
        setSelectedColor(selected);
        setAvailableSizes(selected.sizes);
    };

    const handleCloseToastProduct = () => {
        setOnAddProduct(false);
    };

    const handleAddProductOnCart = () => {
        if (selectedSize.label !== "") {
            dispatch({
                type: "ADD_PRODUCT",
                payload: {
                    sku: product?.sku,
                    qty: 1,
                    price: product?.price,
                    size: selectedSize.label,
                    color: "black",
                    img: urlFor(product?.coverImage).url(),
                },
            });
            toast(
                <ToastProduct
                    product={product}
                    onClose={handleCloseToastProduct}
                    size={selectedSize.label}
                />,
                {
                    autoClose: false,
                    className: "sm:w-[450px] w-full sm:right-[9rem] dark:bg-neutral-800",
                    onClose: () => setOnAddProduct(false),
                    onOpen: () => setOnAddProduct(true),
                    closeButton: false,
                    closeOnClick: false,
                }
            );
            // setSelectedSize(availableSizes[0]);
        } else {
            setErrorSizeUnselected("Please select a size");
        }
    };
    const handleAddProductToFavorite = () => {
        addProductToFavorite({...product, img: urlFor(product.coverImage).url()});
    }

    return (
        <>
            <div className="w-full overflow-x-hidden dark:bg-neutral-800 relative">
                {onAddProduct && (
                    <div className="transition-all fixed inset-0 bg-neutral-500 bg-opacity-70 z-10"></div>
                )}
                <div className="min-h-screen max-w-[75rem] mx-auto px-8 sm:px-12 py-20 grid grid-cols-1 min-[960px]:grid-cols-6 sm:gap-14">
                    <div
                        id="left-pane"
                        className="md:columns-2 columns-1 leading-none gap-x-4 min-[960px]:col-span-3 min-[1100px]:col-span-4"
                    >
                        {/* <div id="image-wrapper">
              <Image
                className="w-full h-auto"
                placeholder="blur"
                width={539}
                priority
                blurDataURL={urlFor(selectedColor?.images[0].blurry).url()}
                height={885}
                src={urlFor(selectedColor?.images[0].src).url()}
                alt={product?.name}
              />
            </div> */}
                        {selectedColor.images.map((image: any, index: number) => {
                            return (
                                <Image
                                    key={index}
                                    className="object-contain w-full mb-4 max-w-full h-auto"
                                    //placeholder="blur"
                                    // fill={true}
                                    width={480}
                                    height={480}
                                    priority
                                    blurDataURL={urlFor(image.blurry).url()}
                                    src={urlFor(image.src).url()}
                                    alt={"image " + index}
                                />
                            );
                        })}
                    </div>
                    <div
                        id="right-pane"
                        className=" min-[960px]:col-span-3 min-[1100px]:col-span-2"
                    >
                        <h1
                            style={{ fontFamily: "Helvetica" }}
                            className="text-3xl font-medium sm:text-left dark:text-white"
                        >
                            {product?.name}
                        </h1>
                        <p className="mt-1">{}</p>
                        <p className="mt-5 dark:text-neutral-300">XAF {product?.price}</p>
                        {/* <!-- Colors --> */}
                        <div className="mt-8">
                            <h3 className={`text-sm font-medium dark:text-neutral-400`}>
                                Colors
                            </h3>
                            <RadioGroup
                                value={selectedColor}
                                onChange={(selected: Color) => handleOnChangeColor(selected)}
                                className={"mt-4 flex flex-wrap items-center gap-3"}
                            >
                                {colors.map((color: Color, index: number) => (
                                    <RadioGroup.Option
                                        key={index}
                                        value={color}
                                        className={({ active, checked }) =>
                                            classNames(
                                                "ring-gray-300",
                                                active && checked ? "ring ring-offset-1" : "",
                                                !active && checked ? "ring-2" : "",
                                                "cursor-pointer rounded-md p-0.5 border-gray-200 border-2 focus:outline-none"
                                            )
                                        }
                                    >
                                        <div className="w-24 h-24 lg:w-20 lg:h-20 relative">
                                            <Image
                                                src={urlFor(color.images[0].thumbnail).url()}
                                                blurDataURL={urlFor(color.images[0].blurry).url()}
                                                alt={color.name}
                                                fill={true}
                                                className={"object-contain"}
                                            />
                                        </div>
                                    </RadioGroup.Option>
                                ))}
                            </RadioGroup>
                        </div>
                        {/* <!-- Colors --> */}
                        {/* <!-- Sizes --> */}
                        <div className="mt-10">
                            <div className="flex items-center justify-between">
                                <h3
                                    className={`text-sm font-medium dark:text-neutral-400 ${
                                        errorSizeUnselected ? "text-red-500" : "text-gray-900"
                                    }`}
                                >
                                    {t("size")}
                                </h3>
                                {/* <a
                    href="pages/category/Product[slug]#[slugProduct].tsx"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Size guide
                  </a> */}
                            </div>
                            <RadioGroup
                                value={selectedSize}
                                onChange={(selected: any) => handleOnChangeSize(selected)}
                                className={`mt-4 mb-2 ${
                                    errorSizeUnselected ? "border border-red-500 rounded-md" : ""
                                }`}
                            >
                                <RadioGroup.Label className="sr-only">
                                    {" "}
                                    Choose a size{" "}
                                </RadioGroup.Label>
                                <div className="grid grid-cols-4 gap-3 sm:grid-cols-8 lg:grid-cols-4">
                                    {availableSizes.map((availableSize: any) => (
                                        <RadioGroup.Option
                                            value={availableSize}
                                            key={availableSize.label}
                                            className={({ active }) =>
                                                classNames(
                                                    availableSize.label
                                                        ? "bg-white shadow-sm text-gray-900 cursor-pointer dark:bg-transparent dark:text-neutral-400 dark:border-neutral-400"
                                                        : "bg-gray-50 text-gray-200 dark:bg-transparent dark:text-neutral-700 cursor-not-allowed",
                                                    active
                                                        ? "ring-2 ring-slate-700 dark:ring-slate-100"
                                                        : "",
                                                    "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 dark:hover:bg-neutral-700 focus:outline-none sm:flex-1 sm:py-6"
                                                )
                                            }
                                        >
                                            {({ active, checked }) => (
                                                <>
                                                    <RadioGroup.Label
                                                        as="span"
                                                        className={
                                                            checked
                                                                ? "dark:text-neutral-800 z-10"
                                                                : "dark:text-neutral-400"
                                                        }
                                                    >
                                                        {availableSize.label}
                                                    </RadioGroup.Label>
                                                    <span
                                                        className={classNames(
                                                            active ? "border" : "border-1",
                                                            checked
                                                                ? "dark:bg-slate-100 ring-2 ring-slate-700"
                                                                : "",
                                                            "pointer-events-none absolute -inset-px rounded-md"
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                </>
                                            )}
                                        </RadioGroup.Option>
                                    ))}
                                    {/* {sizes.map((size: any) => (
                      <RadioGroup.Option
                        key={size.name}
                        value={size}
                        disabled={!size.materials}
                        className={({ active }) =>
                          classNames(
                            size.materials
                              ? "bg-white shadow-sm text-gray-900 cursor-pointer dark:bg-transparent dark:text-neutral-400 dark:border-neutral-400"
                              : "bg-gray-50 text-gray-200 dark:bg-transparent dark:text-neutral-700 cursor-not-allowed",
                            active
                              ? "ring-2 ring-slate-700 dark:ring-slate-100"
                              : "",
                            "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 dark:hover:bg-neutral-700 focus:outline-none sm:flex-1 sm:py-6"
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label
                              as="span"
                              className={
                                checked
                                  ? "dark:text-neutral-800 z-10"
                                  : "dark:text-neutral-400"
                              }
                            >
                              {size.name}
                            </RadioGroup.Label>
                            {size.materials ? (
                              <span
                                className={classNames(
                                  active ? "border" : "border-1",
                                  checked ? "dark:bg-slate-100" : "",
                                  "pointer-events-none absolute -inset-px rounded-md"
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line
                                    x1={0}
                                    y1={100}
                                    x2={100}
                                    y2={0}
                                    vectorEffect="non-scaling-stroke"
                                  />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))} */}
                                </div>
                            </RadioGroup>
                            {/* <span className={"text-red-500"}>{errorSizeUnselected}</span> */}
                            {/*<RadioGroup>
                            <div className={"mt-5 flex"}>
                                {colors.map((color: any) => (
                                    <RadioGroup.Option key={color.color}
                                                       value={color}
                                                       className={({active, checked}) =>
                                                           classNames('cursor-pointer py-3 px-4 mr-4 w-8 h-8 shadow-sm rounded-md',
                                                               active || checked ? 'border-2 border-gray-500' : '',
                                                           )
                                                       }
                                                       style={{background: color.color}}>
                                    </RadioGroup.Option>
                                ))
                                }
                            </div>
                        </RadioGroup>*/}
                        </div>

            <p className="mt-8 dark:text-neutral-300">{product.description}</p>

            <p className="mt-3 text-slate-400 dark:text-neutral-400 text-sm">
              {/* *Those tee are made on-demand, after placing your order we will send you an e-mail for
                            further
                            information */}
                            {t("important-note")}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-5">
                            <button
                                className="bg-gradient-to-bl from-slate-700 to-slate-900 w-full py-4 text-white font-space  dark:text-black dark:from-slate-200 dark:to-slate-50 dark:bg-gradient-to-bl"
                                onClick={handleAddProductOnCart}
                            >
                                {t("add-to-basket")}
                            </button>
                            <button onClick={handleAddProductToFavorite} className="border-slate-700 border-2 w-full py-4 font-space dark:border dark:border-neutral-600 dark:text-neutral-300">
                                {t("add-to-favorite")}
                            </button>
                        </div>
                        <p className="mt-12"></p>
                        <div className="mt-12">
                            <ul className="list-disc ml-4">
                                <li className="dark:text-neutral-400">{t("shown")}: Black</li>
                                <li className="dark:text-neutral-400">
                                    {"Brand (Blank tee): Sol's"}
                                </li>
                            </ul>
                        </div>
                        {/* Divider */}
                        <div className="h-[0.05rem] bg-slate-300 my-6 dark:bg-neutral-600"></div>

                        <div id="submenu-wrapper">
                            <div id="submenu">
                                <div
                                    className="submenu-title flex items-center justify-between cursor-pointer"
                                    onClick={() => {
                                        setExpanded({ ...expanded, one: !expanded.one });
                                    }}
                                >
                                    <h3 className="text-xl dark:text-neutral-300">
                                        {t("size-and-fit")}
                                    </h3>
                                    <span className="text-2xl dark:text-neutral-300">+</span>
                                </div>
                                <ul
                                    className={`list-disc mt-4 ml-4 ${!expanded.one && "hidden"}`}
                                >
                                    <li className="dark:text-neutral-400">
                                        {"Model is wearing size M and is 6'1/185cm"}
                                    </li>
                                    <li className="dark:text-neutral-400">
                                        Big & regular model is wearing size 2XL and is 175cm
                                    </li>
                                    <li className="dark:text-neutral-400">
                                        Standard fit has a relaxed, easy feel
                                    </li>
                                </ul>
                            </div>

                            {/* Divider */}
                            <div className="h-[0.05rem] bg-slate-300 my-6  dark:bg-neutral-600"></div>

                            <div id="submenu">
                                <div
                                    className="submenu-title flex items-center justify-between cursor-pointer"
                                    onClick={() => {
                                        setExpanded({ ...expanded, two: !expanded.two });
                                    }}
                                >
                                    <h3 className="text-xl dark:text-neutral-300">
                                        {t("delivery-and-return")}
                                    </h3>
                                    <span className="text-2xl dark:text-neutral-300">+</span>
                                </div>
                                <p
                                    className={`mt-4 ${
                                        !expanded.two && "hidden"
                                    } dark:text-neutral-400`}
                                >
                                    {t("delivery-and-return-note")}
                                </p>
                            </div>

                            {/* Divider */}
                            <div className="h-[0.05rem] bg-slate-300 my-6  dark:bg-neutral-600"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({
                                                                 params,
                                                                 locale,
                                                             }: any) => {
    const query = `*[_type == "categories" && type == $type]{
    _id,
    type,
    name,
    "product": *[_type == "products" && slug.current ==$slugProduct][0]{
      _id,
      name,
      sku,
      "description": description.${locale},
      slug,
      coverImage {
        asset
      },
      coverThumbnail {
        asset
      },
      coverBlurry {
        asset
      },
      price,
      colors
    }
}`;
    const productData = await sanityClient.fetch(query, {
        type: params?.type,
        slugProduct: params?.slugProduct,
    });
    return {
        props: {
            productData,
            ...(await serverSideTranslations(locale, ["product-page", "favorite"])),
        },
    };
};
