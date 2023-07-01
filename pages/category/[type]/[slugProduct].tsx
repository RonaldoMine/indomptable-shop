import Image from "next/image";
import React, { useState } from "react";
import { RadioGroup } from "@headlessui/react";
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

type Color = {
  name: string;
  images: {
    src: ImageAsset
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
  const { addProductToFavorite } = useProductToFavorite();
  const [toastProductId, setToastProductId] = useState("0");

  const handleOnChangeSize = (selected: any) => {
    setSelectedSize(selected);
    setErrorSizeUnselected("");
  };

  const handleOnChangeColor = (selected: any) => {
    setSelectedColor(selected);
    setAvailableSizes(selected.sizes);
    setSelectedSize(null);
    setErrorSizeUnselected("");
  };

  const handleCloseToastProduct = () => {
    setOnAddProduct(false);
    toast.dismiss(toastProductId);
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
            thumbnail: selectedColor.images[0].src.url + '?w=128',
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
                  className={`object-contain w-full mb-4 max-w-full h-auto aspect-ratio[${image.src.metadata.dimensions.aspectRatio}]`}
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
                    className={`object-contain w-full mb-4 max-w-full h-auto aspect-ratio[${image.src.metadata.dimensions.aspectRatio}]`}
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
                    className={`object-cover w-[48%] mb-4 max-w-full h-auto snap-center aspect-ratio[${image.src.metadata.dimensions.aspectRatio}]`}
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
                        src={color.images[0].src.url+'?w=96'}
                        blurDataURL={color.images[0].src.metadata.lqip}
                        alt={color.name}
                        quality={100}
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
                </div>
              </RadioGroup>
            </div>

            <p className="mt-8 dark:text-neutral-300">{product.description}</p>

            <p className="mt-3 text-slate-400 dark:text-neutral-400 text-sm">
              {t("important-note")}
            </p>
            <div className="mt-4 flex flex-wrap gap-5">
              <ButtonGradient
                className={"w-full"}
                onClick={handleAddProductOnCart}
              >
                {t("add-to-basket")}
              </ButtonGradient>
              <ButtonBorder
                className={"w-full"}
                onClick={handleAddProductToFavorite}
              >
                {t("add-to-favorite")}
              </ButtonBorder>
            </div>
            <p className="mt-12"></p>
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
  const productData = await sanityClient.fetch(query, {
    type: params?.type,
    slugProduct: params?.slugProduct,
  });
  return {
    props: {
      productData,
      ...(await serverSideTranslations(locale, [
        "product-page",
        "favorite",
        "common",
      ])),
    },
  };
};
