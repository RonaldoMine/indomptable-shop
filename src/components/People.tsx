import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { FreeMode, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";

export default function People({ peoples }: any) {
  const { t } = useTranslation("gallery");

  return (
    <>
      <div
        id="our-community"
        className="dark:bg-neutral-800 border-b-neutral-200 dark:border-b-neutral-600"
      >
        <div className="p-4">
          <h1
            className={
              "text-center text-6xl font-bold mb-8 text-gradient-simple"
            }
          >
            {t("title")}
          </h1>
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            modules={[FreeMode, Navigation]}
            className="relative"
            grabCursor={true}
            navigation={true}
            loop={true}
            /* centeredSlides={true} */
            speed={500}
            breakpoints={{
              600: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 50,
              },
              1400: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
          >
            {peoples.map(
              (people: { src: any; title: string }, index: number) => {
                return (
                  <SwiperSlide key={index}>
                    <Image
                      src={people.src.url}
                      alt={people.title}
                      placeholder="blur"
                      blurDataURL={people.src.metadata.lqip}
                      height={100}
                      width={people.src.metadata.dimensions.width}
                      className={
                        "aspect-[0.85] w-full object-cover rounded duration-100 mb-4"
                      }
                    />
                  </SwiperSlide>
                );
              }
            )}
          </Swiper>
          <p className={"pt-5 sm:pt-10 text-center"}>
            <Link className={"text-orange"} href={"/gallery"}>
              {t("show-more")}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
