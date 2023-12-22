import main_banner from "../public/assets/images/main-banner.webp";
import gift_banner from "../public/assets/images/gift-banner.webp";
import join_us_banner from "../public/assets/images/join-us-banner.webp";
import new_items_banner from "../public/assets/images/new-items-banner.webp";
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
import { ButtonGradient } from "../src/components/Button";
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
            src={main_banner}
            placeholder="blur"
            fill={true}
            alt="main banner photo"
            className="max-w-full h-auto object-cover"
          />
          <div className="absolute flex flex-col md:px-[3vw] h-full w-full justify-center items-start">
            {/* <p className="font-title w-min text-white text-6xl md:text-[6rem] break-words text-left leading-none ">
              {t("banner-title")}
            </p> */}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 mt-3 gap-4 mx-3 md:mt-8 md:mx-8 min-[1200px]:mx-0">
          <div className="h-[50vw] max-h-[400px] relative bg-gray-200">
            <div className="absolute left-4 top-2  md:top-4 md:left-6 z-20 text-white">
              <h1 className="font-title text-4xl md:text-6xl mb-2">
                GIFT IDEAS
              </h1>
              <ButtonGradient
                onClick={() => router.push("/shopping")}
                className=""
              >
                Shop now
              </ButtonGradient>
            </div>
            <Image
              src={gift_banner}
              alt="gift banner"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              placeholder="blur"
              className="object-cover w-full h-auto"
            />
          </div>
          <div className="grid h-[50vw] max-h-[400px] gap-4">
            <div className="bg-gray-200 max-h-[200px] relative">
              <div className="absolute z-20 text-white bottom-4 left-4">
                <h1 className="font-title text-2xl md:text-4xl">
                  Explore what&apos;s new here
                </h1>
                <Link className="underline" href={"/shopping?badge=new"}>
                  Shop now
                </Link>
              </div>
              <Image
                src={new_items_banner}
                alt="new items banner"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                placeholder="blur"
                className="object-cover w-full h-auto"
              />
            </div>
            <div className="bg-gray-200 relative max-h-[200px]">
              <div className="absolute z-20 text-white bottom-4 left-4">
                <h1 className="hidden min-[400px]:block font-title text-2xl md:text-4xl mb-2">
                  JOIN US
                </h1>
                <div className="flex gap-2">
                  <Link
                    className="text-4xl"
                    href={
                      "https://www.facebook.com/profile.php?id=100089070463423"
                    }
                  >
                    <BsFacebook size={28} />
                  </Link>
                  <Link
                    className="text-4xl"
                    href={"https://www.instagram.com/_1ndomptable"}
                  >
                    <BsInstagram size={28} />
                  </Link>
                </div>
              </div>
              <Image
                src={join_us_banner}
                alt="join us banner"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                quality={100}
                placeholder="blur"
                className="object-cover w-full h-auto"
              />
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
