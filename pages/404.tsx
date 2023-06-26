import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { ButtonGradient } from "../src/components/Button";
import Link from "next/link";

function Custom404() {
  const { t } = useTranslation("404");

  return (
    <main className="h-[50rem] flex flex-col justify-center items-center">
      <div className="text-center mb-6">
        <h1 className="font-bold text-9xl">
          4
          <span
            style={{ backgroundSize: "240%" }}
            className="text-gradient-simple inline-block"
          >
            0
          </span>
          4
        </h1>
        <p className="mb-8 text-3xl font-semibold">{t("subtitle")}</p>
        <p dangerouslySetInnerHTML={{__html: t('text')}}/>
      </div>
      <ButtonGradient>
        <Link href={"/"}>{t("button-text")}</Link>
      </ButtonGradient>
    </main>
  );
}

//404 pages can't use getInitialProps/getServerSideProps
export const getStaticProps: GetStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["404"])),
    },
  };
};

export default Custom404;
