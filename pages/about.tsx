import Image from "next/image";
import React from "react";
import passion from "../public/assets/images/about/passion.webp";
import perseverance from "../public/assets/images/about/perseverance.webp";
import teamwork from "../public/assets/images/about/teamwork.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const About = () => {
  const { t } = useTranslation("about");

  return (
    <div className="max-w-4xl mx-auto">
      <section className="text-center py-60 px-5">
        <h3 className="mb-6 text-neutral-400 text-sm font-bold">
          {t("our-mission.title")}
        </h3>
        <p
          dangerouslySetInnerHTML={{ __html: t("our-mission.content") }}
          className="text-7xl font-bold text-fluid-headline "
        />
      </section>
      <section id={"about-story"} className="text-center py-40">
        <h3 className="mb-6 text-neutral-400 text-sm font-bold">
          {t("our-story.title")}
        </h3>
        <Swiper
          effect={"cards"}
          slidesPerView={1}
          modules={[Navigation]}
          className="relative"
          navigation={true}
          speed={500}
          grabCursor={false}
          loop={true}
        >
          <SwiperSlide className={"w-full"}>
            <p className={"mx-auto text-center w-2/3 text-xl leading-9"}>
              {t("our-story.slide-one")}
            </p>
          </SwiperSlide>
          <SwiperSlide className={"w-full"}>
            <p className={"mx-auto text-center w-2/3 text-xl leading-9"}>
              {t("our-story.slide-two")}
            </p>
          </SwiperSlide>
          <SwiperSlide className={"w-full"}>
            <p className={"mx-auto text-center w-2/3 text-xl leading-9"}>
              {t("our-story.slide-three")}
            </p>
          </SwiperSlide>
          <SwiperSlide className={"w-full"}>
            <p className={"mx-auto text-center w-2/3 text-xl leading-9"}>
              {t("our-story.slide-four")}
            </p>
          </SwiperSlide>
        </Swiper>
      </section>
      <section className="text-center py-40">
        <h3 className="mb-12 text-neutral-400 text-sm font-bold">
          {t("our-values.title")}
        </h3>

        <div className="flex flex-wrap sm:flex-nowrap gap-y-4 mx-auto sm:gap-x-2 md:gap-x-4 px-6 w-full">
          <div className="aspect-[0.82] w-full sm:w-1/3 bg-slate-300 relative overflow-hidden">
            <Image src={passion} className="absolute" alt={t("our-values.card-two")} />
            <div className="absolute w-full h-full flex items-end">
              <div className="w-full h-max pb-6 pl-6 z-10">
                <p className="font-futura text-4xl sm:text-2xl lg:text-4xl w-min text-white">
                  {t("our-values.card-two")}
                </p>
              </div>

              <div className="bg-gradient-to-t transition ease-in-out delay-50 duration-300 sm:hover:opacity-100 from-orange-600 to-transparent w-full h-full sm:opacity-30 absolute flex items-end"></div>
            </div>
          </div>

          <div className="aspect-[0.82] w-full sm:w-1/3 bg-slate-300 relative overflow-hidden">
            <Image src={teamwork} className="absolute" alt={t("our-values.card-one")} />
            <div className="absolute w-full h-full flex items-end">
              <div className="w-full h-max pb-6 pl-6 z-10">
                <p className="font-futura text-4xl sm:text-2xl lg:text-4xl w-min text-white">
                  {t("our-values.card-one")}
                </p>
              </div>

              <div className="bg-gradient-to-t transition ease-in-out delay-50 duration-300 sm:hover:opacity-100 from-orange-600 to-transparent w-full h-full sm:opacity-30 absolute flex items-end"></div>
            </div>
          </div>

          <div className="aspect-[0.82] w-full sm:w-1/3 bg-slate-300 relative overflow-hidden">
            <Image src={perseverance} className="absolute" alt={t("our-values.card-three")} />
            <div className="absolute w-full h-full flex items-end">
              <div className="w-full h-max pb-6 pl-6 z-10">
                <p className="font-futura text-4xl sm:text-2xl lg:text-4xl w-min text-white">
                  {t("our-values.card-three")}
                </p>
              </div>

              <div className="bg-gradient-to-t transition ease-in-out delay-50 duration-300 sm:hover:opacity-100 from-orange-600 to-transparent w-full h-full sm:opacity-30 absolute flex items-end"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center py-60 px-10 lg:px-4">
        <h3 className="mb-6 text-neutral-400 text-sm font-bold">
          {t("our-attitude.title")}
        </h3>
        <p className="text-2xl text-fluid-copy leading-fluid-copy">
          {t("our-attitude.content")}
        </p>
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
}: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["about"])),
    },
  };
};

export default About;
