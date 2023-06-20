import shirt_black from "../public/assets/images/tshirt-black-desktop.png";
import shirt_white from "../public/assets/images/tshirt-white-desktop.png";
import banner_photo from "../public/assets/images/banner-home.webp";
import React from "react";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Image from "next/image";
import {sanityClient} from "../sanity";
import HomeCardItem, {HomeCardType} from "../src/components/HomeCardItem";
import Contact from "../src/components/Contact";
import Newsletter from "../src/components/Newsletter";
import People from "../src/components/People";
import OurStory from "../src/components/OurStory";
import {useTranslation} from "next-i18next";
import {shuffleArray} from "../src/utils";

export default function Home({
                                 peoples,
                             }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const {t} = useTranslation("home")
    return (
        <>
            <div className="w-full mx-auto h-[50vw] relative">
                <Image
                    src={banner_photo}
                    placeholder="blur"
                    fill={true}
                    alt="banner photo"
                    className="max-w-full h-auto object-cover"
                />
                <div
                    className="absolute flex flex-col md:px-[3vw] md:pb-[5vw] h-full w-full md:justify-end justify-center items-center md:items-start">
                    <p className="font-futura font-bold sm:w-min text-white text-[3.25rem] md:text-[6rem] break-words text-center md:text-left leading-none ">
                        {t('banner-title')}
                    </p>
                    {/*<button
                        className="bg-gradient-to-bl hidden sm:block from-slate-700 to-slate-900 md:self-start py-4 px-10 mt-6  text-white font-space  dark:text-black dark:from-slate-200 dark:to-slate-50 dark:bg-gradient-to-bl">
                        Shop now
                    </button>*/}
                </div>
            </div>
            <div className="container mx-auto">
                <div className="relative grid sm:grid-cols-2 grid-cols-1">
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
                </div>
                <OurStory/>
            </div>
            <Newsletter/>
            <div className="container mx-auto">
                <People peoples={peoples}/>
                <Contact/>
            </div>
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
            ...(await serverSideTranslations(locale, ["contact", "gallery", "newsletter", "our-story", "home"])),
        },
    };
};
