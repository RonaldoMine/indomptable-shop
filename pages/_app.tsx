import '../styles/globals.css'
import '../styles/responsive.css'
import type {AppProps} from 'next/app'
import Head from "next/head";
import React, {useState} from "react";
import Header from "./components/Header";
import {Loader} from "./components/Loader";
import {BasketContextProvider} from "../src/context/BasketContext";

export default function App({Component, pageProps}: AppProps) {
    const [stateLoading, setStateLoading] = useState(false);
    return <BasketContextProvider>
        <div
            className={`w-screen md:h-screen h-full bg-cover bg-center overflow-x-hidden`}>
            <Head>
                <title>Indomptable Shop</title>
                <meta name="description" content="Boutique en ligne des indomptables"/>
                <link rel="icon" href="/assets/images/logo.svg"/>
            </Head>
            <main>
                <Header/>
                <div className={"relative"}>
                    <Loader loading={stateLoading} setLoading={setStateLoading} />
                    {!stateLoading && <Component {...pageProps} />}
                </div>
            </main>
        </div>
    </BasketContextProvider>;
}
