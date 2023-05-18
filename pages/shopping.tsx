import React from "react";
import Image from "next/image";
import Link from "next/link";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import shoppingImg from "../public/assets/images/shopping-img.jpg";
import {sanityClient, urlFor} from "../sanity";

function Shopping({productsData}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const {t} = useTranslation("shopping-page");

    const getRgbColor = (color: string): string => {
        switch (color) {
            case "white":
                return "rgb(255, 255, 255)";
            case "orange":
                return "rgb(239, 115, 22)";
            case "green":
                return "rgb(34, 197, 94)";
            case "red":
                return "rgb(239, 68, 68)";
            default:
                return "rgb(0,0, 0)";
        }
    }

    return (
        <div className="w-full overflow-x-hidden dark:bg-neutral-800">
            <div className={"flex bg-white h-[40vw] relative border border-slate-200"}>
                <div className="w-2/5 relative h-[40vw] flex items-center">
                    <span
                        className={"text-neutral-950 absolute text-xs bottom-4 left-6 font-futura invisible sm:visible sm:bottom-8 md:font-bold md:text-lg"}>{t('promo-text')}</span>

                    <div
                        className="-mr-12 ml-auto text-center px-2 py-4 w-auto bg-white md:w-[420px] md:px-10 md:py-16">
                        <span
                            className={"text-center text-2xl font-extrabold italic font-futura text-gradient-simple sm:text-4xl md:text-6xl"}
                            dangerouslySetInnerHTML={{__html: t('discount')}}/>
                    </div>
                </div>
                <div className={"w-3/5 h-full bg-cover"}
                     style={{backgroundImage: `url('${shoppingImg.src}')`, backgroundPositionY: "-20px"}}/>
            </div>
            <main className="px-6 py-10 max-w-[75rem] mx-auto">
                {/*
                <PageHeader title={t("title")}/>
*/}
                <div
                    className="grid grid-cols-1 gap-4 md:grid-cols-4 sm:grid-cols-2"
                >
                    {productsData?.length > 0 ? (
                        productsData.map((product: any) => {
                            return (
                                <div key={product.sku}
                                     className="border border-slate-200 dark:border-neutral-600"
                                >
                                    <div className="relative bg-gray-300 dark:bg-neutral-700">
                                        <Link key={product.sku} href={`/category/${product.category}/${product.sku}`}>
                                            <Image
                                                src={urlFor(product.coverImage).url()}
                                                className="h-[300px] w-full object-contain"
                                                height={100}
                                                width={100}
                                                blurDataURL={product.coverBlurry.metadata.lqip}
                                                alt={product.name}
                                                priority
                                            />
                                        </Link>
                                    </div>
                                    <div>
                                        <div className={"flex items-center gap-2 px-4 py-2"}>
                                            {product.colors.map((color: any, key: number) => {
                                                return <button key={key}
                                                               className={`rounded-full border border-slate-200 dark:border-neutral-600 object-cover h-4 w-4`}
                                                               style={{backgroundColor: getRgbColor(color.name)}}></button>
                                            })}
                                            {
                                                product.totalColor > 3 &&
                                                <span className={"text-xs mt-1"}>+{product.totalColor - 3}</span>
                                            }
                                        </div>
                                        <div className={"px-4 pb-4 pt-2"}>
                                            <h4 className="text-sm dark:text-neutral-200 font-bold">
                                                <Link key={product.sku}
                                                      href={`/category/${product.category}/${product.sku}`}>
                                                    {product.name}
                                                </Link>
                                            </h4>
                                            <p className="font-medium dark:text-neutral-300" style={{fontSize: 12}}>
                                                {product.subtitle}
                                            </p>
                                            <p className="font-medium dark:text-neutral-300" style={{fontSize: 12}}>
                                                XAF {product.price}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className={"col-span-4"}>
                            {t("empty-list")},{" "}
                            <Link href={"/"} className="underline">
                                {t("back-to-home")}
                            </Link>
                        </p>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Shopping;

export const getServerSideProps: GetServerSideProps = async ({locale}: any) => {
    const query = `*[_type == "categories"]{
    _id,
    type,
    name,
    "products": *[_type == "products"]{
      _id,
      name,
      sku,
      "category": ^.type,
      "subtitle": subtitle.${locale},
      "sizeGuide": sizeGuide.${locale},
      "description": description.${locale},
      slug,
      coverImage {
        asset
      },
      coverThumbnail {
        asset
      },
     "coverBlurry":coverBlurry.asset->{
          metadata{
            lqip
          },
      },
      price,
       "totalColor": count(colors),
    colors[0...3]{
    totalQuantity,
      sizes,
      name,
    images[]{
        thumbnail{
            asset
        },
        blurry{
            asset
        },
      src{
        asset
      }
    }
  }
    }
}`;
    const datasSanity = await sanityClient.fetch(query, {
        locale: locale
    });

    /* const categoriesData = datasSanity.map((data: any) => {
         return {type: data.type, name: data.name};
     })*/
    let productsData: any = [];
    datasSanity.forEach((data: any) => {
        productsData.push(...data.products);
    })
    return {
        props: {
            //categoriesData,
            productsData,
            ...(await serverSideTranslations(locale, ["shopping-page", "favorite"])),
        },
    };
}
