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
import { Router, useRouter } from "next/router";
import Nprogress from "nprogress";
import { ThemeProvider } from "next-themes";
import { FavoriteContextProvider } from "../src/context/FavoriteContext";
import Footer from "../src/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import logo from "../public/assets/images/logo.svg";
import logoPng from "../public/assets/images/logo.png";

//Disable the spinner at the top right
Nprogress.configure({ showSpinner: false });

//Handle router event to add a progress bar at the top of the page
// @refresh reset
function App({ Component, pageProps }: AppProps) {
  const { i18n } = useTranslation();
  const router = useRouter();
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
                <meta
                  name="og:description"
                  content="Boutique en ligne de la marque de vêtements INDOMPTABLE"
                />
                <meta
                  name="og:image"
                  content={"https://indomptable-shop.vercel.app" + logoPng.src}
                />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="indomptable-shop" />
                <meta
                  property="og:url"
                  content={
                    "https://indomptable-shop.vercel.app" + router.pathname
                  }
                />
                <meta name="twitter:title" content="INDOMPTABLE SHOP"></meta>
                <meta
                  name="twitter:description"
                  content="Boutique en ligne de la marque de vêtements INDOMPTABLE"
                />
                <meta
                  name="twitter:image"
                  content={"https://indomptable-shop.vercel.app" + logoPng.src}
                />
                <meta name="twitter:card" content="summary_large_image"></meta>
                <link rel="icon" href={logo.src} />
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
