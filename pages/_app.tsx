import "../styles/globals.css";
import "../styles/responsive.css";
import "react-toastify/dist/ReactToastify.css";
import type {AppProps} from "next/app";
import Head from "next/head";
import React, {useEffect} from "react";
import Header from "./components/Header";
import {BasketContextProvider} from "../src/context/BasketContext";
import {ToastContainer} from "react-toastify";
import {appWithTranslation} from "next-i18next";
import {Router} from "next/router";
import Nprogress from "nprogress";
import {ThemeProvider} from "next-themes";
import {FavoriteContextProvider} from "../src/context/FavoriteContext";

//Disable the spinner at the top right
Nprogress.configure({showSpinner: false})

//Handle router event to add a progress bar at the top of the page
// @refresh reset
function App({Component, pageProps}: AppProps) {

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
                            <Header/>
                            <div className={"relative"}>
                                <Component {...pageProps} />
                            </div>
                        </main>
                        <ToastContainer/>
                    </div>
                </FavoriteContextProvider>
            </BasketContextProvider>
        </ThemeProvider>
    );
}

export default appWithTranslation(App);
