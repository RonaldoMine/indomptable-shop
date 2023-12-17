import shirt_black from "../public/assets/images/tshirt-black-desktop.png";
import shirt_white from "../public/assets/images/tshirt-white-desktop.png";
import banner_photo from "../public/assets/images/banner-home.webp";
import React, { useEffect, useState, Fragment } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import { sanityClient } from "../sanity";
import HomeCardItem, { HomeCardType } from "../src/components/HomeCardItem";
import Contact from "../src/components/Contact";
import Newsletter from "../src/components/Newsletter";
import People from "../src/components/People";
import OurStory from "../src/components/OurStory";
import { useTranslation } from "next-i18next";
import { shuffleArray } from "../src/utils";
import { Dialog, Transition } from "@headlessui/react";
import blackFridayEn from "../public/assets/images/popup-black-friday-en.webp";
import blackFridayFr from "../public/assets/images/popup-black-friday-fr.webp";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";

export default function Home({
  peoples,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t, i18n } = useTranslation("home");
  const router = useRouter();
  // const [popupVisibility, setPopupVisibility] = useState(false);
  // const blackFridrayPopup = () => {
  //   setTimeout(() => {
  //     setPopupVisibility(true);
  //   }, 3000);
  // };
  // const handleClosePopup = () => {
  //   setPopupVisibility(false);
  // };
  /* 
  useEffect(() => {
    blackFridrayPopup();
  }, []); */
  // console.log(peoples)
  return (
    <>
      <div className="w-full mx-auto h-[40vw] relative overflow-hidden max-w-screen-lg mt-5 sm:mt-10">
        <Image
          src={banner_photo}
          placeholder="blur"
          fill={true}
          alt="banner photo"
          className="max-w-full h-auto object-cover"
        />
        <div className="absolute flex flex-col pt-[6vw] md:px-[3vw] md:pb-[5vw] h-full w-full md:justify-between justify-center items-center md:items-start">
          <p className="font-title sm:w-min text-white text-5xl md:text-[6rem] break-words text-center md:text-left leading-none ">
            {t("banner-title")}
          </p>
          <button className="bg-gradient hidden sm:block md:self-start py-4 px-10 mt-6  text-white font-space  dark:text-black dark:from-slate-200 dark:to-slate-50 dark:bg-gradient-to-bl">
            Shop now
          </button>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto">
        {/* <div className="relative grid sm:grid-cols-2 grid-cols-1">
          <HomeCardItem
            title={"WHITE"}
            typeClass={HomeCardType.left}
            alt={"White TeeShrit"}
            src={shirt_white}
            typeCategory={"t-shirt"}
            slugProduct={"indomptable-the-mboa"}
          />
          <HomeCardItem
            title={"black"}
            typeClass={HomeCardType.right}
            alt={"Black TeeShrit"}
            src={shirt_black}
            typeCategory={"t-shirt"}
            slugProduct={"indomptable-the-hemle"}
          />
        </div> */}
        <OurStory />
      </div>
      <Newsletter />
      <div className="max-w-screen-2xl mx-auto">
        <People peoples={peoples} />
        <Contact />
      </div>

      {/* <Transition appear show={popupVisibility} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[9999]"
          onClose={handleClosePopup}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-80"></div>
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="relative">
                  <Image
                    onClick={() => router.push("/shopping")}
                    src={i18n.language === "fr" ? blackFridayFr : blackFridayEn}
                    alt={"Black Friday - Banner"}
                    placeholder="blur"
                    className={
                      "lg:max-h-[600px] w-full object-cover"
                    }
                  />
                  <span
                    onClick={handleClosePopup}
                    className={
                      "w-6 h-6 rounded-full bg-opacity-20 bg-red hover:bg-opacity-100 absolute right-2 top-2 flex items-center hover:cursor-pointer"
                    }
                  >
                    <AiOutlineClose
                      className={"mx-auto text-white"}
                      size={10}
                    />
                  </span>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition> */}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  locale,
}: any) => {
  const query = `*[_type == "people" && onHomePage == true] | order(publishedAt desc)[0..9]{
    _id,
    title,
        "src": src.asset->{
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
}`;
  const peoples: any = await sanityClient.fetch(query);
  return {
    props: {
      peoples: shuffleArray(peoples),
      ...(await serverSideTranslations(locale, [
        "contact",
        "gallery",
        "newsletter",
        "our-story",
        "home",
      ])),
    },
  };
};
