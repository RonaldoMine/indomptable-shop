import banner_photo from "../public/assets/images/banner-home.webp";
import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import { sanityClient } from "../sanity";
import Contact from "../src/components/Contact";
import Newsletter from "../src/components/Newsletter";
import People from "../src/components/People";
import OurStory from "../src/components/OurStory";
import { useTranslation } from "next-i18next";
import { shuffleArray } from "../src/utils";
import { useRouter } from "next/router";
import Link from "next/link";
import { ButtonBorder, ButtonGradient } from "../src/components/Button";
import { BsFacebook, BsInstagram } from "react-icons/bs";

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
      <div className="overflow-hidden max-w-6xl mx-auto">
        <div className="w-full mx-auto h-[60vw] md:h-[50vw] lg:h-[40vw] max-h-[600px] relative px-2 py-2">
          <Image
            src={banner_photo}
            placeholder="blur"
            fill={true}
            alt="banner photo"
            className="max-w-full h-auto object-cover"
          />
          <div className="absolute flex flex-col md:px-[3vw] h-full w-full justify-center items-start">
            <p className="font-title w-min text-white text-6xl md:text-[6rem] break-words text-left leading-none ">
              {t("banner-title")}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 gap-4">
          <div className="h-[50vw] max-h-[400px] bg-gray-200 flex flex-col justify-between py-6 px-4 md:px-10">
            <h1 className="font-title font-extrabold text-4xl md:text-6xl">
              GIFT IDEAS
            </h1>
            <ButtonGradient
              onClick={() => router.push("/shopping")}
              className="w-40"
            >
              Shop now
            </ButtonGradient>
          </div>
          <div className="grid gap-4">
            <div className="bg-gray-200 flex flex-col justify-between gap-4 px-4 py-6 md:px-10">
              <h1 className="font-title font-extrabold text-4xl">
                Explore what&apos;s new here
              </h1>
              <Link
                href={"/shopping?badge=new"}
                className="border-slate-700 border-2 px-4 py-3 font-copy dark:border dark:border-neutral-600 dark:text-neutral-300 rounded-button w-32"
              >
                Shop now
              </Link>
            </div>
            <div className="bg-gray-200 flex flex-col justify-between gap-4 py-6 px-4 md:px-10">
              <h1 className="font-title font-extrabold text-2xl md:text-4xl">
                JOIN US
              </h1>
              <div className="flex gap-2">
                <Link
                  className="text-4xl"
                  href={
                    "https://www.facebook.com/profile.php?id=100089070463423"
                  }
                >
                  <BsFacebook />
                </Link>
                <Link
                  className="text-4xl"
                  href={
                    "https://www.facebook.com/profile.php?id=100089070463423"
                  }
                >
                  <BsInstagram />
                </Link>
              </div>
            </div>
          </div>
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
