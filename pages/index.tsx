import shirt_black from '../public/assets/images/tshirt-black-desktop.png'
import shirt_white from '../public/assets/images/tshirt-white-desktop.png'
import HomeCardItem, {HomeCardType} from "./components/HomeCardItem";
import React from "react";
import Contact from "./components/Contact";
import People from './People';
import {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import {sanityClient} from "../sanity";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";


export default function Home({peoples}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (<>
            <div className="relative grid sm:grid-cols-2 grid-cols-1">
                <HomeCardItem title={"white"} typeClass={HomeCardType.left} alt={"White TeeShrit"}
                              src={shirt_white} typeCategory={"t-shirt"} slugProduct={"indomptable-the-mboa"}/>
                <HomeCardItem title={"black"} typeClass={HomeCardType.right} alt={"Black TeeShrit"}
                              src={shirt_black} typeCategory={"t-shirt"} slugProduct={"indomptable-the-hemle"}/>
            </div>
            <Contact/>
            <People peoples={peoples}/>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({locale}: any) => {
    const query = `*[_type == "people"]{
    _id,
    title,
    src {
      asset
    }
}`;
    const peoples = await sanityClient.fetch(query);
    return {
        props: {
            peoples,
            ...(await serverSideTranslations(locale, ["contact"])),
        }
    }
}

