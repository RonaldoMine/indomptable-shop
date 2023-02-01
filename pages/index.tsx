import Head from 'next/head'
import Header from "./components/Header";
import shirt_black from '../public/assets/images/tshirt-black-desktop.png'
import shirt_white from '../public/assets/images/tshirt-white-desktop.png'
import HomeCardItem, {HomeCardType} from "./components/HomeCardItem";
import React from "react";
import Contact from "./Contact";
import People from './People';
import {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import {sanityClient} from "../sanity";
import {PeopleInterface} from "../typings";


export default function Home({peoples}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div
            className={`w-screen md:h-screen h-full bg-cover bg-center overflow-x-hidden`}>
            <Head>
                <title>Indomptable Shop</title>
                <meta name="description" content="Boutique en ligne des indomptables"/>
                <link rel="icon" href="/assets/images/logo.svg"/>
            </Head>
            <main>
                <Header/>
                <div className="relative grid sm:grid-cols-2 grid-cols-1">
                    <HomeCardItem title={"white"} typeClass={HomeCardType.left} alt={"White TeeShrit"}
                                  src={shirt_white}/>
                    <HomeCardItem title={"black"} typeClass={HomeCardType.right} alt={"Black TeeShrit"}
                                  src={shirt_black}/>
                </div>
                <Contact/>
                <People peoples={peoples}/>
            </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
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
            peoples
        }
    }
}

