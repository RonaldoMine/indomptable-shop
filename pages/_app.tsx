import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/free-mode";
import "../styles/globals.css";
import "../styles/responsive.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import React, { useEffect } from "react";
import Header from "../src/components/Header";
import { BasketContextProvider } from "../src/context/BasketContext";
import { ToastContainer } from "react-toastify";
import { appWithTranslation, useTranslation } from "next-i18next";
import { Router } from "next/router";
import Nprogress from "nprogress";
import { ThemeProvider } from "next-themes";
import { FavoriteContextProvider } from "../src/context/FavoriteContext";
import Footer from "../src/components/Footer";
import { Analytics } from "@vercel/analytics/react";

//Disable the spinner at the top right
Nprogress.configure({ showSpinner: false });

//Handle router event to add a progress bar at the top of the page
// @refresh reset
function App({ Component, pageProps }: AppProps) {
  const { i18n } = useTranslation();
  useEffect(() => {
    Router.events.on("routeChangeStart", (url: URL) => {
      Nprogress.start();
    });

    Router.events.on("routeChangeComplete", (url: URL) => {
      Nprogress.done(false);
    });
  }, []);
  const MainComponent = Component as any;

  return (
    <>
      <ThemeProvider
        enableSystem={false}
        attribute={"class"}
        defaultTheme="light"
      >
        <BasketContextProvider>
          <FavoriteContextProvider>
            <div className={`w-full h-full bg-cover bg-center`}>
              <Head>
                <title>Indomptable Shop</title>
                <meta
                  name="description"
                  content="Boutique en ligne de la marque de vêtements INDOMPTABLE"
                />
                <meta name="og:title" content="INDOMPTABLE SHOP" />
                <meta name="og:img" content="/assets/images/logo.svg" />
                <meta
                  name="og:description"
                  content="Boutique en ligne de la marque de vêtements INDOMPTABLE"
                />
                <meta property="og:locale" content="en_GB" />
                <meta property="og:locale:alternate" content="fr_FR" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="indomptable-shop" />
                <link rel="icon" href="/assets/images/logo.svg" />
                <meta
                  name="google-site-verification"
                  content="3QbzuKhavdrXfgAfICg9ub0yWMmPxZH_GrOJX4ZTFpo"
                />
              </Head>
              <main className={"mx-auto"}>
                <Header lang={i18n.language ?? "en"} />
                <div className={"relative mx-auto"}>
                  <MainComponent {...pageProps} />
                </div>
                <Footer lang={i18n.language ?? "en"} />
              </main>
              <ToastContainer />
            </div>
          </FavoriteContextProvider>
        </BasketContextProvider>
      </ThemeProvider>
      <Analytics />
    </>
  );
}

export default appWithTranslation(App);
