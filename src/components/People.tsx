import React, {useEffect, useState} from "react";
import OnePeople from "./OnePeople";
import {useTranslation} from "next-i18next";
import {EffectCards, FreeMode, Navigation} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import Link from "next/link";

export default function People({peoples}: any) {
    const {t} = useTranslation("gallery");
    const [userDeviceIsPhone, setUserDeviceIsPhone] = useState(false);
    const [loadSwiper, setLoaderSwiper] = useState(false);

    useEffect(() => {
        setUserDeviceIsPhone(window?.screen?.width < 600)
    }, [])

    useEffect(() => {
        setLoaderSwiper(true);
    }, [userDeviceIsPhone])

    return (
        <>
            <div id="our-community"
                 className="dark:bg-neutral-800 border-b border-neutral-200 dark:border-b dark:border-neutral-600">
                <div className="p-4">
                    <h1 className={"text-center text-6xl font-bold mb-8 text-gradient"}>
                        {t("title")}
                    </h1>
                    {loadSwiper && (<Swiper
                            effect={"cards"}
                            slidesPerView={1}
                            spaceBetween={10}
                            modules={userDeviceIsPhone ? [FreeMode, EffectCards] : [FreeMode, Navigation]}
                            className="relative"
                            grabCursor={true}
                            navigation={!userDeviceIsPhone}
                            loop={true}
                            freeMode={true}
                            centeredSlides={true}
                            speed={userDeviceIsPhone ? 10 : 500}
                            breakpoints={
                                {
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
                                    }
                                }
                            }
                        >
                            {peoples.map((people: { src: any; title: string }, index: number) => {
                                return <SwiperSlide key={index}>
                                    <OnePeople
                                        blurUrl={people.src.metadata.lqip}
                                        img={people.src.url}
                                        title={people.title}
                                        width={people.src.metadata.dimensions.width}
                                    />
                                </SwiperSlide>;
                            })}
                        </Swiper>
                    )}

                    <p className={"pt-5 sm:pt-10 text-center"}>
                        <Link className={"text-orange"} href={"/gallery"}>{t("show-more")}</Link>
                    </p>
                </div>
            </div>
        </>
    );
}

