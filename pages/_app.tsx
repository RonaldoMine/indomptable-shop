import '../styles/globals.css'
import '../styles/responsive.css'
import type {AppProps} from 'next/app'
import Head from "next/head";
import React, {useEffect, useState} from "react";
import Header from "./components/Header";
import {BasketContextProvider} from "./hooks/BasketContext";
import {Loader} from "./components/Loader";


export default function App({Component, pageProps}: AppProps) {
    const [stateLoading, setStateLoading] = useState(false);

    /*useEffect(()=>{
        window.onbeforeunload = confirmExit;
        function confirmExit()
        {
            return "You have attempted to leave this page.  If you have made any changes to the fields without clicking the Save button, your changes will be lost.  Are you sure you want to exit this page?";
        }
    },[])*/

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
