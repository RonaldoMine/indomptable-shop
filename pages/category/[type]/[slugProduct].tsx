import Image from "next/image";
import React, { Fragment, useEffect, useMemo, useState, useRef } from "react";
import { Dialog, Listbox, RadioGroup, Transition } from "@headlessui/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { sanityClient, urlFor } from "../../../sanity";
import { useBasket } from "../../../src/context/BasketContext";
import { toast } from "react-toastify";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import ToastProduct from "../../../src/components/ToastProduct";
import useProductToFavorite from "../../../src/hooks/useProductToFavorite";
import { ButtonBorder, ButtonGradient } from "../../../src/components/Button";
import { ImageAsset } from "sanity";
import { LuBellRing, LuCheck, LuChevronsUpDown } from "react-icons/lu";
import Alert from "../../../src/components/Alert";
import Loader from "../../../src/components/Loader";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";

type Color = {
  name: string;
  images: {
    src: ImageAsset;
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
  similaryProductsData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t, i18n } = useTranslation("product-page");
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    mode: "onTouched",
    defaultValues: { email: "", unavailableSizeSelected: [] },
  });
  const [expanded, setExpanded] = useState({ one: false, two: false });
  const [errorSizeUnselected, setErrorSizeUnselected] = useState("");
  const [onAddProduct, setOnAddProduct] = useState(false);
  const { dispatch } = useBasket();
  const product = productData[0].product;
  const similaryProducts = similaryProductsData[0].products;
  const colors = product.colors;
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [isOpen, setIsOpen] = useState(false);

  const [allSizes, setAllSizes] = useState<any>(selectedColor.sizes); //all color sizes
  const unavailableSizes = useMemo(
    () => allSizes.filter((size: any) => size.quantity == 0),
    [allSizes]
  ); //all unavailable sizes
  const [unavailableSizeSelected, setUnavailableSizeSelected] = useState([]); //unavailable size selected
  const [selectedSize, setSelectedSize] = useState(allSizes[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [configAlert, setConfigAlert] = useState({
    title: "",
    text: "",
    status: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const { addProductToFavorite } = useProductToFavorite();
  const [toastProductId, setToastProductId] = useState("0");

  const handleOnChangeSize = (selected: any) => {
    setSelectedSize(selected);
    setErrorSizeUnselected("");
  };

  const handleOnChangeColor = (selected: any) => {
    setSelectedColor(selected);
    //setAvailableSizes(selected.sizes);
    setSelectedSize(null);
    setErrorSizeUnselected("");
  };

  const handleCloseToastProduct = () => {
    toast.dismiss(toastProductId);
    setOnAddProduct(false);
  };

  const handleNotifySizeUpdate = async (values: any) => {
    setIsLoading(true);
    const sizes = values.unavailableSizeSelected.map((size: any) => size.label);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        slug: product?.slug.current,
        sizes,
        lang: i18n.language,
      }),
    };
    const response = await fetch("/api/notify-size-update", options);
    const result = await response.json();
    const status = response.status;
    if (status == 200) {
      setConfigAlert({
        title: "Success",
        text: result.message,
        status: "success",
      });
    } else {
      setConfigAlert({
        title: "Erreur",
        text: result.message,
        status: status === 400 ? "warning" : "danger",
      });
    }
    setIsLoading(false);
    setShowAlert(true);
    setIsOpen(false);
  };

  const handleAddProductOnCart = () => {
    if (selectedSize != null && selectedSize?.label !== "") {
      dispatch({
        type: "ADD_PRODUCT",
        payload: {
          sku: product?.sku,
          qty: 1,
          price: product?.pricePromo > 0 ? product?.pricePromo : product?.price,
          size: selectedSize.label,
          color: selectedColor.name,
          img: selectedColor.images[0].src.url,
          name: product?.name,
        },
      });
      const toastId = toast(
        <ToastProduct
          product={{
            ...product,
            thumbnail: selectedColor.images[0].src.url + "?w=128",
          }}
          onClose={handleCloseToastProduct}
          size={selectedSize.label}
        />,
        {
          autoClose: false,
          className: "sm:w-[450px] w-full sm:right-[9rem] dark:bg-neutral-800",
          onClose: () => setOnAddProduct(false),
          onOpen: () => setOnAddProduct(true),
          closeButton: false,
        }
      );
      setToastProductId(toastId.toString());
      // setSelectedSize(availableSizes[0]);
    } else {
      setErrorSizeUnselected(`${t("select-size")}`);
    }
  };
  const handleAddProductToFavorite = () => {
    addProductToFavorite({ ...product, img: urlFor(product.coverImage).url() });
  };

  const handleOpenDialogNotifySizeUpdate = () => {
    reset();
    setUnavailableSizeSelected([]);
    setIsOpen(true);
  };

  useEffect(() => {
    setAllSizes(selectedColor.sizes);
  }, [selectedColor]);

  return (
    <>
      <div className="w-full overflow-x-hidden dark:bg-neutral-800 relative">
        {onAddProduct && (
          <div
            className="transition-all fixed inset-0 bg-neutral-500 bg-opacity-70 z-10"
            onClick={handleCloseToastProduct}
          ></div>
        )}
        <div className="min-h-full max-w-[75rem] mx-auto px-8 sm:px-12 py-20 grid grid-cols-1 min-[960px]:grid-cols-6 sm:gap-14">
          <div
            id="left-pane"
            className="md:columns-2 columns-1 leading-none gap-x-4 hidden min-[960px]:block min-[960px]:col-span-3 min-[1100px]:col-span-4"
          >
            {selectedColor?.images?.map((image: any, index: number) => {
              return (
                <Image
                  key={index}
                  className={`object-cover w-full mb-4 max-w-full h-auto aspect-[2/3]`}
                  placeholder="blur"
                  width={image.src.metadata.dimensions.width}
                  height={image.src.metadata.dimensions.height}
                  blurDataURL={image.src.metadata.lqip}
                  src={image.src.url}
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
            <p className="mt-1">{product.subtitle}</p>
            <p className="mt-5">
              XAF{" "}
              <span className={"text-md mr-2 font-bold"}>
                {product?.pricePromo}
              </span>
              <span
                className={`${
                  product?.pricePromo != null ? "line-through text-sm" : ""
                } dark:text-neutral-300`}
              >
                {product?.price}
              </span>
            </p>
            <div
              id="left-pan"
              className="sm:columns-2 hidden sm:block min-[960px]:hidden leading-none gap-x-4"
            >
              {selectedColor?.images?.map((image: any, index: number) => {
                return (
                  <Image
                    key={index}
                    className={`object-contain w-full mb-4 max-w-full h-auto aspect-square`}
                    placeholder="blur"
                    width={image.src.metadata.dimensions.width}
                    height={image.src.metadata.dimensions.height}
                    blurDataURL={image.src.metadata.lqip}
                    src={image.src.url}
                    alt={"image " + index}
                  />
                );
              })}
            </div>

            <div className="sm:hidden flex overflow-x-auto space-x-5 mt-5 snap-x snap-mandatory">
              {selectedColor?.images?.map((image: any, index: number) => {
                return (
                  <Image
                    key={index}
                    className={`object-cover w-[48%] mb-4 max-w-full h-auto snap-center aspect-[2/3]`}
                    placeholder="blur"
                    // fill={true}
                    width={image.src.metadata.dimensions.width}
                    height={image.src.metadata.dimensions.height}
                    blurDataURL={image.src.metadata.lqip}
                    src={image.src.url}
                    alt={"image " + index}
                  />
                );
              })}
            </div>

            {/* <!-- Colors --> */}
            <div className="mt-8">
              <h3 className={`text-sm font-medium dark:text-neutral-400`}>
                {t("colors")}
              </h3>
              <RadioGroup
                value={selectedColor}
                onChange={(selected: Color) => handleOnChangeColor(selected)}
                className={
                  "mt-4 flex sm:flex-wrap overflow-x-scroll sm:overflow-hidden p-2 items-center gap-3"
                }
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
                    <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-20 lg:h-20 relative">
                      <Image
                        src={color.images[0].src.url + "?w=96"}
                        blurDataURL={color.images[0].src.metadata.lqip}
                        alt={color.name}
                        quality={100}
                        fill={true}
                        className={"object-cover aspect-square w-full"}
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
              </div>
              <RadioGroup
                value={selectedSize}
                onChange={(selected: any) => handleOnChangeSize(selected)}
                className={`mt-4 mb-2 ${
                  errorSizeUnselected ? "border border-red-500 rounded-md" : ""
                }`}
              >
                <div className="grid grid-cols-4 gap-3 sm:grid-cols-8 lg:grid-cols-4">
                  {allSizes.map((size: any) => {
                    return (
                      <RadioGroup.Option
                        value={size}
                        key={size.label}
                        disabled={size.quantity <= 0}
                        className={({ active }) =>
                          classNames(
                            size.quantity > 0
                              ? "bg-white shadow-sm text-gray-900 cursor-pointer dark:bg-transparent dark:text-neutral-400 dark:border-neutral-400"
                              : "bg-gray-50 text-gray-300 dark:bg-transparent dark:text-neutral-700 cursor-not-allowed",
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
                              {size.label}
                            </RadioGroup.Label>
                            {size.quantity > 0 ? (
                              <span
                                className={classNames(
                                  active ? "border" : "",
                                  checked
                                    ? "dark:bg-slate-100 ring-2 ring-slate-700"
                                    : "",
                                  "pointer-events-none absolute -inset-px rounded-md"
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200 dark:border-gray-400"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200 dark:text-gray-400"
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
                    );
                  })}
                </div>
              </RadioGroup>
            </div>

            <p className="mt-8 dark:text-neutral-300">{product.description}</p>

            <p className="mt-3 text-slate-400 dark:text-neutral-400 text-sm">
              {t("important-note")}
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <ButtonGradient
                className={"flex-grow-[2]"}
                onClick={handleAddProductOnCart}
              >
                {t("add-to-basket")}
              </ButtonGradient>
              <ButtonBorder
                className="disabled:text-neutral-300 disabled:border-neutral-300 dark:border-neutral-700"
                disabled={unavailableSizes.length === 0}
                onClick={handleOpenDialogNotifySizeUpdate}
              >
                <LuBellRing size={"1rem"} className="dark:text-neutral-700" />
              </ButtonBorder>
              <Dialog
                as={"div"}
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-50"
              >
                {/* The backdrop, rendered as a fixed sibling to the panel container */}
                <div
                  className="fixed inset-0 bg-black/30 dark:bg-white/30"
                  aria-hidden="true"
                />

                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                  {/* The actual dialog panel  */}
                  <Dialog.Panel className="mx-auto flex flex-col justify-between min-h-[18rem] max-w-lg rounded bg-white dark:bg-neutral-800 p-6">
                    <form onSubmit={handleSubmit(handleNotifySizeUpdate)}>
                      <div aria-label="panel-wrapper">
                        <div aria-label="dialog-header">
                          <Dialog.Title className={"text-2xl font-bold mb-1"}>
                            {t("modal.title")}
                          </Dialog.Title>
                          <Dialog.Description as={"div"}>
                            <p>{t("modal.content")}</p>
                          </Dialog.Description>
                        </div>
                        <div className="flex flex-col min-[560px]:flex-row gap-x-2 mt-6">
                          <input
                            className={`outline-none w-full min-[560px]:px-3 min-[560px]:py-0 min-[560px]:mb-0 p-3 mb-3 border border-neutral-200
                            ${
                              errors.email?.message && isDirty
                                ? "border-2 border-red-500"
                                : "focus:border-2 focus:border-neutral-300 border-neutral-300"
                            }`}
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                              required: {
                                value: true,
                                message: "Enter a valid email",
                              },
                              pattern: {
                                value:
                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Not a valid email",
                              },
                              disabled: isLoading,
                            })}
                          />
                          <div className="top-16 w-full min-[560px]:w-52">
                            <Listbox
                              value={unavailableSizeSelected}
                              {...register("unavailableSizeSelected", {
                                required: {
                                  value: true,
                                  message: "Select size",
                                },
                              })}
                              onChange={(values) => {
                                setUnavailableSizeSelected(values);
                                setValue("unavailableSizeSelected", values);
                              }}
                              multiple
                            >
                              <div className="relative">
                                <Listbox.Button
                                  className={`min-h-[40px] relative w-full cursor-default rounded-lg dark:bg-inherit bg-white py-2 pl-3 pr-10 text-left shadow-md border-2 border-neutral-100 focus:outline-none focus-visible:border-neutral-500 dark:focus-visible:border-neutral-200 focus-visible:ring-2 focus-visible:ring-white dark:focus-visible:ring-black focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm
                                    ${
                                      unavailableSizeSelected.length === 0 &&
                                      isDirty
                                        ? "border-2 border-red-500"
                                        : ""
                                    }`}
                                >
                                  {unavailableSizeSelected
                                    .map((size: any) => size.label)
                                    .join(", ")}
                                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <LuChevronsUpDown
                                      className="h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  </span>
                                  {unavailableSizeSelected.length === 0 && (
                                    <span className="aboslute">
                                      {t("sizes")}
                                    </span>
                                  )}
                                </Listbox.Button>
                                <Transition
                                  as={Fragment}
                                  leave="transition ease-in duration-150"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-neutral-600 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {unavailableSizes.map(
                                      (unavailableSize: any) => (
                                        <Listbox.Option
                                          key={unavailableSize.label}
                                          value={unavailableSize}
                                          className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                              active
                                                ? "bg-neutral-100 dark:bg-neutral-400 dark:text-neutral-100 text-neutral-900"
                                                : "text-gray-900 dark:text-neutral-100"
                                            }`
                                          }
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                {unavailableSize.label}
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 dark:text-white text-neutral-600">
                                                  <LuCheck
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                  />
                                                </span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                      )
                                    )}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </Listbox>
                          </div>
                        </div>
                      </div>
                      <div className="flex min-[560px]:mt-6 mt-14">
                        {isLoading ? (
                          <Loader className="mx-auto" />
                        ) : (
                          <>
                            <ButtonGradient className="mr-3 disabled:opacity-30">
                              {t("modal.buttons.confirm")}
                            </ButtonGradient>
                            <ButtonBorder
                              onClick={() => {
                                setIsOpen(false);
                              }}
                            >
                              {t("modal.buttons.cancel")}
                            </ButtonBorder>
                          </>
                        )}
                      </div>
                    </form>
                  </Dialog.Panel>
                </div>
              </Dialog>
              <ButtonBorder
                className={"w-full"}
                onClick={handleAddProductToFavorite}
              >
                {t("add-to-favorite")}
              </ButtonBorder>
            </div>
            <div className="mt-12">
              <p className="dark:text-neutral-400 capitalize">
                {t("shown")}: {selectedColor?.name}
              </p>
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
                <div className={`mt-4 ${!expanded.one && "hidden"}`}>
                  {product.sizeGuide}
                </div>
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

        <div className="p-4 max-w-screen-2xl mx-auto">
          <h1 className={"text-xl sm:text-2xl mb-10"}>{t("product-may-like")}</h1>
          <Swiper
            slidesPerView={1.5}
            spaceBetween={10}
            modules={[FreeMode, Navigation]}
            className="relative"
            grabCursor={true}
            navigation={true}
            /* centeredSlides={true} */
            speed={500}
            breakpoints={{
              600: {
                slidesPerView: 2.10,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 2.9,
                spaceBetween: 10,
              },
            }}
          >
            {similaryProducts.map((product: any, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <div className="cursor-pointer"
                    onClick={() =>
                      window.location.assign(
                        `/category/${product.category}/${product.sku}`
                      )
                    }
                  >
                    <Image
                      src={urlFor(product.coverImage).quality(100).url()}
                      alt={product.title}
                      placeholder="blur"
                      blurDataURL={urlFor(product.coverImage)
                        .blur(70)
                        .quality(30)
                        .url()}
                      height={100}
                      width={500}
                      className={
                        "aspect-[0.9] w-full  object-cover rounded mb-4"
                      }
                    />
                    <div className="py-2 px-2">
                      <h4 className="dark:text-neutral-200 font-bold">
                        {product.name}
                      </h4>
                      <p className="font-medium dark:text-neutral-300 text-neutral-950 text-opacity-30 mb-2">
                        {product.subtitle}
                      </p>

                      <p className="font-medium dark:text-neutral-300">
                        XAF{" "}
                        <span className={"text-md mr-1 font-bold"}>
                          {product?.pricePromo}
                        </span>
                        <span
                          className={`${
                            product?.pricePromo != null
                              ? "line-through text-sm"
                              : ""
                          } dark:text-neutral-300`}
                        >
                          {product?.price}
                        </span>
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <Alert
        type={configAlert.status}
        visible={showAlert}
        setVisible={setShowAlert}
        title={configAlert.title}
        text={configAlert.text}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
}: any) => {
  const querySinglePorudct = `*[_type == "categories" && type == $type]{
    _id,
    type,
    name,
    "product": *[_type == "products" && slug.current ==$slugProduct][0]{
      _id,
      name,
      sku,
      "subtitle": subtitle.${locale},
      "sizeGuide": sizeGuide.${locale},
      "description": description.${locale},
      slug,
      coverImage {
        asset
      },
      price,
      pricePromo,
    colors[]{
    totalQuantity,
      sizes,
      name,
    images[]{
      "src":src.asset->{
        url,
        metadata{
          dimensions{
          width,
            height,
            aspectRatio
          },
        lqip
        }
      }
    }
  }
    }
}`;
  const productData = await sanityClient.fetch(querySinglePorudct, {
    type: params?.type,
    slugProduct: params?.slugProduct,
  });
  if (productData.length === 0 || productData[0].product == null) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  const querySimilarProducts = `*[_type == "categories"]{
    "products": *[_type == "products" && slug.current != $slugProduct] | order(_createdAt desc){
      _id,
      name,
      sku,
      "category": ^.type,
      "subtitle": subtitle.${locale},
      slug,
      coverImage {
        asset
      },
      price,
      pricePromo,
  }
}`;
  const similaryProductsData = await sanityClient.fetch(querySimilarProducts, {
    type: params?.type,
    slugProduct: params?.slugProduct,
  });
  return {
    props: {
      productData,
      similaryProductsData,
      ...(await serverSideTranslations(locale, [
        "product-page",
        "favorite",
        "common",
      ])),
    },
  };
};
