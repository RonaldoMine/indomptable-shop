import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { sanityClient, urlFor } from "../sanity";
// import bannerEn from "../public/assets/images/banner-shop-page-en.webp";
// import bannerFr from "../public/assets/images/banner-shop-page-fr.webp";
import InputRadio from "../src/components/InputRadio";
import { useRouter } from "next/router";

function Shopping({
  productsData,
  badgeParam,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t, i18n } = useTranslation("shopping-page");
  const router = useRouter();

  const getRgbColor = (color: string): string => {
    switch (color) {
      case "white":
        return "rgb(255, 255, 255)";
      case "orange":
        return "rgb(239, 115, 22)";
      case "green":
        return "rgb(34, 197, 94)";
      case "blue":
        return "rgb(50, 130, 246)";
      case "pink":
        return "rgb(236, 72, 153)";
      case "red":
        return "rgb(239, 68, 68)";
      default:
        return "rgb(0,0, 0)";
    }
  };

  const handleFilter = () => {
    router.push("?badge=new");
  };

  const handleResetFilter = () => {
    router.push("");
  };

  return (
    <div className="w-full overflow-x-hidden dark:bg-neutral-800">
      <div
        className={
          "flex py-10 px-6 dark:bg-neutral-800 border-b-neutral-200 dark:border-b-neutral-600 border-b"
        }
      >
        <div className="flex text-center px-4 flex-col gap-3 w-full max-w-6xl mx-auto py-10 bg-neutral-100 dark:bg-neutral-700">
          <span
            className="font-title text-4xl sm:text-6xl"
            dangerouslySetInnerHTML={{
              __html: t("discount"),
            }}
          />
          <p>{t("promo-text")}</p>
        </div>

        {/*     <Image
          src={i18n.language === "fr" ? bannerFr : bannerEn}
          alt="Banner Shop"
          className="w-full"
        /> */}
      </div>
      <main className="sm:px-24 px-8 pt-10 pb-20 max-w-[75rem] mx-auto">
        <div className="flex gap-4 px-2 py-1 mb-4">
          <InputRadio
            label={t("filter.all")}
            name="filter"
            defaultChecked={!badgeParam}
            id="all"
            onClick={handleResetFilter}
          />
          <InputRadio
            label={t("filter.new")}
            name="filter"
            id="new"
            onClick={handleFilter}
            defaultChecked={badgeParam && badgeParam === "new"}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {productsData?.length > 0 ? (
            productsData.map((product: any) => {
              return (
                <div
                  key={product.sku}
                  className="border border-slate-200 dark:border-neutral-600"
                >
                  <div className="relative group">
                    <Link
                      key={product.sku}
                      href={`/category/${product.category}/${product.sku}`}
                    >
                      <Image
                        src={urlFor(product.colors[0].images[1]).quality(100).url()}
                        className="w-full aspect-square object-cover group-hover:block hidden"
                        height={300}
                        width={300}
                        blurDataURL={urlFor(product.colors[0].images[1])
                          .blur(70)
                          .quality(30)
                          .url()}
                        alt={product.name}
                        priority
                      />
                      <Image
                        src={urlFor(product.coverImage).quality(100).url()}
                        className="w-full aspect-square object-cover group-hover:hidden block"
                        height={300}
                        width={300}
                        blurDataURL={urlFor(product.coverImage)
                          .blur(70)
                          .quality(30)
                          .url()}
                        alt={product.name}
                        priority
                      />
                    </Link>
                  </div>
                  <div>
                    <div className={"flex items-center gap-2 px-4 py-2"}>
                      {product.colors.map((color: any, key: number) => {
                        return (
                          <div
                            key={key}
                            className={`rounded-full border border-slate-400 dark:border-neutral-600 object-cover h-4 w-4`}
                            style={{ backgroundColor: getRgbColor(color.name) }}
                          />
                        );
                      })}
                      {product.totalColor > 3 && (
                        <span className={"text-xs mt-1"}>
                          +{product.totalColor - 3}
                        </span>
                      )}
                    </div>
                    <div className={"px-4 pb-4 pt-2"}>
                      <h4 className="text-sm dark:text-neutral-200 font-bold">
                        <Link
                          key={product.sku}
                          href={`/category/${product.category}/${product.sku}`}
                        >
                          {product.name}
                        </Link>
                      </h4>
                      <p className="font-medium dark:text-neutral-300">
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

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  query,
}: any) => {
  const badge = query?.badge ?? null;

  const sanityQuery = `*[_type == "categories"]{
    _id,
    type,
    name,
    "products": *[_type == "products" ${
      badge ? "&& '" + badge + "' in badges" : ""
    }] | order(_createdAt desc){
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
      price,
      pricePromo,
       "totalColor": count(colors),
    colors[0...3]{
      totalQuantity,
      sizes,
      name, 
      images[]{
      "asset":src.asset
      }
    }
  }
}`;
  const datasSanity = await sanityClient.fetch(sanityQuery, {
    locale: locale,
  });
  /* const categoriesData = datasSanity.map((data: any) => {
         return {type: data.type, name: data.name};
     })*/
  let productsData: any = [];
  datasSanity.forEach((data: any) => {
    productsData.push(...data.products);
  });
  return {
    props: {
      //categoriesData,
      productsData,
      badgeParam: badge,
      ...(await serverSideTranslations(locale, ["shopping-page", "favorite"])),
    },
  };
};
