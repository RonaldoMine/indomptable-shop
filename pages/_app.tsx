import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/free-mode";

import "../styles/globals.css";
import "../styles/responsive.css";
import type {AppProps} from "next/app";
import Head from "next/head";
import React, {useEffect} from "react";
import Header from "../src/components/Header";
import {BasketContextProvider} from "../src/context/BasketContext";
import {ToastContainer} from "react-toastify";
import {appWithTranslation, useTranslation} from "next-i18next";
import {Router} from "next/router";
import Nprogress from "nprogress";
import {ThemeProvider} from "next-themes";
import {FavoriteContextProvider} from "../src/context/FavoriteContext";
import Footer from "../src/components/Footer";

//Disable the spinner at the top right
Nprogress.configure({showSpinner: false})

//Handle router event to add a progress bar at the top of the page
// @refresh reset
function App({Component, pageProps}: AppProps) {
    const {i18n} = useTranslation();
    useEffect(() => {
        Router.events.on("routeChangeStart", (url: URL) => {
            Nprogress.start();
        });

        Router.events.on("routeChangeComplete", (url: URL) => {
            Nprogress.done(false);
        });

    }, [Router]);

    return (
        <ThemeProvider enableSystem={false} attribute={"class"} defaultTheme="light">
            <BasketContextProvider>
                <FavoriteContextProvider>
                    <div
                        className={`w-screen md:h-screen h-full bg-cover bg-center overflow-x-hidden`}
                    >
                        <Head>
                            <title>Indomptable Shop</title>
                            <meta
                                name="description"
                                content="Boutique en ligne des indomptables"
                            />
                            <link rel="icon" href="/assets/images/logo.svg"/>
                        </Head>
                        <main>
                            <Header lang={i18n.language ?? "en"}/>
                            <div className={"relative mx-auto"}>
                                <Component {...pageProps} />
                            </div>
                            <Footer lang={i18n.language ?? "en"}/>
                        </main>
                        <ToastContainer/>
                    </div>
                </FavoriteContextProvider>
            </BasketContextProvider>
        </ThemeProvider>
    );
}

export default appWithTranslation(App);
